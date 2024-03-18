import AppState from "../../shared/appState.js";

export default class DailyVerseDisplay {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    setVerse(verseInfo){
        this.verse = verseInfo
    }

    renderLoading() {
        this.container.innerHTML ='로딩중'
    }

    render() {
        if(this.verse.length === 0){
            this.container.innerHTML = '함온성이 없는 날'
        }   

        const verseHtml = this.verse.length === 0 ?
            `함온성이 없는 날` :
            this.verse.map(({book, result : data} ) => {
            return `<div>  <strong> ${book} </strong>  </div>
                ${data.map( ({chapter, verse, message}, key ) =>{
                    return `<div> 
                        <span class='mes' id="mes_${key}"> ${chapter}:${verse} ${message} </span>
                    </div>`
                }).join(' <br> ')}`
            }).join('<br>');

        this.container.innerHTML = verseHtml;

        this.container.style.fontSize = AppState.getInstance().fontSize + 'rem';

        this.container.querySelectorAll('.mes').forEach((ele) => {
            const div = document.createElement('div');
            div.id = `select_${ele.id}`;
            div.innerHTML = ele.innerHTML;
            // 말씀 클릭시 하이라이트 기능, 클릭한 말씀 하단에 복사
            ele.addEventListener('click', () => {
                if (ele.classList.contains('highlight')) {
                    ele.classList.remove('highlight');
                    document.getElementById('myMessage')?.removeChild(div);
                } else {
                    ele.classList.add('highlight');
                    document.getElementById('myMessage')?.appendChild(div);
                }
            });
        });
    }
}