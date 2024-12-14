// import userProgressBibleReadingServices from "./userProgressBibleReadingServices.js";

const GOOGLE_API = `https://script.google.com`;
const GOOGLE_KEY = `AKfycbztmenWywKE1JdlagNlP6juUmLH6_i271wUuEaHQWXvH_1LNdZqXTH7RqeqjcOKtmcc`;
export default class UserProgressBibleReading {
    constructor(userId){
        this.userId = userId;
    }

    async loadUserProgress(){

        // return userProgressBibleReadingServices.getUserReadingProgress(this.userId);
        const queryParams = new URLSearchParams({
            type: 'admin',
            userName : this.userId
        });
        return fetch(
            `${GOOGLE_API}/macros/s/${GOOGLE_KEY}/exec?${queryParams}`,
            {
                redirect: 'follow',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8',
                },
            }
        )
        .then((response) => {
            const res =  response.json();
            return res;
        }).catch( (e) => {
            console.error(`어드민 정보를 못가지고 옴`)
        });
        
    }
}