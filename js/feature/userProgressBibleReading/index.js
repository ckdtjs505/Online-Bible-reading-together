import userProgressBibleReadingServices from "./userProgressBibleReadingServices.js";

export default class UserProgressBibleReading {
    constructor(userId){
        this.userId = userId;
    }

    async loadUserProgress(){
        return userProgressBibleReadingServices.getUserReadingProgress(this.userId);
    }

}