// Login Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // 폼 검증
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            let isValid = true;

            // 아이디 검증
            if (usernameInput.value.trim() === '') {
                showError('username');
                isValid = false;
            } else {
                hideError('username');
            }

            // 비밀번호 검증
            if (passwordInput.value.trim() === '') {
                showError('password');
                isValid = false;
            } else {
                hideError('password');
            }

            if (!isValid) {
                e.preventDefault();
            }
        });
    }

    // 입력 필드 포커스 시 에러 제거
    if (usernameInput) {
        usernameInput.addEventListener('input', function() {
            hideError('username');
        });
    }

    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            hideError('password');
        });
    }

    // 에러 표시 함수
    function showError(fieldName) {
        const input = document.getElementById(fieldName);
        const error = document.getElementById(fieldName + '-error');
        if (input) input.classList.add('error');
        if (error) error.classList.add('show');
    }

    // 에러 숨김 함수
    function hideError(fieldName) {
        const input = document.getElementById(fieldName);
        const error = document.getElementById(fieldName + '-error');
        if (input) input.classList.remove('error');
        if (error) error.classList.remove('show');
    }
});
