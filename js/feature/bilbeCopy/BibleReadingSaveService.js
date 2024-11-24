const GOOGLE_API = `https://script.google.com`;
const GOOGLE_KEY = `AKfycbzpwJIBpYYOv5dkQR77UrA7CLR1-ijGVmvThTEdAXNM_U2tyqdbnjfTBXsgsdIA58ee`;

export class BibleReadingSaveService {

    static setSaveMessage({
        prayForUser,
        name,
        myMessage,
        day,
        pray,
    }){
        const queryParams = new URLSearchParams({
            "name" : name,
            "daycnt" : day,
            "myMessage" : myMessage,
            "pray" : pray,
            "prayForUser" : prayForUser
        });

        return fetch(`${GOOGLE_API}/macros/s/${GOOGLE_KEY}/exec?${queryParams}`, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: queryParams
        })
    }

    static getHamonData({
        userName
    }){
        const queryParams = new URLSearchParams({
            "type" : 'getHamon', 
            "userName" : userName,
        });

        return fetch(`${GOOGLE_API}/macros/s/AKfycbwI5ISJikQKHH1QzRNmQc2NPA6uDpPOd-X_M9V0HAbCqTdH8qFzhxQH-hpBx6hMzSXf/exec?${queryParams}`, {
            redirect: 'follow',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
        }).then((response) => {
            const res =  response.json();
            return res;

        }).then( (res) => {
            if(res.result == "success"){
                return res.row;
            }else {
                return [];
            }
        })
        .catch( (e) => {
            console.log(e)
        })
    }
}
