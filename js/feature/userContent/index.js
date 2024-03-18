import UserContent from "./UserContent.js";
import PrayOptionDisplay from "./prayOptionDisplay.js"

const UserContentInit = () => {
    const prayOptionDisplay = new PrayOptionDisplay();
    prayOptionDisplay.render();
    const userContent = new UserContent();
    userContent.render();
}

export {UserContentInit}