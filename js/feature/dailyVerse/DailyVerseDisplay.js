import AppState from "../../shared/AppState.js";
import Utils from "../../shared/utils.js";

export default class DailyVerseDisplay {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    setVerse(verseInfo){
        this.verse = verseInfo
    }

    renderLoading() {
        this.container.innerHTML ='함온성 말씀을 가져오고 있습니다. 😁'
    }

    renderLocalStorage(){
        let userInfo = [];
        try {
            userInfo = JSON.parse( localStorage.getItem(`${AppState.getInstance().viewDayCnt}_${Utils.getToday()}`) || [] );
        } catch (error) {
            userInfo = [];
        }

        userInfo.forEach( (ele) => {
            document.querySelector(`#${ele}`).click();
        })
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
                // 클릭 한 말씀 로컬 스토리지에 저장. 어떻게 저장하는게 좋을까요? 
                if (ele.classList.contains('highlight')) {
                    ele.classList.remove('highlight');
                    let userInfo = [];
                    try {
                        userInfo = JSON.parse( localStorage.getItem(`${AppState.getInstance().viewDayCnt}_${Utils.getToday()}`) || [] );
                    } catch (error) {
                        userInfo = [];
                    }
                    userInfo = userInfo.filter(item => item !== ele.id);
                    localStorage.setItem(`${AppState.getInstance().viewDayCnt}_${Utils.getToday()}`, JSON.stringify(userInfo) )

                    document.getElementById('myMessage')?.removeChild(div);
                } else {
                    ele.classList.add('highlight');
                    let userInfo = [];
                    try {
                        userInfo = JSON.parse( localStorage.getItem(`${AppState.getInstance().viewDayCnt}_${Utils.getToday()}`) || [] );
                    } catch (error) {
                        userInfo = [];
                    }
                    userInfo = [ ...userInfo, ele.id ];
                    localStorage.setItem(`${AppState.getInstance().viewDayCnt}_${Utils.getToday()}`, JSON.stringify(userInfo) )
                    document.getElementById('myMessage')?.appendChild(div);
                }
            });
        });
    }
}