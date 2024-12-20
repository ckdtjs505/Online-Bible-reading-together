// import userProgressBibleReadingServices from "./userProgressBibleReadingServices.js";

const GOOGLE_API = `https://script.google.com`;
const GOOGLE_KEY = `AKfycbx59b6woS9-hkh8jkk93zrBUOSwbiI6JvBQT0-wdP-zxD_dNFrnL_t5WNvuulvzNtOq`;
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
            alert(e + 'api 에러가 발생했습니다. 스크린샷 후 담당자에게 전달주세요')
            console.error(`어드민 정보를 못가지고 옴`)
        });
        
    }
}