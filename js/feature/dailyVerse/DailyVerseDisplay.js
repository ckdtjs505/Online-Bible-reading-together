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