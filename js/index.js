import { UserContentInit } from "./feature/userContent/index.js";
import { calenderInit } from "./feature/calender/index.js";
import { dailyVerseInit } from "./feature/dailyVerse/index.js";


document.addEventListener('DOMContentLoaded', () => {
    calenderInit();
    dailyVerseInit();
    UserContentInit();
});