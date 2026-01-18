// In/Out Car JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 차량이미지 보기 버튼
    const viewBtns = document.querySelectorAll('.btn-secondary');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('차량 이미지 보기');
            // TODO: 이미지 모달 표시
            alert('차량 이미지를 표시합니다.');
        });
    });
});
