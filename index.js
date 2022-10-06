import {getEduList, readEduList} from './read.js';

let date = new Date();

const renderCalendar = () => {
    const viewYear = date.getFullYear();
    const viewMonth = date.getMonth();

    const date_text = viewYear+'년 '+(viewMonth + 1)+'월';
    const element = document.querySelector('.header-date')
    element.textContent = date_text
    
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
        prevDates[i] = `<div class="date prev"><div class="date_num">${date}</div></div>`
    })

    thisDates.forEach((date, i) => {
        thisDates[i] = `<div class="date this"> <div class="date_num">${date}</div> <div class="schedule day${date}"></div> </div>`
    })

    nextDates.forEach((date, i) => {
        nextDates[i] = `<div class="date next"><div class="date_num">${date}</div></div>`
    })

    // Dates 합치기
    const dates = prevDates.concat(thisDates, nextDates);
    
    // Dates 그리기
    document.querySelector('.dates').innerHTML = dates.join('');

    readEduList();
}

renderCalendar();


document.getElementsByClassName('undo')[0].addEventListener('click', function(e) {
    document.getElementsByClassName('calendar')[0].classList.remove('hidden')
    document.getElementsByClassName('detail')[0].classList.add('hidden')
}, true)

// dropdown
const trigger = document.getElementsByClassName('dropdown-trigger')[0];

const handleClickTrigger = (e) => {
    if(trigger.className.includes("dropdown-active")){
        trigger.classList.remove("dropdown-active");
    } else {
        trigger.classList.add("dropdown-active");
    }
    let element = document.getElementsByClassName('dropdown-wrapper')[0]
    if(element.className.includes("hidden")) {
        element.classList.remove('hidden')
    } else {
        element.classList.add('hidden')
    }
}

let currentItem = 'all';

const handleClickItem = (e) => {
    handleClickTrigger();
    const target = e.target.id;
    console.log(target);

    if (currentItem == target)
        return;
    else {
        if(target == 'all') {
            const items = document.querySelectorAll(".item.hidden");
            for(let i = 0; i < items.length; i++) {
                items[i].classList.remove('hidden');
            }
            currentItem = 'all';
        } else {
            const items = document.querySelectorAll('.item');
            for(let i = 0; i < items.length; i++) {
                if(items[i].className.includes(target)) {
                    items[i].classList.remove('hidden') 
                } else {
                    items[i].classList.add('hidden')
                }
            }
            currentItem = target;
        }
        document.getElementsByClassName('dropdown-trigger')[0].textContent = (currentItem == 'all' ? '전체' : currentItem.toUpperCase())
    }

}

trigger.addEventListener('click', function(e) {
    handleClickTrigger();
}, true)

const item = document.querySelectorAll('.dropdown-item input[type="radio"]')

for (let i=0; i<item.length; i++){
    item[i].addEventListener('click', handleClickItem);    
}

