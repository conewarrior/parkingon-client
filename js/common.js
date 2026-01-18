// Common JavaScript functions

// Placeholder functions to prevent errors
function selectAptFromData() {
    console.log('selectAptFromData called - not implemented yet');
}

function checkDuplicate() {
    alert('중복확인 기능은 서버 연동 후 구현됩니다.');
}

function checkUserId() {
    alert('아이디 중복확인 기능은 서버 연동 후 구현됩니다.');
}

function searchAddress() {
    alert('주소 검색 기능은 서버 연동 후 구현됩니다.');
}

// closePopup, showPrevNotify, showNextNotify는 notify-popup.js에 정의되어 있음

// Update data table rows based on selected count
function updateDataTableRows(selectElement) {
    const rowCount = parseInt(selectElement.value);
    const dataGrid = selectElement.closest('.data-grid');
    if (!dataGrid) {
        console.error('data-grid not found');
        return;
    }

    const tbody = dataGrid.querySelector('.data-table tbody');
    if (!tbody) {
        console.error('tbody not found');
        return;
    }

    const allRows = tbody.querySelectorAll('tr');
    allRows.forEach((row, index) => {
        if (index < rowCount) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// 현재 페이지에 맞는 네비게이션 메뉴 활성화
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');

        // 정확한 경로 매칭
        if (currentPath === href) {
            link.classList.add('active');
        }
        // 하위 경로 매칭 (예: /apt, /voc, /system)
        else if (href !== '/' && currentPath.startsWith(href)) {
            link.classList.add('active');
        }
        // 대시보드 특별 처리
        else if ((currentPath === '/' || currentPath === '/dashboard') && href === '/') {
            link.classList.add('active');
        }
        // 근무자용 대시보드
        else if (currentPath === '/dashboard-worker' && href === '/dashboard-worker') {
            link.classList.add('active');
        }
    });

    // Convert title to data-tooltip for fast display
    initFastTooltips();
});

// Convert title attribute to data-tooltip for 0.1s delay
function initFastTooltips() {
    const itemNames = document.querySelectorAll('.item-name[title]');

    itemNames.forEach(item => {
        const titleText = item.getAttribute('title');
        item.setAttribute('data-tooltip', titleText);
        item.removeAttribute('title'); // Remove to prevent default browser tooltip

        // Update tooltip position on mouse move
        item.addEventListener('mousemove', function(e) {
            const tooltip = window.getComputedStyle(this, '::after');
            // Position is handled by CSS fixed positioning
            item.style.setProperty('--tooltip-x', e.clientX + 'px');
            item.style.setProperty('--tooltip-y', (e.clientY + 20) + 'px');
        });
    });

    // Add dynamic positioning style
    const style = document.createElement('style');
    style.textContent = `
        .item-name[data-tooltip]:hover::after {
            left: var(--tooltip-x, 0);
            top: var(--tooltip-y, 0);
        }
    `;
    document.head.appendChild(style);
}

console.log('Common functions loaded');
