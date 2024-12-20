import AppState from "../../shared/AppState.js";
import UserProgressBibleReading from "../userProgressBibleReading/index.js";
import CalenderView from "./CalenderView.js";
const calenderInit = async () => {

    try {
        const calenderView = new CalenderView();
        calenderView.renderSkeleton();
        const bibleReading = new UserProgressBibleReading(AppState.getInstance().userName);
        const bibleReadingData = await bibleReading.loadUserProgress();
        calenderView.bibleReadingData = bibleReadingData?.data || [];
        calenderView.render();
        calenderView.selectToday();


        let a = document.createElement('div');
            a.innerHTML = JSON.stringify(bibleReadingData)
            document.body.append( a)
    } catch (error) {
        alert(error + '에러가 발생했습니다. 스크린샷 후 담당자에게 전달주세요')
    }
    

}


export { calenderInit  }
