// Notify Popup JavaScript

let currentNotifyIndex = 0;
let allNotifies = [];

// 팝업 닫기
function closePopup() {
    const popup = document.getElementById('notifyPopup');
    if (popup) {
        popup.style.display = 'none';
    }
}

// Pagination 업데이트
function updatePagination() {
    const currentPageElement = document.getElementById('currentPage');
    const totalPagesElement = document.getElementById('totalPages');

    if (currentPageElement) {
        currentPageElement.textContent = currentNotifyIndex + 1;
    }

    if (totalPagesElement && allNotifies.length > 0) {
        totalPagesElement.textContent = allNotifies.length;
    }
}

// 공지사항 데이터 업데이트
function updateNotifyContent(notify) {
    const popup = document.querySelector('.popup-container');
    if (!popup || !notify) return;

    // 제목
    popup.querySelector('.popup-title').textContent = notify.title || '공지사항';

    // 이미지
    const imageDiv = popup.querySelector('.content-image');
    if (imageDiv) {
        if (notify.imageUrl) {
            if (!imageDiv.querySelector('img')) {
                imageDiv.innerHTML = `<img src="${notify.imageUrl}" alt="공지 이미지">`;
            } else {
                imageDiv.querySelector('img').src = notify.imageUrl;
            }
            imageDiv.style.display = 'block';
        } else {
            imageDiv.style.display = 'none';
        }
    }

    // 발신자
    popup.querySelectorAll('.info-value')[0].textContent = notify.sender || '-';

    // 발송일시
    popup.querySelectorAll('.info-value')[1].textContent = notify.sendDate || '-';

    // 내용
    popup.querySelector('.content-text').innerHTML = notify.content || '내용 없음';

    // 일련번호
    const serialNum = popup.querySelector('.popup-serial-num span');
    if (serialNum) {
        serialNum.textContent = notify.id;
    }

    // Pagination 업데이트
    updatePagination();
}

// 이전 공지 보기
function showPrevNotify() {
    if (currentNotifyIndex > 0) {
        currentNotifyIndex--;
        updateNotifyContent(allNotifies[currentNotifyIndex]);
    } else {
        alert('첫 번째 공지사항입니다.');
    }
}

// 다음 공지 보기
function showNextNotify() {
    if (currentNotifyIndex < allNotifies.length - 1) {
        currentNotifyIndex++;
        updateNotifyContent(allNotifies[currentNotifyIndex]);
    } else {
        alert('마지막 공지사항입니다.');
    }
}

// 오늘 하루 보지 않기 설정
function setHideToday() {
    const checkbox = document.getElementById('hideToday');
    if (checkbox && checkbox.checked) {
        const today = new Date().toDateString();
        localStorage.setItem('hideNotifyUntil', today);
        closePopup();
    }
}

// 페이지 로드 시 오늘 하루 보지 않기 체크
document.addEventListener('DOMContentLoaded', function() {
    const hideUntil = localStorage.getItem('hideNotifyUntil');
    const today = new Date().toDateString();

    if (hideUntil === today) {
        closePopup();
    }
});
