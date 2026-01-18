// User Management JavaScript

function checkUserId() {
    const userId = document.getElementById('userId').value;
    if (!userId) {
        alert('관리자 ID를 입력해주세요.');
        return;
    }

    // TODO: AJAX로 서버에 중복 확인 요청
    console.log('아이디 중복 확인:', userId);
    alert('사용 가능한 아이디입니다.');
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.user-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // 비밀번호 검증
            const password = this.querySelector('input[type="password"]').value;
            const passwordConfirm = this.querySelectorAll('input[type="password"]')[1].value;

            if (password !== passwordConfirm) {
                alert('비밀번호가 일치하지 않습니다.');
                return;
            }

            console.log('사용자 정보 저장');
            alert('저장되었습니다.');
        });
    }
});
