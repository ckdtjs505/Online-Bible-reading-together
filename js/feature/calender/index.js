import AppState from "../../shared/appState.js";
import UserProgressBibleReading from "../userProgressBibleReading/index.js";
import CalenderView from "./CalenderView.js";

const calenderInit = async () => {
    const calenderView = new CalenderView();
    calenderView.renderSkeleton();
    const userProgress = new UserProgressBibleReading(AppState.getInstance().userName);
    const userProgressData = await userProgress.loadUserProgress();
    calenderView.render();
    calenderView.userProgressData = userProgressData?.row || [];
    calenderView.setProgressInfo();

    calenderView.selectToday();
}

export { calenderInit  }
