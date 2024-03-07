import { getReadingPlanForDate } from "../bibleReading/BibleReadingData.js";
import DailyVerse from "../dailyVerse/index.js";

export default class CalendarView {
	constructor(config) {
        this.$calendarTable = document.querySelector("#calender")
		this.tbCalendar = document.querySelector('.scriptCalendar > tbody');
		this.toDay = new Date(); // @param 전역 변수, 오늘 날짜 / 내 컴퓨터 로컬을 기준으로 toDay에 Date 객체를 넣어줌
		this.nowDate = new Date(); // @param 전역 변수, 실제 오늘날짜 고정값
		this.config = config;

        this.currentDay = new Date().getDate();
        this.currentYear = new Date().getFullYear(); 
        this.currentMonth = new Date().getMonth() + 1; 
	}

    render(){
        // 초기화 로직
        while (this.tbCalendar.rows.length > 0) {
			this.tbCalendar.deleteRow(this.tbCalendar.rows.length - 1);
		}

        this.$calendarTable.querySelector('thead > tr').innerHTML = `<td class="calendarBtn" id="btnPrevCalendar">&#60;</td>
            <td colspan="5">
                <span id="calYear">${this.currentYear}</span>년
                <span id="calMonth">${autoLeftPad(this.currentMonth, 2)}</span>월
            </td>
            <td class="calendarBtn" id="nextNextCalendar">&#62;</td>`
        
        document.querySelector('#btnPrevCalendar').addEventListener('click', () => {
            this.prevCalendar();
        })

        document.querySelector('#nextNextCalendar').addEventListener('click', () => {
            this.nextCalendar();
        })
        
        const firstDayOfMonth = new Date(this.currentYear,  this.currentMonth -1, 1).getDay();
		const monthDays = new Date(this.currentYear,  this.currentMonth, 0).getDate();

        let row = this.tbCalendar.insertRow();
        // 시작하는 달의 앞의 일수 
        for (let i = 0; i < firstDayOfMonth; i++) {
            let cell = row.insertCell(); 

            const lastMonth = new Date(this.currentYear, this.currentMonth-1, 0); // 지난 달의 마지막 날
            const lastDateOfLastMonth = lastMonth.getDate(); // 지난 달의 마지막 날짜
            const dayToDisplay = lastDateOfLastMonth - firstDayOfMonth + i + 1; // 표시해야 할 지난 달의 날짜
            cell.innerHTML = `${autoLeftPad(dayToDisplay, 2)}`
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

            const readingPlan = getReadingPlanForDate(`${this.currentYear}-${this.currentMonth}-${day}`)
            const readingPlanDetail = readingPlan?.map( ( { book, start, end}) => {
                return `<div style="font-size: 0.5rem"> ${book} <br> ${start}-${end}장  </div>`
            }).join('');

            cell.className = 'calendar-day';
            if( dayOfWeek === 0 ){
                cell.classList.add('sunday');
            }else if( dayOfWeek === 6) {
                cell.classList.add('saturday');
            }
            cell.innerHTML = `${autoLeftPad(day, 2)}<br>${readingPlanDetail}`
            cell.onclick  = () => {
                this.calendarChoiceDay(readingPlan);
                cell.classList.add('choiceDay');
            } 
        }

        // 달력의 마지막 날 이후로 남은 칸에 다음 달의 초반 일자를 추가
        // 이제 달력의 마지막 주에 남은 칸수만큼 다음 달의 날짜를 추가합니다.
        const lastDayOfWeek = new Date(this.currentYear, this.currentMonth-1, monthDays).getDay();
        const daysToAddForNextMonth = 6 - lastDayOfWeek; // 토요일(6)까지 남은 칸의 수

        for (let nextDay = 1; nextDay <= daysToAddForNextMonth; nextDay++) {
            const cell = row.insertCell();
            cell.textContent = `${autoLeftPad(nextDay, 2)}`;
            cell.className = 'calendar-day next-month'
        }

    }

    bindEvents(){
        document.getElementById('btnPrevCalendar').addEventListener('click', (event) => {
            console.log('t');
            this.prevCalendar();
		});

		document.getElementById('nextNextCalendar').addEventListener('click', (event) => {
			this.nextCalendar();
		});
    }

	/**
	 * @brief   이전달 버튼 클릭시
	 */
	prevCalendar() {
        const prevDate = new Date( this.currentYear,  (this.currentMonth - 1) - 1, this.currentDay);
        this.currentYear = prevDate.getFullYear(); 
        this.currentMonth = prevDate.getMonth() + 1; 
		this.render();
	}

	/**
	 * @brief   다음달 버튼 클릭시
	 */
	nextCalendar() {
        const nextDate = new Date(this.currentYear, (this.currentMonth - 1) + 1, this.currentDay);
        this.currentYear = nextDate.getFullYear(); 
        this.currentMonth = nextDate.getMonth() + 1; 
        this.render();
    }

	setProgressInfo(completedDates){
		var table = this.tbCalendar;
		console.log(completedDates)
		// 테이블의 모든 행을 순회
		for (var i = 0, row; row = table.rows[i]; i++) {
			// 각 행의 모든 셀을 순회
			for (var j = 0, col; col = row.cells[j]; j++) {
				// 여기서 col은 각 셀(열)을 나타냄, 필요한 작업 수행

				if( completedDates?.includes(parseInt(col.dataset.daycnt)) ){
					col.style.backgroundColor = '#FFFFE6';
				}
			}
		}

	}

	/**
	 * @brief   날짜 선택
	 * @details 사용자가 선택한 날짜에 체크표시를 남긴다.
	 */
	async calendarChoiceDay(readingPlan) {
        DailyVerse.setVerse(readingPlan)

		// // @param 선택일 클래스명 변경
		// column.classList.add('choiceDay');

		// 코어로 부터 데이터를 가져와 그려준다

	}
}

/**
 * @brief   숫자 두자릿수( 00 ) 변경
 * @details 자릿수가 한자리인 ( 1, 2, 3등 )의 값을 10, 11, 12등과 같은 두자리수 형식으로 맞추기위해 0을 붙인다.
 * @param   num     앞에 0을 붙일 숫자 값
 * @param   digit   글자의 자릿수를 지정 ( 2자릿수인 경우 00, 3자릿수인 경우 000 … )
 */
function autoLeftPad(num, digit) {
	if (String(num).length < digit) {
		num = new Array(digit - String(num).length + 1).join('0') + num;
	}
	return num;
}
