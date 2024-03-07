export default class DailyVerseDisplay {
    constructor(containerId, verseInfo) {
        this.container = document.getElementById(containerId);
        this.verse = verseInfo;
    }

    render() {
        this.container.innerHTML = this.verse.map(({book, result : data} ) => {
            return `<div> ${book} </div>
            ${data.map( ({chapter, verse, message}, key ) =>{
                return `<div> 
                    <span class='mes' id="mes_${key}"> ${chapter}:${verse} ${message} </span>
                </div>`
            }).join(' <br> ')}`
        }).join('');
    }
}