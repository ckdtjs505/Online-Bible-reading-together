import AppState from "../../shared/AppState.js";
import Utils from "../../shared/utils.js";
import { BibleReadingSaveService } from "../bilbeCopy/BibleReadingSaveService.js";
import PrayOptionDisplay from "./PrayOptionDisplay.js";

class UserContent {
    constructor() {
        this.container = document.querySelector('#userContent');
    }
    render() {
        this.container.innerHTML = `<div id="submitdata">
            <div id="prayForUser" style="display: ${PrayOptionDisplay.isPrayForUserVisible ? 'block' : 'none'};">
                💝앞사람을  위한 기도 : 
                <textarea id="prayForUserText" type="text" style="width:95%; height:5rem;">${localStorage.getItem(`${AppState.getInstance().viewDayCnt}_${Utils.getToday()}_prayForUser`) || ''}</textarea>
            </div>

            <div> 🌼 이름 : <span id="name">${AppState.getInstance().userName}</span> </div> 

            📖 오늘 내게 주신 말씀 : <br>  
            <div id="myMessage"> </div>

            <div id="prayBox" style="display: ${PrayOptionDisplay.isPrayVisible ? 'block' : 'none'};">
                🙏 한줄 기도 :
                <textarea id="pray" type="text" style="width:95%; height:5rem;">${localStorage.getItem(`${AppState.getInstance().viewDayCnt}_${Utils.getToday()}_pray`) || ''}</textarea>
            </div>
            제 <span id="day"> ${AppState.getInstance().viewDayCnt || ''} </span> 일차 완료했습니다. <br> 
        </div>

        <button id="saveButton" type="button" class="btn btn-primary" >복사하기</button>
        <button id="changeName" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            이름바꾸기
        </button>`
        
        this.addEvent();
    }

    addEvent(){
		document.querySelector('#change').addEventListener('click', () => {
			const name = document.querySelector('#nameInput').value;
            document.querySelector("#name").innerHTML = name;
            AppState.getInstance().userName = name;
		});

        document.querySelector("#saveButton").addEventListener('click', () => {
            this.copy();
		});
        
        document.querySelector('#pray').addEventListener('input', (event) => {
            localStorage.setItem(`${AppState.getInstance().viewDayCnt}_${Utils.getToday()}_pray`, event.target.value);
        });

        document.querySelector('#prayForUserText').addEventListener('input', (event) => {
            localStorage.setItem(`${AppState.getInstance().viewDayCnt}_${Utils.getToday()}_prayForUser`, event.target.value);
        });
    }

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
            console.log('클립보드에 복사되었습니다: \n' + copyData);
            if( !name ) return;
            if( !myMessage ) return;
            BibleReadingSaveService.setSaveMessage({
                prayForUser,
                name,
                myMessage,
                day : AppState.getInstance().readingPlan[0]?.dayCount,
                pray,
            })

        }).catch((err) => {
            console.error('클립보드 복사에 실패했습니다: ', err);
        });
    }
}

export default UserContent;