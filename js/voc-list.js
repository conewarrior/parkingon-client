// VOC List JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 날짜 기본값 설정 (오늘 기준 1주일)
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');

    if (startDateInput && endDateInput) {
        const today = new Date();
        const weekAgo = new Date(today);
        weekAgo.setDate(today.getDate() - 7);

        endDateInput.value = formatDate(today);
        startDateInput.value = formatDate(weekAgo);
    }

    // 날짜 빠른 선택 버튼
    const dateQuickButtons = document.querySelectorAll('.btn-date-quick');
    dateQuickButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const days = parseInt(this.getAttribute('data-days'));
            const today = new Date();
            const startDate = new Date(today);

            if (days === 0) {
                // 오늘
                startDate.setDate(today.getDate());
            } else {
                // N일 전
                startDate.setDate(today.getDate() - days);
            }

            endDateInput.value = formatDate(today);
            startDateInput.value = formatDate(startDate);

            // 활성화 상태 표시
            dateQuickButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 조회 버튼
    const searchBtn = document.querySelector('.btn-primary');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            console.log('VOC 이력 조회');
            // TODO: AJAX로 서버에 조회 요청
        });
    }

    // 테이블 행 클릭시 상세 정보 표시
    const tableRows = document.querySelectorAll('.data-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            console.log('VOC 선택됨');
            // TODO: 상세 정보 모달 표시
        });
    });

    // 날짜 포맷 함수
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
});
