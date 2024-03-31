import AppState from "../../shared/AppState.js"

export class BibleReadingDisplay {
                
    constructor() {
        this.container = document.querySelector("#todaymessage")
    }

    renderLoading(){
        
    }
    render(){
        
        const { readingBooks, readingStart, readingEnd } = AppState.getInstance().readingPlan?.reduce((acc, { book, start, end }) => {
            acc.readingBooks.push(book);
            acc.readingStart.push(start);
            acc.readingEnd.push(end);
            return acc;
        }, { readingBooks: [], readingStart: [], readingEnd: [] });

        if(readingBooks.length > 0 &&readingStart.length > 0 && readingEnd.length > 0  ){
            this.container.innerHTML = `<span> ${readingBooks} ${readingStart}장 ~ ${readingEnd}장 (${AppState.getInstance().viewDayCnt || ''}일차)</span>`
        }else {
            this.container.innerHTML = '';
        }
    }
}