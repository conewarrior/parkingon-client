# 파킹온(ParkingOn) 클라이언트 전달 패키지

이 패키지는 파킹온 주차 관리 시스템의 프론트엔드 UI/UX 디자인을 순수 HTML/CSS/JavaScript 형태로 변환한 것입니다.

## 📦 패키지 구성

```
parkingon_client/
├── html/                    # 순수 HTML 파일 (브라우저에서 바로 실행 가능)
│   ├── dashboard.html
│   ├── dashboard-worker.html
│   ├── voc/                # VOC 관리 페이지
│   │   ├── voc-list.html
│   │   ├── inout-car.html
│   │   └── control-history.html
│   ├── system/             # 시스템 관리 페이지
│   │   ├── user-manage.html
│   │   ├── code-manage.html
│   │   ├── config.html
│   │   └── notify-manage.html
│   └── apt/                # 아파트 관리 페이지
│       ├── apt-manage.html
│       ├── car-manage.html
│       └── lpr-device.html
├── css/                     # 스타일시트
│   ├── app.css             # 전역 스타일
│   ├── management.css      # 관리 페이지 레이아웃
│   ├── dashboard.css
│   ├── dashboard-worker.css
│   ├── login.css
│   └── popup.css
├── js/                      # JavaScript 파일
│   ├── common.js           # 공통 함수
│   ├── dashboard.js
│   ├── dashboard-worker.js
│   ├── voc-list.js
│   ├── inout-car.js
│   ├── control-history.js
│   ├── user-manage.js
│   ├── code-manage.js
│   ├── config.js
│   ├── notify-manage.js
│   ├── apt-manage.js
│   ├── car-manage.js
│   └── lpr-device.js
├── images/                  # 이미지 리소스
│   └── parkingon-logo.png
├── templates_reference/     # 원본 Thymeleaf 템플릿 (개발자 참고용)
│   ├── fragments/
│   ├── voc/
│   ├── system/
│   └── apt/
├── convert_templates.py     # HTML 변환 스크립트
└── README.md               # 본 문서
```

## 🚀 사용 방법

### 1. 브라우저에서 바로 열기

`html/` 폴더 내의 HTML 파일을 더블클릭하거나 브라우저로 드래그하면 바로 확인할 수 있습니다.

예시:
```bash
# macOS
open html/dashboard-worker.html

# Windows
start html/dashboard-worker.html

# Linux
xdg-open html/dashboard-worker.html
```

### 2. 로컬 서버로 실행 (권장)

상대 경로 문제를 방지하기 위해 간단한 HTTP 서버를 사용하는 것을 권장합니다.

**Python 3 사용:**
```bash
cd parkingon_client
python3 -m http.server 8000
```

브라우저에서 접속:
- http://localhost:8000/html/dashboard-worker.html
- http://localhost:8000/html/voc/voc-list.html
- 기타 등등...

**Node.js 사용:**
```bash
# http-server 설치
npm install -g http-server

# 실행
cd parkingon_client
http-server -p 8000
```

## 📋 주요 페이지 목록

### Main (대시보드)
- `dashboard.html` - 멀티스크린용 대시보드
- `dashboard-worker.html` - 근무자용 대시보드

### VOC 관리
- `voc/voc-list.html` - VOC 이력 조회
- `voc/inout-car.html` - 입출차 이력
- `voc/control-history.html` - 차단기 수동제어 이력

### 시스템 관리
- `system/user-manage.html` - 사용자 관리
- `system/code-manage.html` - 공통코드 관리
- `system/config.html` - 환경설정
- `system/notify-manage.html` - 공지사항 관리

### 아파트 관리
- `apt/apt-manage.html` - 아파트 단지 관리
- `apt/car-manage.html` - 차량 관리
- `apt/lpr-device.html` - 입/출구 관제기

## 🔧 백엔드 연동 가이드

현재 HTML 파일들은 **정적 샘플 데이터**를 포함하고 있습니다. 실제 데이터 연동을 위해서는 다음 작업이 필요합니다:

### 1. API 엔드포인트 연결

각 페이지의 JavaScript 파일(`js/` 폴더)에서 데이터 로딩 로직을 추가해야 합니다.

