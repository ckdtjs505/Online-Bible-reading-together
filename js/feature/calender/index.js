import { getReadingPlanForDate } from "../bibleReading/BibleReadingData.js";
import DailyVerse from "../dailyVerse/index.js";
import UserProgressBibleReading from "../userProgressBibleReading/index.js";
import CalenderView from "./CalenderView.js";

const calenderInit = async () => {
    const calenderView = new CalenderView();
    calenderView.renderSkeleton();
    const userProgress = new UserProgressBibleReading('오창선');
    const userProgressData = await userProgress.loadUserProgress();
    calenderView.userProgressData = userProgressData;
    const readingPlan = getReadingPlanForDate(`${calenderView.currentYear}-${calenderView.currentMonth}-${new Date().getDate()}`)
    await DailyVerse.setVerse(readingPlan)
    calenderView.render();
}

export { calenderInit  }
