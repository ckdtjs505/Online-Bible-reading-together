import BibleVideoDisplay from "./BibleVideoDisplay.js";
import BibleVideoService from "./BibleVideoService.js";

const bibleVideoInit = async () =>  {

    const display = new BibleVideoDisplay();
    display.renderLoading();
    const videoData = await new BibleVideoService().getVideoInfo();
    display.render(videoData);
}

export {bibleVideoInit}