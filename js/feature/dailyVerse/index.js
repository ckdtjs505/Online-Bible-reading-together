import DailyVerseDisplay from "./DailyVerseDisplay.js";
import DailyVerseService from "./DailyVerseServices.js";

export default class DailyVerse {

    static async setVerse(readingPlan){
        const promises = readingPlan.map( async ({start, end, lang, book})  =>  {
            const result = await DailyVerseService.getDailyVerse({ start, end, lang, book});
            // 비동기 작업의 결과와 해당 결과의 'book' 키를 객체로 반환
            return { book, result };
        })
        
        const verseDisplay = new DailyVerseDisplay('content')
        verseDisplay.renderLoading();
        const versesModels = await Promise.all(promises);
        verseDisplay.setVerse(versesModels)
        verseDisplay.render();
    }
}
