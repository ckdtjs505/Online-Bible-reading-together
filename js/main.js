class Main {
    constructor(){
        this.core = new BibleEntity();
        // this.calender = new Calendar(this.core);

        const currentDate = new Date();
        const month = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
        const day = currentDate.getDate();
        this.core.getTodayData(month, day)
        this.name = '';
        this.eventBind()
    }

    eventBind(){
        document.querySelector('#changeName').addEventListener('click', () => {
            const name = document.querySelector("#nameInput").value;
            document.querySelector("#name").innerHTML = name;
        })
    }
}

class BibleEntity {

    constructor(){
        this.info = [];
    }

    getTodayData(month, day){
        const { 
            lang, doc, start, end, pos, daycnt
        } = todayOrder( month, day);


        if( doc ===""){
            document.getElementById('content').innerHTML = '함온성이 없는 날'
            document.querySelector("#todaymessage").innerHTML = ``
            return;
        }


        document.querySelector("#todaymessage").innerHTML = `${pos} ${start}장 ~ ${end}장(${daycnt}일차)`
        document.getElementById("day").innerHTML = daycnt

        document.getElementById('content').innerHTML = '데이터를 가져오고 있습니다.'
        fetch(`${API_URL}?lang=${lang}&doc=${doc}&start=${start}:1&end=${end}:200`)
        .then( (response) => {
            return response.json()
        })
        .then( data => {
            this.info = data;
            this.setUI()


        })
    }

    setUI(){
        
        if(this.info.length === 0 ){
            alert('데이터가 없습니다')
        }

        document.getElementById('content').innerHTML =  this.info.map( ({ chapter, message, verse}, key) => {
            return `<div> <span class='mes' id="mes_${key}"> ${chapter}:${verse} ${message} </span> </div>`
        }).join(' <br> ')

        document.querySelectorAll('.mes').forEach( (ele) => {


            const div = document.createElement('div');
            div.id = `select_${ele.id}`;
            div.innerHTML = ele.innerHTML;
            ele.addEventListener('click', () => {
                if(ele.classList.contains('highlight')) {
                    ele.classList.remove('highlight')
                    document.getElementById('myMessage')?.removeChild( div )
                }else {
                    ele.classList.add('highlight')
                    document.getElementById('myMessage')?.appendChild( div )
                }
            } )
        })

        
    }
}

class Util {
    static findElementByTextRemove (){
        var elements = document.getElementsByTagName("*");

        for (var i = 0; i < elements.length; i++) {
            if (elements[i].textContent === text) {
                elements[i].remove();
            }
        }
    }
}