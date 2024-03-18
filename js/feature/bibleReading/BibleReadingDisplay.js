import AppState from "../../shared/appState.js"

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

        this.container.innerHTML = `<span> ${readingBooks} ${readingStart}장 ~ ${readingEnd}장 (${AppState.getInstance().readingPlan[0].dayCount}일차)</span>`
    }
}