// Control History JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 조회 버튼
    const searchBtn = document.querySelector('.btn-primary');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            console.log('수동제어 이력 조회');
            // TODO: AJAX로 서버에 조회 요청
        });
    }
});
