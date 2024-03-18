import AppState from "../../shared/appState.js";

export default class BibleVideoDisplay {

    constructor() {
        this.container = document.querySelector("#videoContainer");
    }

    renderLoading(){
        this.container.innerHTML = ""
    }
    /**
	 * 성경개관 영상
	 * @param {array[number]} data 
	 */
	render(data){
        const isOn = data.row.isUrlOn;
        const videoId = data.row[AppState.getInstance().readingPlan[0]?.book];
        console.log(isOn,videoId)

        this.container.innerHTML = isOn && videoId ? 
            `<iframe width="100%" height="315" style="margin-top: 0.5rem;" src="${`https://www.youtube.com/embed/${videoId}`}" title="함온성" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
            : ''
    }
}