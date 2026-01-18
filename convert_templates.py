#!/usr/bin/env python3
"""
Thymeleaf to Static HTML Converter
Converts Thymeleaf templates to pure HTML by:
1. Inlining fragments (header, footer)
2. Converting Thymeleaf paths to relative paths
3. Removing Thymeleaf attributes
4. Replacing dynamic data with static sample values
"""

import os
import re
from pathlib import Path

# Source and destination paths
SOURCE_DIR = Path("/Users/hskim/dev/parkingon_design_v2/src/main/resources/templates")
DEST_DIR = Path("/Users/hskim/dev/parkingon_client/html")

# Fragment files
FRAGMENTS = {
    'header': SOURCE_DIR / "fragments" / "header.html",
    'footer': SOURCE_DIR / "fragments" / "footer.html",
}


def read_fragment(fragment_name):
    """Read fragment content and extract the actual fragment HTML"""
    fragment_path = FRAGMENTS[fragment_name]
    with open(fragment_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract content between fragment div tags
    if fragment_name == 'header':
        # Extract content inside th:fragment="header(menuTitle)" div INCLUDING the script
        match = re.search(r'<div th:fragment="header\(menuTitle\)">\s*(.*?)\s*</div>\s*</body>', content, re.DOTALL)
        if match:
            return match.group(1).strip()
    elif fragment_name == 'footer':
        # Extract everything inside th:fragment="footer" div
        match = re.search(r'<div th:fragment="footer">\s*(.*?)\s*</div>\s*</body>', content, re.DOTALL)
        if match:
            return match.group(1).strip()

    return ""


def replace_header_fragment(content, page_title, is_subfolder=False):
    """Replace header fragment reference with actual header HTML"""
    header_html = read_fragment('header')

    # Determine path prefix based on folder depth
    prefix = "../../" if is_subfolder else "../"

    # Replace the page title placeholder
    header_html = header_html.replace('th:text="${menuTitle}"', f'')
    header_html = header_html.replace('>페이지 제목<', f'>{page_title}<')

    # Replace session username with default
    header_html = header_html.replace('th:text="${session.username} ?: \'관리자\'"', '')

    # Replace Thymeleaf paths with relative paths in header
    header_html = re.sub(r'th:src="@\{/images/([^}]+)\}"', rf'src="{prefix}images/\1"', header_html)
    header_html = re.sub(r'href="/', rf'href="{prefix}', header_html)

    # Replace the fragment reference
    pattern = r'<div th:replace="~\{fragments/header :: header\([\'"]([^\'"]+)[\'"]\)\}"></div>'
    return re.sub(pattern, f'    <!-- Header -->\n    {header_html}', content)


def replace_footer_fragment(content):
    """Replace footer fragment reference with actual footer HTML"""
    footer_html = read_fragment('footer')

    # Replace session data with defaults
    footer_html = footer_html.replace('th:text="${session.username} ?: \'관리자\'"', '')
    footer_html = footer_html.replace('th:text="${session.loginTime} ?: \'--:--:--\'"', '')

    # Replace the fragment reference
    pattern = r'<div th:replace="~\{fragments/footer :: footer\}"></div>'
    return re.sub(pattern, f'    <!-- Footer -->\n    {footer_html}', content)


def convert_thymeleaf_paths(content, is_subfolder=False):
    """Convert Thymeleaf @{/path} syntax to relative paths"""
    # Determine path prefix based on folder depth
    prefix = "../../" if is_subfolder else "../"

    # CSS and JS paths
    content = re.sub(r'th:href="@\{/css/([^}]+)\}"', rf'href="{prefix}css/\1"', content)
    content = re.sub(r'th:src="@\{/js/([^}]+)\}"', rf'src="{prefix}js/\1"', content)
    content = re.sub(r'th:src="@\{/images/([^}]+)\}"', rf'src="{prefix}images/\1"', content)

    return content


def remove_thymeleaf_attributes(content):
    """Remove Thymeleaf-specific attributes"""
    # Remove xmlns:th
    content = re.sub(r'\s*xmlns:th="[^"]*"', '', content)

    # Remove th:attr
    content = re.sub(r'\s*th:attr="[^"]*"', '', content)

    # Remove th:text but keep the element
    content = re.sub(r'\s*th:text="[^"]*"', '', content)

    # Remove th:each but keep the element (will show one row as example)
    content = re.sub(r'\s*th:each="[^"]*"', '', content)

    # Remove th:if
    content = re.sub(r'\s*th:if="[^"]*"', '', content)

    # Remove th:id
    content = re.sub(r'\s*th:id="[^"]*"', '', content)

    return content


def process_template(template_path, dest_path):
    """Process a single template file"""
    print(f"Processing: {template_path.name}")

    with open(template_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Determine if this file is in a subfolder
    is_subfolder = len(dest_path.parent.parts) > len(DEST_DIR.parts)

    # Extract page title from header fragment call
    title_match = re.search(r'fragments/header :: header\([\'"]([^\'"]+)[\'"]\)', content)
    page_title = title_match.group(1) if title_match else "파킹온"

    # 1. Replace fragments
    content = replace_header_fragment(content, page_title, is_subfolder)
    content = replace_footer_fragment(content)

    # 2. Convert Thymeleaf paths
    content = convert_thymeleaf_paths(content, is_subfolder)

    # 3. Remove Thymeleaf attributes
    content = remove_thymeleaf_attributes(content)

    # 4. Ensure destination directory exists
    dest_path.parent.mkdir(parents=True, exist_ok=True)

    # 5. Write converted file
    with open(dest_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"  → Created: {dest_path}")


def main():
    """Main conversion process"""
    print("=" * 60)
    print("Thymeleaf to Static HTML Converter")
    print("=" * 60)

    # Files to convert (excluding fragments and special pages)
    templates = [
        # Main pages
        ("dashboard.html", "dashboard.html"),
        ("dashboard-worker.html", "dashboard-worker.html"),

        # VOC pages
        ("voc/voc-list.html", "voc/voc-list.html"),
        ("voc/inout-car.html", "voc/inout-car.html"),
        ("voc/control-history.html", "voc/control-history.html"),

        # System pages
        ("system/user-manage.html", "system/user-manage.html"),
        ("system/code-manage.html", "system/code-manage.html"),
        ("system/config.html", "system/config.html"),
        ("system/notify-manage.html", "system/notify-manage.html"),

        # APT pages
        ("apt/apt-manage.html", "apt/apt-manage.html"),
        ("apt/car-manage.html", "apt/car-manage.html"),
        ("apt/lpr-device.html", "apt/lpr-device.html"),
    ]

    converted_count = 0

    for source_file, dest_file in templates:
        source_path = SOURCE_DIR / source_file
        dest_path = DEST_DIR / dest_file

        if source_path.exists():
            try:
                process_template(source_path, dest_path)
                converted_count += 1
            except Exception as e:
                print(f"  ✗ Error: {e}")
        else:
            print(f"  ✗ Not found: {source_path}")

    print("\n" + "=" * 60)
    print(f"Conversion complete: {converted_count} files converted")
    print(f"Output directory: {DEST_DIR}")
    print("=" * 60)


if __name__ == "__main__":
    main()
