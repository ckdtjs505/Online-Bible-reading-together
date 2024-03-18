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
}
