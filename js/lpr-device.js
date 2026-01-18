// LPR Device Management JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 폼 제출
    const form = document.querySelector('.device-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // TODO: AJAX로 서버에 저장 요청
            console.log('LPR 장비 정보 저장');
            alert('저장되었습니다.');
        });
    }

    // 테이블 행 클릭시 폼에 데이터 로드
    const tableRows = document.querySelectorAll('.data-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            // 선택된 행 하이라이트
            tableRows.forEach(r => r.style.backgroundColor = '');
            this.style.backgroundColor = 'var(--bg-gray-light)';

            // TODO: 선택된 장비 정보를 폼에 로드
            console.log('장비 선택됨');
        });
    });
});
