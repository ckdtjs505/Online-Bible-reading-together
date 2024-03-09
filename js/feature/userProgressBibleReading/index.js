import UserProgressBibleReadingServives from "./userProgressBibleReadingServices.js";

export default class UserProgressBibleReading {
    constructor(userId){
        this.userId = userId;
    }

    async loadUserProgress(){
        return UserProgressBibleReadingServives.getUserReadingProgress(this.userId);
    }

}