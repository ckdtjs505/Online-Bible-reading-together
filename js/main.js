class Main {
    constructor(){
        const core = new BibleEntity();
        core.getTodayData();
    }
}

class BibleEntity {

    constructor(){
        this.info = [];
    }

    getTodayData(){
        const currentDate = new Date();
        const month = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
        const day = currentDate.getDate();
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

