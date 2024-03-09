import CalenderView from "./CalenderView.js";

const calenderInit = () => {
    const calenderView = new CalenderView();
    calenderView.render();
    calenderView.selectToday();
}

export { calenderInit  }
