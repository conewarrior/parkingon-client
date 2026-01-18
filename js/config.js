// Config JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.config-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('환경설정 저장');
            alert('저장되었습니다.');
        });
    }
});
