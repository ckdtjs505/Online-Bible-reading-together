import { calenderInit } from "./feature/calender/index.js";
import { dailyVerseInit } from "./feature/dailyVerse/index.js";
import { prayOptionInit } from "./feature/prayOption/index.js";


document.addEventListener('DOMContentLoaded', () => {
    calenderInit();
    dailyVerseInit();
    prayOptionInit();
});