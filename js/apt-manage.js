// APT Management JavaScript

// 중복 확인
function checkDuplicate() {
    const aptCode = document.getElementById('aptCode').value;
    if (!aptCode) {
        alert('아파트 코드를 입력해주세요.');
        return;
    }

    // TODO: AJAX로 서버에 중복 확인 요청
    console.log('중복 확인:', aptCode);
    alert('사용 가능한 코드입니다.');
}

// 주소 검색
function searchAddress() {
    // TODO: 다음/카카오 주소 API 연동
    console.log('주소 검색 실행');
    alert('주소 검색 기능은 준비중입니다.');
}

document.addEventListener('DOMContentLoaded', function() {
    // 아파트 목록 클릭 이벤트
    const apartmentItems = document.querySelectorAll('.item-list-item');
    apartmentItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (e.target.type !== 'checkbox') {
                // 모든 항목에서 selected 클래스 제거
                apartmentItems.forEach(i => i.classList.remove('selected'));
                // 클릭된 항목에 selected 클래스 추가
                this.classList.add('selected');

                // TODO: AJAX로 선택된 아파트 정보 로드
                const checkbox = this.querySelector('input[type="checkbox"]');
                const aptCode = this.querySelector('.item-code').textContent;
                console.log('선택된 아파트:', aptCode);
            }
        });
    });

    // 폼 제출
    const form = document.querySelector('.apartment-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // 폼 검증
            const aptCode = document.getElementById('aptCode').value;
            if (!aptCode) {
                alert('아파트 코드를 입력해주세요.');
                return;
            }

            // TODO: AJAX로 서버에 저장 요청
            console.log('아파트 정보 저장');
            alert('저장되었습니다.');
        });
    }
});
