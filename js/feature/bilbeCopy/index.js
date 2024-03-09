
export class BibleCopy {

    copy(){
        const prayForUser = document.querySelector('#prayForUserText').value;
        const name = document.querySelector('#name').innerText;
        const myMessage = document.querySelector('#myMessage').innerText;
        const day = document.querySelector("#day").innerText;
        const pray = document.querySelector('#pray').value;

        let copyData = (prayForUserCheckBox.checked ? `💝앞사람을  위한 기도 \n${prayForUser}\n` : '')
            +`🌸 이름 : ${name} \n\n`
            + `📖 오늘 내게 주신 말씀 \n${myMessage}\n\n`
            +  (prayCheckBox.checked ? `🙏 한줄기도 \n${pray} \n\n` : '')
            + `제 ${day}일차 완료했습니다.`;

        navigator.clipboard.writeText(copyData).then(() => {
            console.log('클립보드에 복사되었습니다: ' + copyData);

            // 이름이 없는 경우 저장 안함
            if( !name ) return;
            if( day  ){
                const queryParams = new URLSearchParams({
                    "name" : name,
                    "daycnt" : day,
                    "myMessage" : myMessage,
                    "pray" : pray,
                    "prayForUser" : prayForUser
                });

                fetch(`https://script.google.com/macros/s/AKfycbzpwJIBpYYOv5dkQR77UrA7CLR1-ijGVmvThTEdAXNM_U2tyqdbnjfTBXsgsdIA58ee/exec?${queryParams}`, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: queryParams
                })
            }


            window.currentColumn.style.backgroundColor = '#FFFFE6';

        }).catch((err) => {
            console.error('클립보드 복사에 실패했습니다: ', err);
        });
    }
}
