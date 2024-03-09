import UserProgressBibleReading from "../userProgressBibleReading/index.js";
import CalenderView from "./CalenderView.js";

const calenderInit = async () => {
    const calenderView = new CalenderView();
    calenderView.renderSkeleton();

    const userProgress = new UserProgressBibleReading('오창선');
    const userProgressData = await userProgress.loadUserProgress();
    calenderView.userProgressData = userProgressData;
    calenderView.render();
    calenderView.selectToday();
}

export { calenderInit  }
