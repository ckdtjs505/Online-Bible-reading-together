import AppState from "../../shared/AppState.js";
import Utils from "../../shared/utils.js";
import { getReadingPlanForDate, setBibleReadingData } from "../bibleReading/BibleReadingData.js";
import { bibleReadingTitle } from "../bibleReading/index.js";
import { bibleVideoInit } from "../bibleVideo/index.js";
import { setVerse } from "../dailyVerse/index.js";
import { UserContentInit } from "../userContent/index.js";

const bibleImgInit = (img) => {
    document.querySelector("#imgContainer").innerHTML = 
        img ? `<img  style="margin-top: 0.5rem; width: 100%;" src="${img}"></img>` : ''
    
}

export default class CalendarView {
	constructor() {
        this.$calendarTable = document.querySelector("#calender")
		this.tbCalendar = document.querySelector('.scriptCalendar > tbody');
		this.toDay = new Date(); // @param 전역 변수, 오늘 날짜 / 내 컴퓨터 로컬을 기준으로 toDay에 Date 객체를 넣어줌
		this.nowDate = new Date(); // @param 전역 변수, 실제 오늘날짜 고정값

        this.currentDay = new Date().getDate();
        this.currentYear = new Date().getFullYear(); 
        this.currentMonth = new Date().getMonth() + 1; 
        
	}

    renderSkeleton() {
        this.renderCalenderYearMonth();
        this.tbCalendar.innerHTML = `
            <tr><td colspan="7" class="skeleton skeleton-text"></td></tr>
            <tr><td colspan="7" class="skeleton skeleton-text"></td></tr>
            <tr><td colspan="7" class="skeleton skeleton-text"></td></tr>
            <tr><td colspan="7" class="skeleton skeleton-text"></td></tr>
            <tr><td colspan="7" class="skeleton skeleton-text"></td></tr>
        `;
    }

    renderCalenderYearMonth(){
        this.$calendarTable.querySelector('thead > tr').innerHTML = `<td class="calendarBtn" id="btnPrevCalendar">&#60;</td>
            <td colspan="5">
                <span id="calYear">${this.currentYear}</span>년
                <span id="calMonth">${Utils.autoLeftPad(this.currentMonth, 2)}</span>월
            </td>
            <td class="calendarBtn" id="nextNextCalendar">&#62;</td>`

        document.querySelector('#btnPrevCalendar').addEventListener('click', () => {
            this.prevCalendar();
        })

        document.querySelector('#nextNextCalendar').addEventListener('click', () => {
            this.nextCalendar();
        })
    }

