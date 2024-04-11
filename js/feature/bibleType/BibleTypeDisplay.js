import AppState from "../../shared/AppState.js";

export default class BibleTypeDisplay {

    constructor() {
        this.container = document.querySelector("#bibleType");
        this.bibleType = AppState.getInstance().bibleType; 
    }

    renderLoading(){
        this.container.innerHTML = ""
    }

    addEvent(){
        this.container.querySelector('#krv').addEventListener('click', () => {
            this.container.querySelectorAll('button').forEach( (ele) => ele.classList.remove('active'))
            this.container.querySelector('#krv').classList.add('active')
            AppState.getInstance().bibleType = "KRV";
            window.location.reload();
        })

        this.container.querySelector("#korean").addEventListener('click', () => {
            this.container.querySelectorAll('button').forEach( (ele) => ele.classList.remove('active'))
            this.container.querySelector('#korean').classList.add('active')
            AppState.getInstance().bibleType = "KOREAN";
            window.location.reload();
        })

        this.container.querySelector("#kiv").addEventListener('click', () => {
            this.container.querySelectorAll('button').forEach( (ele) => ele.classList.remove('active'))
            this.container.querySelector('#kiv').classList.add('active')
            AppState.getInstance().bibleType = "KIV";
            window.location.reload();
        })
    }
    /**
	 * 성경개관 영상
	 * @param {array[number]} data 
	 */
	render(){

        this.container.innerHTML = `<button  id="kiv"  class=${this.bibleType === "KIV" ? "active" : "none" } style="border: none;border-radius: 1rem; margin-right:0.5rem" >개역개정</button>
        <button id="krv" class=${this.bibleType === "KRV" ? "active" : "none" } style="border: none;border-radius: 1rem;margin-right:0.5rem" >개역한글 </button>
        <button  id="korean"  class=${this.bibleType === "KOREAN" ? "active" : "none" } style="border: none;border-radius: 1rem; margin-right:0.5rem" >우리말 성경</button>`
    }
}