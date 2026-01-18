// Car Management JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 폼 제출
    const form = document.querySelector('.car-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // 차량번호 검증
            const carNumber = this.querySelector('input[value="12가1111"]').value;
            if (!carNumber) {
                alert('차량번호를 입력해주세요.');
                return;
            }

            // TODO: AJAX로 서버에 저장 요청
            console.log('차량 정보 저장');
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

            // TODO: 선택된 차량 정보를 폼에 로드
            console.log('차량 선택됨');
        });
    });
});
