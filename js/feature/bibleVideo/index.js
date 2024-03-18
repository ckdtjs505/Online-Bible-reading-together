import BibleVideoDisplay from "./BibleVideoDisplay.js";
import BibleVideoService from "./BibleVideoService.js";

const bibleVideoInit = async () =>  {
    const videoData = await new BibleVideoService().getVideoInfo();
    const display = new BibleVideoDisplay();
    display.render(videoData);
}

export {bibleVideoInit}