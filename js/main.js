class Main {
    constructor(){
        this.core = new BibleEntity();
        this.calender = new Calendar(this.core);

        const currentDate = new Date();
        const month = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
        const day = currentDate.getDate();
        this.core.getTodayData(month, day)
        this.calender.create();

        document.getElementById('name').addEventListener('click', () => {
            document.getElementById('name').style.display = 'none';
            document.getElementById('nameInput').style.display = 'block';
        })

        document.getElementById('nameInput').addEventListener('', () => {

        })
    }

    createUser(user) {
        const userName = document.createElement('strong');
        userName.innerHTML = `${user}`
        userName.className = 'userName';  
    
        greetingUser.appendChild(userName);
        userName.addEventListener('click', handleuserClick)
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

        document.getElementById('content').innerHTML = '데이터를 가져오고 있습니다.'
        fetch(`${API_URL}?lang=${lang}&doc=${doc}&start=${start}&end=${end}`)
        .then( (response) => {
            return response.json()
        })
        .then( data => {
            this.info = data;
            this.setUI()

            const startmatch = start.match(/^([^:]+)/);
            const endmatch = end.match(/^([^:]+)/);

            // match가 null이 아닌 경우, ":" 앞의 부분을 가져옴
            const startmatchResult = startmatch ? startmatch[0] : null;
            const endmatchResult = endmatch ? endmatch[1] : null;

            document.querySelector("#todaymessage").innerHTML = `${pos} ${startmatchResult}장 ~ ${endmatchResult}장(${daycnt}일차)`
            document.getElementById("day").innerHTML = daycnt
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

class Calendar {
    constructor(core) {
        this.core = core;
        this.inst = null;
    }

    create(){
        this.inst = mobiscroll.eventcalendar('#demo-desktop-month-view', {
            theme: 'windows',
            themeVariant: 'light',
            clickToCreate: false,
            dragToCreate: false,
            dragToMove: false,
            dragToResize: false,
            eventDelete: false,
            view: {
                calendar: { 
                    labels: true,
                    type: 'week',
                    size: 1 
                },
            },
            onCellClick :  ({date}, inst) => {
                const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
                const day = date.getDate();
                this.core.getTodayData(month, day)
            }, 

        });
    }
}