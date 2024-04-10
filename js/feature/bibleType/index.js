import BibleTypeDisplay from "./BibleTypeDisplay.js";

const BibleTypeInit = () => {
    const display = new BibleTypeDisplay();
    display.render();
    display.addEvent();
}

export { BibleTypeInit }