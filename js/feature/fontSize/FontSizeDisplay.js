import AppState from "../../shared/AppState.js";

export default class FontSizeDisplay {
    constructor(){
        this.container= document.querySelector("#fontSize");
        this.fontSize = AppState.getInstance().fontSize; 
    }

    render(){
        this.container.innerHTML =`<button class="btn" id="larger" style="cursor: pointer; width: 3rem; border: 1px gainsboro solid ;">+</button>
                <button class="btn" id="smaller" style="cursor: pointer; width: 3rem; border: 1px gainsboro solid ; ">-</button>`
        
        this.addEvent();
    }

    addEvent(){
        document.getElementById('larger').addEventListener('click', () => {
            this.fontSize = this.fontSize + 0.1;
            AppState.getInstance().fontSize = this.fontSize;
        })
    
        document.getElementById('smaller').addEventListener('click', () => {
            this.fontSize = this.fontSize - 0.1;
            AppState.getInstance().fontSize = this.fontSize;
        })
    }
}