예시 (`js/voc-list.js`):
```javascript
// 샘플 데이터 대신 API 호출
async function loadVocList() {
    try {
        const response = await fetch('/api/voc/list');
        const data = await response.json();
        renderVocTable(data);
    } catch (error) {
        console.error('VOC 데이터 로드 실패:', error);
    }
}

function renderVocTable(vocList) {
    const tbody = document.querySelector('.data-table tbody');
    tbody.innerHTML = '';

    vocList.forEach(voc => {
        const row = `
            <tr>
                <td>${voc.customerType}</td>
                <td>${voc.consultType}</td>
                <td>${voc.purpose}</td>
                <td>${voc.occurDate}</td>
                <td>${voc.carNumber}</td>
                <td>${voc.content}</td>
                <td>${voc.dong}</td>
                <td>${voc.ho}</td>
                <td>${voc.receptionist}</td>
            </tr>
        `;
        tbody.insertAdjacentHTML('beforeend', row);
    });
}
```

### 2. 폼 제출 처리

검색, 등록, 수정, 삭제 등의 폼 액션을 백엔드 API와 연결:

```javascript
document.querySelector('.search-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const searchParams = Object.fromEntries(formData);

    const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(searchParams)
    });

    const results = await response.json();
    renderResults(results);
});
```

### 3. 인증 처리

헤더의 사용자 정보를 세션/토큰으로 교체:

```javascript
// 로그인 사용자 정보 표시
async function loadUserInfo() {
    const response = await fetch('/api/auth/user');
    const user = await response.json();

    document.querySelector('.user-info').textContent = user.username;
}

// 로그아웃 처리
document.querySelector('.btn-logout').addEventListener('click', async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    location.href = '/login';
});
```

## 🎨 디자인 시스템

### CSS 변수 (app.css)

주요 색상과 스타일은 CSS 커스텀 속성으로 정의되어 있습니다:

```css
:root {
    /* Colors */
    --primary-blue: #00B0FF;
    --bg-white: #FFFFFF;
    --bg-gray-light: #F8F9FA;
    --text-primary: #1E293B;
    --border-light: #E2E8F0;

    /* Spacing */
    --spacing-2: 8px;
    --spacing-3: 12px;
    --spacing-4: 16px;
    --spacing-5: 20px;

    /* Typography */
    --text-sm: 13px;
    --text-base: 14px;
    --text-lg: 16px;
}
```

### 레이아웃 패턴

대부분의 관리 페이지는 **2컬럼 그리드 레이아웃**을 사용합니다:

```html
<main class="management-container">
    <aside class="management-sidebar">
        <!-- 좌측: 검색 및 목록 -->
    </aside>

    <div class="management-content">
        <!-- 우측: 상세 조회 및 폼 -->
    </div>
</main>
```

## 🔄 원본 Thymeleaf 템플릿

`templates_reference/` 폴더에는 원본 Spring Boot Thymeleaf 템플릿이 포함되어 있습니다.

이 파일들은:
- Thymeleaf 문법 (`th:*` 속성) 포함
- Fragment 참조 사용
- 서버 사이드 렌더링 전용

백엔드 개발자가 Spring Boot에서 그대로 사용하거나, 다른 템플릿 엔진 (JSP, Jinja2, Blade 등)으로 포팅할 때 참고용으로 활용할 수 있습니다.

## 📝 변환 스크립트 정보

`convert_templates.py`는 Thymeleaf 템플릿을 순수 HTML로 자동 변환한 Python 스크립트입니다.

주요 기능:
1. Fragment 인라인 (header, footer)
2. Thymeleaf 경로 → 상대 경로 변환
3. Thymeleaf 속성 제거
4. 동적 데이터를 정적 샘플 값으로 대체

템플릿 업데이트 시 다시 실행하여 HTML을 재생성할 수 있습니다:

```bash
python3 convert_templates.py
```

## 🛠 기술 스택

- **HTML5**: 시맨틱 마크업
- **CSS3**: Flexbox, Grid, Custom Properties
- **JavaScript (ES6+)**: 모듈 패턴, Async/Await
- **디자인**: 반응형 디자인 (데스크톱 우선)

## 📱 브라우저 호환성

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## 🆘 문제 해결

### CSS/JS 파일이 로드되지 않음
- 로컬 파일 시스템이 아닌 **HTTP 서버**를 통해 실행하세요
- 브라우저 개발자 도구(F12) → Network 탭에서 404 에러 확인

### 한글이 깨짐
- HTML 파일이 UTF-8 인코딩으로 저장되었는지 확인
- 모든 HTML 파일 헤더에 `<meta charset="UTF-8">` 포함됨

### 이미지가 표시되지 않음
- `images/` 폴더가 올바른 위치에 있는지 확인
- 경로가 `../images/parkingon-logo.png` 형태로 되어 있는지 확인



---

**생성일**: 2025-11-21
**버전**: Design
**원본 프로젝트**: Spring Boot 3.2.0 + Thymeleaf
