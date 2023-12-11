class Main {
    constructor(){
        this.core = new BibleEntity();
        this.calender = new Calendar(this.core);
        // this.core.getTodayData();

        const currentDate = new Date();
        const month = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
        const day = currentDate.getDate();
        this.core.getTodayData(month, day)
        this.calender.create();
    }
}

class BibleEntity {

    constructor(){
        this.info = [];
    }

    getTodayData(month, day){
        const { 
            lang, doc, start, end
        } = todayOrder( month, day);

        fetch(`${API_URL}?lang=${lang}&doc=${doc}&start=${start}&end=${end}`)
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

        document.getElementById('content').innerHTML =  this.info.map( ({ chapter, message, verse}) => {
            return `<div> ${chapter}:${verse} ${message} </div>`
        }).join(' <br> ')
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