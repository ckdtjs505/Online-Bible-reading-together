import { UserContentInit } from "./feature/userContent/index.js";
import { calenderInit } from "./feature/calender/index.js";
import { dailyVerseInit } from "./feature/dailyVerse/index.js";
import { FontSizeInit } from "./feature/fontSize/index.js";
import { bibleVideoInit } from "./feature/bibleVideo/index.js";


document.addEventListener('DOMContentLoaded', () => {
    calenderInit();
    FontSizeInit();
    dailyVerseInit();
    UserContentInit();
    bibleVideoInit();
});