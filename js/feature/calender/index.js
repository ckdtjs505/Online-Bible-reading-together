import AppState from "../../shared/AppState.js";
import UserProgressBibleReading from "../userProgressBibleReading/index.js";
import CalenderView from "./CalenderView.js";

const calenderInit = async () => {
    const calenderView = new CalenderView();
    calenderView.renderSkeleton();
    const bibleReading = new UserProgressBibleReading(AppState.getInstance().userName);
    const bibleReadingData = await bibleReading.loadUserProgress();
    calenderView.bibleReadingData = bibleReadingData?.data || [];
    calenderView.render();
    calenderView.selectToday();
}

export { calenderInit  }
