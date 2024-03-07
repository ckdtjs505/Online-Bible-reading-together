import CalenderView from "./CalenderView.js";

document.getElementById("title").addEventListener('click', async () => {
    const calenderView = new CalenderView();
    calenderView.render();
});