    render(){
        // 초기화 로직
        while (this.tbCalendar.rows.length > 0) {
			this.tbCalendar.deleteRow(this.tbCalendar.rows.length - 1);
		}
        
        const firstDayOfMonth = new Date(this.currentYear,  this.currentMonth -1, 1).getDay();
		const monthDays = new Date(this.currentYear,  this.currentMonth, 0).getDate();

        let row = this.tbCalendar.insertRow();
        // 시작하는 달의 앞의 일수 
        for (let i = 0; i < firstDayOfMonth; i++) {
            let cell = row.insertCell(); 

            const lastMonth = new Date(this.currentYear, this.currentMonth-1, 0); // 지난 달의 마지막 날
            const lastDateOfLastMonth = lastMonth.getDate(); // 지난 달의 마지막 날짜
            const dayToDisplay = lastDateOfLastMonth - firstDayOfMonth + i + 1; // 표시해야 할 지난 달의 날짜
            cell.innerHTML = `${Utils.autoLeftPad(dayToDisplay, 2)}`
            cell.className = 'calendar-day last-month'; 
        }

        // 일수 
        for (let day = 1; day <= monthDays; day++) {
            if ((row.cells.length) % 7 === 0) { // Start a new row after Saturday
                row = this.tbCalendar.insertRow();
            }
            const cell = row.insertCell();
            const date = new Date(this.currentYear, this.currentMonth - 1, day);
            const dayOfWeek = date.getDay(); // 요일 체크 (0: 일요일, 6: 토요일)

            setBibleReadingData(this.bibleReadingData)
            const readingPlan = getReadingPlanForDate(new Date(`${this.currentYear}-${this.currentMonth}-${day}`))
            const { readingBooks, readingStart, readingEnd } = readingPlan?.reduce((acc, { book, start, end }) => {
                acc.readingBooks.push(book);
                acc.readingStart.push(start);
                acc.readingEnd.push(end);
                return acc;
            }, { readingBooks: [], readingStart: [], readingEnd: [] });

            let cellHtml;
            if( readingPlan.length > 0) {
                cellHtml = `<div style="font-size: 0.5rem; margin: auto; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">
                ${readingBooks} <br> ${readingStart[0]}-${readingEnd[0]}장  </div>`
            }

            cell.className = 'calendar-day';
            if( dayOfWeek === 0 ){
                cell.classList.add('sunday');
            }else if( dayOfWeek === 6) {
                cell.classList.add('saturday');
            }
            
            if( readingPlan.length > 0 && readingPlan[0].isRead ) cell.classList.add('finish')

            cell.innerHTML = `${Utils.autoLeftPad(day, 2)}<br> ${cellHtml || ''}`
            cell.onclick  = () => {
                AppState.getInstance().readingPlan = readingPlan;
                AppState.getInstance().viewDayCnt = readingPlan[0]?.dayCount >= 70 ?  readingPlan[0]?.dayCount - 69 : readingPlan[0]?.dayCount;
                bibleReadingTitle();
                setVerse(readingPlan)
                bibleVideoInit(readingPlan[0]?.url);
                bibleImgInit(readingPlan[0]?.img)
                UserContentInit();
                this.setChoiceClear();
                cell.classList.add('choiceDay');
            } 

            cell.dataset.daycnt = readingPlan[0]?.dayCount || '';
            cell.dataset.day = day;
        }

        // 달력의 마지막 날 이후로 남은 칸에 다음 달의 초반 일자를 추가
        // 이제 달력의 마지막 주에 남은 칸수만큼 다음 달의 날짜를 추가합니다.
        const lastDayOfWeek = new Date(this.currentYear, this.currentMonth-1, monthDays).getDay();
        const daysToAddForNextMonth = 6 - lastDayOfWeek; // 토요일(6)까지 남은 칸의 수

        for (let nextDay = 1; nextDay <= daysToAddForNextMonth; nextDay++) {
            const cell = row.insertCell();
            cell.textContent = `${Utils.autoLeftPad(nextDay, 2)}`;
            cell.className = 'calendar-day next-month'
        }

    }

	/**
	 * @brief   이전달 버튼 클릭시
	 */
	prevCalendar() {
        if(!this.bibleReadingData) return;
        const prevDate = new Date( this.currentYear,  (this.currentMonth - 1) - 1, 1);
        this.currentDay = prevDate.getDate();
        this.currentYear = prevDate.getFullYear(); 
        this.currentMonth = prevDate.getMonth() + 1; 
        this.renderCalenderYearMonth()
		this.render();
	}

	/**
	 * @brief   다음달 버튼 클릭시
	 */
	nextCalendar() {
        if(!this.bibleReadingData) return;

        // 다음달의 무조건 첫째일을 지정한다. 
        const nextDate = new Date(this.currentYear, (this.currentMonth - 1) + 1, 1);
        this.currentDay = nextDate.getDate();
        this.currentYear = nextDate.getFullYear(); 
        this.currentMonth = nextDate.getMonth() + 1; 
        this.renderCalenderYearMonth()
        this.render();
    }

    selectToday(){
        document.querySelector(`[data-day="${new Date().getDate()}"]`).click();
    }

    setChoiceClear(){
        var table = this.tbCalendar;
        for (var i = 0, row; row = table.rows[i]; i++) {
			for (var j = 0, col; col = row.cells[j]; j++) {
                col.classList.remove('choiceDay')
			}
		}
    }

}
