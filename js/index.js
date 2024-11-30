import { BibleReadingsData } from "./feature/bibleReading/BibleReadingData.js";
import { BibleTypeInit } from "./feature/bibleType/index.js";
import { BibleReadingSaveService } from "./feature/bilbeCopy/BibleReadingSaveService.js";
import { calenderInit } from "./feature/calender/index.js";
import { FontSizeInit } from "./feature/fontSize/index.js";
import AppState from "./shared/AppState.js";

if(document.location.pathname?.includes("/finish.html")){
    document.addEventListener('DOMContentLoaded', async () => {
        function getQueryParam(name) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(name);
        }
        
        // 'userName' 파라미터 값 가져오기
        const userName = getQueryParam('userName');
        document.getElementById("title").innerHTML = `함 온 성 <span style="font-size: 1rem">(${userName}) </span>`

        let data = await BibleReadingSaveService.getHamonData({
            userName
        })

        let before = '';
        document.getElementById("messageBox").innerHTML = data.map( (data) => {
            let daycount = data[2];
            let message = data[3];
            let book = BibleReadingsData[daycount - 2].book
            if(before !== book){
                before= book;
                return (`<br> <div > <div> <strong> ${book} </strong> </div>${message}</div> `)
            }else {
                return (`<div >${message}</div>`)
            }
        }).join('')

        document.getElementById("prayBox").innerHTML = data.map( (data) => {

            if( data[4] ){
                return `<strong> ${data[2]}일 </strong> : ${data[4]} <br>`
            }else {
                return '';
            }
        }).join('')

        document.getElementById("prayforBox").innerHTML = data.map( (data) => {
            if( data[5] )return `${data[5]} <br> <br>`
            else return '';
        }).join('')


        const container = document.querySelector("#selectBtnBox");
        const resultBox = document.querySelector("#resultBox");
        document.querySelector('#messageBtn').addEventListener('click', () => {
            container.querySelectorAll('button').forEach( (ele) => ele.classList.remove('active'))
            container.querySelector('#messageBtn').classList.add('active')

            resultBox.querySelectorAll('section').forEach( (ele) => ele.style.display = "none");
            resultBox.querySelector("#messageBox").style.display ="block"
        })

        document.querySelector("#prayBtn").addEventListener('click', () => {
            container.querySelectorAll('button').forEach( (ele) => ele.classList.remove('active'))
            container.querySelector('#prayBtn').classList.add('active')
            resultBox.querySelectorAll('section').forEach( (ele) => ele.style.display = "none");
            resultBox.querySelector("#prayBox").style.display ="block"
        })

        document.querySelector("#prayforBtn").addEventListener('click', () => {
            container.querySelectorAll('button').forEach( (ele) => ele.classList.remove('active'))
            container.querySelector('#prayforBtn').classList.add('active')
            resultBox.querySelectorAll('section').forEach( (ele) => ele.style.display = "none");
            resultBox.querySelector("#prayforBox").style.display ="block"
        })
    });

}else {

    document.addEventListener('DOMContentLoaded', async () => {
        FontSizeInit();
        BibleTypeInit();
        calenderInit();

        

        document.querySelector('#goFinish').addEventListener('click', () => {
            if( AppState.getInstance().userName == '' || AppState.getInstance().userName.length == 0  ){
                document.querySelector("#changeName").click();
                alert('이름이 없습니다. 이름 입력 후 다시 시도해주세요.')
            }else {
                window.location.href = `./finish.html?userName=${AppState.getInstance().userName}`
            }
        }) 
    });
    
    let lastScroll;
    document.addEventListener('scroll', ()=> {
        console.log('scroll')
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
    
        // 화면에 표시되는 높이 (viewport height)
        const windowHeight = window.innerHeight;
        
        // 전체 페이지 높이
        const documentHeight = document.documentElement.scrollHeight;
    
        if(scrollTop > lastScroll){
            // 다운 스크롤 
            document.querySelector("#uparrow").style.display = 'none';
        }else {
            // 업 스크롤
            document.querySelector("#uparrow").style.display = 'block';
        }
    
        if (scrollTop + windowHeight >= documentHeight) {
            // 페이지의 마지막
            document.querySelector("#uparrow").style.display = 'block';
        }
    
        if(scrollTop == 0){
            document.querySelector("#uparrow").style.display = 'none';
        }
    
        lastScroll = scrollTop;
    })
}

