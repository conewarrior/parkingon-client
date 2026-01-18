// Dashboard JavaScript

// Chart.js가 로드될 때까지 대기
function initCharts() {
    console.log('Initializing charts...');

    // 지역 분포 파이 차트
    const regionCtx = document.getElementById('regionChart');
    if (regionCtx) {
        console.log('Creating region chart...');
        const regionChart = new Chart(regionCtx, {
            type: 'doughnut',
            data: {
                labels: ['수도권', '강원권', '충청권', '남부권', '제주권'],
                datasets: [{
                    data: [45, 15, 20, 15, 5],
                    backgroundColor: [
                        '#3b82f6',
                        '#ef4444',
                        '#10b981',
                        '#f59e0b',
                        '#8b5cf6'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                }
            }
        });
        console.log('Region chart created successfully');
    } else {
        console.error('Region chart canvas not found');
    }

    // 콜 센터 현황 파이 차트
    const callStatusCtx = document.getElementById('callStatusChart');
    if (callStatusCtx) {
        console.log('Creating call status chart...');
        const callChart = new Chart(callStatusCtx, {
            type: 'doughnut',
            data: {
                labels: ['출근중', '휴근중', '담당배제', '내다주', '담당중', '이행중'],
                datasets: [{
                    data: [30, 20, 15, 10, 15, 10],
                    backgroundColor: [
                        '#3b82f6',
                        '#ef4444',
                        '#10b981',
                        '#f59e0b',
                        '#8b5cf6',
                        '#ec4899'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '건';
                            }
                        }
                    }
                }
            }
        });
        console.log('Call status chart created successfully');
    } else {
        console.error('Call status chart canvas not found');
    }

    // 신규/폐쇄 현황 막대 차트
    const statusCtx = document.getElementById('statusChart');
    if (statusCtx) {
        console.log('Creating status chart...');
        const statusChart = new Chart(statusCtx, {
            type: 'bar',
            data: {
                labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                datasets: [
                    {
                        label: '신규',
                        data: [1, 2, 2, 4, 3, 2, 5, 4, 3, 6, 7, 5],
                        backgroundColor: '#3b82f6',
                        borderWidth: 0
                    },
                    {
                        label: '폐쇄',
                        data: [1, 0, 0, 2, 0, 3, 1, 2, 1, 4, 1, 0],
                        backgroundColor: '#ef4444',
                        borderWidth: 0
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        });
        console.log('Status chart created successfully');
    } else {
        console.error('Status chart canvas not found');
    }

    console.log('All charts initialized');
}

// DOM과 Chart.js가 모두 준비되면 차트 초기화
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM loaded, waiting for Chart.js...');
        if (typeof Chart !== 'undefined') {
            initCharts();
        } else {
            console.error('Chart.js is not loaded!');
        }
    });
} else {
    // 이미 로드된 경우
    console.log('DOM already loaded');
    if (typeof Chart !== 'undefined') {
        initCharts();
    } else {
        console.error('Chart.js is not loaded!');
    }
}
