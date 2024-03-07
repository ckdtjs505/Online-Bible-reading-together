import DailyVerseDisplay from "./DailyVerseDisplay.js";
import DailyVerseService from "./DailyVerseServices.js";

document.addEventListener('click', async () => {
    const versesModels = await DailyVerseService.getDailyVerse({
        "lang": "kor",
        "doc": "1jn",
        "pos": "요한1서",
        "start": "1",
        "end": "5",
        "daycnt": 58
    })
    const verseDisplay = new DailyVerseDisplay('content', versesModels);
    verseDisplay.render();
});