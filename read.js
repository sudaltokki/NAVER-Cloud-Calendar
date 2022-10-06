const putDetail = () => {
    const item = document.getElementsByClassName('item');
    console.log(item.length)
    for(let i = 0; i < item.length; i++) {
        item[i].addEventListener('click', function(e) {
            document.getElementsByClassName('calendar')[0].classList.add('hidden')
            document.getElementsByClassName('detail')[0].classList.remove('hidden')
            console.log(e.currentTarget.className)
            const idx = e.currentTarget.className.split(' ')[2].replace(/idx/, '').split('_')

            const data = getEduList();
            console.log(JSON.stringify(data[idx[0]][idx[1]].start).slice(1,14) + ' ' + JSON.stringify(data[idx[0]][idx[1]].start).slice(14,19))
            const start_date = JSON.stringify(data[idx[0]][idx[1]].start).slice(1,14) + ' ' + JSON.stringify(data[idx[0]][idx[1]].start).slice(14,19)
            const end_date = JSON.stringify(data[idx[0]][idx[1]].end).slice(1,14) + ' ' + JSON.stringify(data[idx[0]][idx[1]].end).slice(14,19)
            document.getElementsByClassName('title')[0].innerHTML = (JSON.stringify(data[idx[0]][idx[1]].title)).replace(/"/g,'')
            document.getElementsByClassName('place-text')[0].innerHTML = (JSON.stringify(data[idx[0]][idx[1]].place)).replace(/"/g,'') || '온라인'
            document.getElementsByClassName('period-text')[0].innerHTML = start_date + ' ~ ' + end_date
        }, true)
    }
}

const addSchedule = (index, data) => {
    for(let i = 0; i < data.length; i++){
        console.log()
            const year_month = data[i].start.slice(0,7)
            const start = parseInt(data[i].start.slice(8,10))
            const end = parseInt(data[i].end.slice(8,10))
            if(year_month == '2022.09'){
                switch(index) {
                    case 0:
                        document.querySelector(`.day${start}`).insertAdjacentHTML('beforeend',`<div class="item starter ${'idx'+index+'_'+i}" ><div class="item-text">${data[i].title}</div></div>`);
                        if (start != end) {
                            for(let j = start + 1; j <= end; j++) {
                                document.querySelector(`.day${parseInt(j)}`).insertAdjacentHTML('beforeend',`<div class="item starter ${'idx'+index+'_'+i}" ><div class="item-text">${data[i].title}</div></div>`); 
                            }
                        }
                        break;
                    case 1:
                        document.querySelector(`.day${start}`).insertAdjacentHTML('beforeend',`<div class="item intermediate ${'idx'+index+'_'+i}" ><div class="item-text">${data[i].title}</div></div>`);
                        if (start != end) {
                            for(let j = start + 1; j <= end; j++) {
                                document.querySelector(`.day${parseInt(j)}`).insertAdjacentHTML('beforeend',`<div class="item intermediate ${'idx'+index+'_'+i}" ><div class="item-text">${data[i].title}</div></div>`); 
                            }
                        }
                        break;
                    case 2:
                        document.querySelector(`.day${start}`).insertAdjacentHTML('beforeend',`<div class="item nca ${'idx'+index+'_'+i}" ><div class="item-text">${data[i].title}</div></div>`);
                        if (start != end) {
                            for(let j = start + 1; j <= end; j++) {
                                document.querySelector(`.day${parseInt(j)}`).insertAdjacentHTML('beforeend',`<div class="item nca ${'idx'+index+'_'+i}" ><div class="item-text">${data[i].title}</div></div>`); 
                            }
                        }
                        break;
                    case 3:
                        document.querySelector(`.day${start}`).insertAdjacentHTML('beforeend',`<div class="item ncp ${'idx'+index+'_'+i}" ><div class="item-text">${data[i].title}</div></div>`);
                        if (start != end) {
                            for(let j = start + 1; j <= end; j++) {
                                document.querySelector(`.day${parseInt(j)}`).insertAdjacentHTML('beforeend',`<div class="item ncp ${'idx'+index+'_'+i}" ><div class="item-text">${data[i].title}</div></div>`); 
                            }
                        }
                        break;
                    case 4:
                        document.querySelector(`.day${start}`).insertAdjacentHTML('beforeend',`<div class="item nce ${'idx'+index+'_'+i}" ><div class="item-text">${data[i].title}</div></div>`);
                        if (start != end) {
                            for(let j = start + 1; j <= end; j++) {
                                document.querySelector(`.day${parseInt(j)}`).insertAdjacentHTML('beforeend',`<div class="item nce ${'idx'+index+'_'+i}" ><div class="item-text">${data[i].title}</div></div>`); 
                            }
                        }
                        break;
                }
            }
    }
}

let edu_data;

export const readEduList = () => {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "result_json.txt", true);
    xhttp.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
        let storage = JSON.parse(this.response);
        console.log(storage)
        edu_data = storage
        for(let i = 0; i < 5; i++) {
            addSchedule(i, storage[i]);
        }
        putDetail();
        }
    }
    xhttp.send();

}

export const getEduList = () => {
    return edu_data;
}


