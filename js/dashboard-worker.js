// Dashboard Worker JavaScript

// Update table rows based on selected value
function updateTableRows() {
    const select = document.getElementById('rowsPerPage');
    if (!select) {
        console.error('rowsPerPage select not found');
        return;
    }

    const rowCount = parseInt(select.value);
    console.log('Selected row count:', rowCount);

    const tbody = document.querySelector('.apartment-table tbody');
    if (!tbody) {
        console.error('tbody not found');
        return;
    }

    const allRows = tbody.querySelectorAll('tr');
    console.log('Total rows:', allRows.length);

    allRows.forEach((row, index) => {
        if (index < rowCount) {
            row.style.display = 'table-row';
        } else {
            row.style.display = 'none';
        }
    });

    console.log('Table rows updated');
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize table rows on page load
    updateTableRows();

    // 차단기 제어 버튼 선택 이벤트
    const gateButtons = document.querySelectorAll('.btn-gate');
    gateButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 모든 버튼에서 selected 클래스 제거
            gateButtons.forEach(btn => btn.classList.remove('selected'));
            // 클릭된 버튼에 selected 클래스 추가
            this.classList.add('selected');
        });
    });

    // 아파트 목록 클릭 이벤트
    const apartmentItems = document.querySelectorAll('.apartment-item');
    apartmentItems.forEach(item => {
        item.addEventListener('click', function() {
            // 모든 항목에서 selected 클래스 제거
            apartmentItems.forEach(i => i.classList.remove('selected'));
            // 클릭된 항목에 selected 클래스 추가
            this.classList.add('selected');

            // TODO: AJAX로 선택된 아파트 정보 로드
            const aptCode = this.querySelector('.apt-code').textContent;
            console.log('선택된 아파트:', aptCode);
        });
    });

    // 조회 버튼
    const searchBtn = document.querySelector('.btn-search');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            console.log('아파트 조회 실행');
            // TODO: AJAX로 아파트 목록 조회
        });
    }
});
