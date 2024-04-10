import { BibleTypeInit } from "./feature/bibleType/index.js";
import { calenderInit } from "./feature/calender/index.js";
import { FontSizeInit } from "./feature/fontSize/index.js";


document.addEventListener('DOMContentLoaded', () => {
    FontSizeInit();
    BibleTypeInit();
    calenderInit();
});