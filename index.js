let date = new Date();

const renderCalendar = () => {
    const viewYear = date.getFullYear();
    const viewMonth = date.getMonth();
    
    // 지난 달 마지막 Date, 이번 달 마지막 Date
    const prevLast = new Date(viewYear, viewMonth, 0);
    const thisLast = new Date(viewYear, viewMonth + 1, 0);

    const PLDate = prevLast.getDate();
    const PLDay = prevLast.getDay();

    const TLDate = thisLast.getDate();
    const TLDay = thisLast.getDay();

    // Dates 기본 배열들
    const prevDates = [];
    const thisDates = [...Array(TLDate + 1).keys()].slice(1);
    const nextDates = [];

    // prevDates 계산
    if (PLDay !== 6) {
        for (let i = 0; i < PLDay + 1; i++) {
            prevDates.unshift(PLDate - i);
        }
    }

    // nextDates 계산
    for (let i = 1; i < 7 - TLDay; i++) {
        nextDates.push(i);
    }

    // Dates 정리
    prevDates.forEach((date, i) => {
        prevDates[i] = `<div class="date prev">${date}</div>`
    })

    thisDates.forEach((date, i) => {
        thisDates[i] = `<div class="date this">${date}</div>`
    })

    nextDates.forEach((date, i) => {
        nextDates[i] = `<div class="date next">${date}</div>`
    })

    // Dates 합치기
    const dates = prevDates.concat(thisDates, nextDates);
    
    // Dates 그리기
    document.querySelector('.dates').innerHTML = dates.join('');
}

renderCalendar();

