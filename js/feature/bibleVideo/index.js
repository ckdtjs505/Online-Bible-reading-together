import BibleVideoDisplay from "./BibleVideoDisplay.js";

const bibleVideoInit = async (url) =>  {
    const display = new BibleVideoDisplay();
    display.render(url);
}

export {bibleVideoInit}