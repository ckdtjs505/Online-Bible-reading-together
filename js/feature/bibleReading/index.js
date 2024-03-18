import { BibleReadingDisplay } from "./BibleReadingDisplay.js"

const bibleReadingTitle = () => {
    const display = new BibleReadingDisplay()
    display.render();
}

export {bibleReadingTitle}