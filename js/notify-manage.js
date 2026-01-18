// Notify Management JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.notify-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('공지사항 저장');
            alert('저장되었습니다.');
        });
    }
});
