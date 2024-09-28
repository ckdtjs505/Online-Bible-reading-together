import { BibleTypeInit } from "./feature/bibleType/index.js";
import { calenderInit } from "./feature/calender/index.js";
import { FontSizeInit } from "./feature/fontSize/index.js";


document.addEventListener('DOMContentLoaded', () => {
    FontSizeInit();
    BibleTypeInit();
    calenderInit();
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