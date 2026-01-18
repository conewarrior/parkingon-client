// Code Management JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.code-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('공통코드 저장');
            alert('저장되었습니다.');
        });
    }
});
