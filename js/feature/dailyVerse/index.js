import AppState from "../../shared/AppState.js";
import { getReadingPlanForDate } from "../bibleReading/BibleReadingData.js";
import DailyVerseDisplay from "./DailyVerseDisplay.js";
import DailyVerseService from "./DailyVerseServices.js";

const dailyVerseInit = async () => {
    const currentDay = new Date().getDate();
    const currentYear = new Date().getFullYear(); 
    const currentMonth = new Date().getMonth() + 1; 

    const readingPlan = getReadingPlanForDate(`${currentYear}-${currentMonth}-${currentDay}`);
    setVerse(readingPlan)
    AppState.getInstance().readingPlan = readingPlan;
}

const setVerse = async (readingPlan, type) => {
    const promises = readingPlan.map( async ({start, end, lang, book})  =>  {
        let result;

        if( AppState.getInstance().bibleType == "KRV"){
            result = await DailyVerseService.getDailyVerse({ start, end, lang, book});
        }else if( AppState.getInstance().bibleType == "KIV" ){
            result = await DailyVerseService.getDailyVerseInKIV({ start, end, lang, book});
        }else {
            result = await DailyVerseService.getDailyVerseInKorean({ start, end, lang, book});
        }

        // 비동기 작업의 결과와 해당 결과의 'book' 키를 객체로 반환
        return { book, result };
    })
    
    const verseDisplay = new DailyVerseDisplay('content')
    verseDisplay.renderLoading();
    const versesModels = await Promise.all(promises);
    verseDisplay.setVerse(versesModels)
    verseDisplay.render();
    verseDisplay.renderLocalStorage();
}

export {dailyVerseInit, setVerse};