class Calendar {
	constructor(core, config) {
		this.core = core;
		this.tbCalendar = document.querySelector('.scriptCalendar > tbody');
		this.toDay = new Date(); // @param 전역 변수, 오늘 날짜 / 내 컴퓨터 로컬을 기준으로 toDay에 Date 객체를 넣어줌
		this.nowDate = new Date(); // @param 전역 변수, 실제 오늘날짜 고정값
		this.config = config;

		document.getElementById('btnPrevCalendar').addEventListener('click', (event) => {
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
		this.toDay = new Date(this.toDay.getFullYear(), this.toDay.getMonth() - 1, this.toDay.getDate());
		this.buildCalendar(); // @param 전월 캘린더 출력 요청
	}

	/**
	 * @brief   다음달 버튼 클릭시
	 */
	nextCalendar() {
		this.toDay = new Date(this.toDay.getFullYear(), this.toDay.getMonth() + 1, this.toDay.getDate());
		this.buildCalendar(); // @param 명월 캘린더 출력 요청
	}

	/**
	 * 초기화
	 * @details 이전 캘린더의 출력결과가 남아있다면, 이전 캘린더를 삭제한다.
	 */
	init() {
		while (this.tbCalendar.rows.length > 0) {
			this.tbCalendar.deleteRow(this.tbCalendar.rows.length - 1);
		}
	}

	/**
	 * 해더 생성
	 */
	createHeader(toDay) {
		document.getElementById('calYear').innerText = toDay.getFullYear(); // @param YYYY월
		document.getElementById('calMonth').innerText = autoLeftPad(toDay.getMonth() + 1, 2); // @param MM월
	}

	/**
	 * 현재일 기준 캘린더 생성
	 */
	createCalender(toDay) {
		let doMonth = new Date(this.toDay.getFullYear(), toDay.getMonth(), 1);
		let lastDate = new Date(this.toDay.getFullYear(), toDay.getMonth() + 1, 0);
		// @param 첫번째 개행
		let row = this.tbCalendar.insertRow();

		// @param 날짜가 표기될 열의 증가값
		let dom = 1;

		// @details 시작일의 요일값( doMonth.getDay() ) + 해당월의 전체일( lastDate.getDate())을  더해준 값에서
		//               7로 나눈값을 올림( Math.ceil() )하고 다시 시작일의 요일값( doMonth.getDay() )을 빼준다.
		let daysLength = Math.ceil((doMonth.getDay() + lastDate.getDate()) / 7) * 7 - doMonth.getDay();

		// @param 달력 출력
		// @details 시작값은 1일을 직접 지정하고 요일값( doMonth.getDay() )를 빼서 마이너스( - )로 for문을 시작한다.
		for (let day = 1 - doMonth.getDay(); daysLength >= day; day++) {
			let column = row.insertCell();

			column.dataset.day = day;
			column.dataset.month = toDay.getMonth() + 1;
			column.id = `${toDay.getMonth() + 1}_${day}`;

			// @param 평일( 전월일과 익월일의 데이터 제외 )
			if (Math.sign(day) == 1 && lastDate.getDate() >= day) {
				// @param 평일 날짜 데이터 삽입
				column.innerText = autoLeftPad(day, 2);
				console.log();
				const { pos, start, end, daycnt } = todayOrder(toDay.getMonth() + 1, day);
				if (pos) {
					column.innerHTML = `
                        ${autoLeftPad(day, 2)}<br>
                        <div style="font-size: 0.5rem"> ${pos} <br> ${start}-${end}장  </div>
                    `;

					column.dataset.daycnt = daycnt;
				}

				// @param 일요일인 경우
				if (dom % 7 == 1) {
					column.style.color = '#FF4D4D';
				}

				// @param 토요일인 경우
				if (dom % 7 == 0) {
					column.style.color = '#4D4DFF';
					row = this.tbCalendar.insertRow(); // @param 토요일이 지나면 다시 가로 행을 한줄 추가한다.
				}
			}

			// @param 평일 전월일과 익월일의 데이터 날짜변경
			else {
				let exceptDay = new Date(doMonth.getFullYear(), doMonth.getMonth(), day);
				column.innerText = autoLeftPad(exceptDay.getDate(), 2);
				column.style.color = '#A9A9A9';
			}

			// @brief   전월, 명월 음영처리
			// @details 현재년과 선택 년도가 같은경우
			if (toDay.getFullYear() == this.nowDate.getFullYear()) {
				// @details 현재월과 선택월이 같은경우
				if (toDay.getMonth() == this.nowDate.getMonth()) {
					// @details 현재일보다 이전인 경우이면서 현재월에 포함되는 일인경우
					if (this.nowDate.getDate() > day && Math.sign(day) == 1) {
						column.style.backgroundColor = '#FFFFFF';
						column.style.cursor = 'pointer';
						column.onclick = () => {
							this.calendarChoiceDay(column);
						};
					}

					// @details 현재일보다 이후이면서 현재월에 포함되는 일인경우
					else if (this.nowDate.getDate() < day && lastDate.getDate() >= day) {
						column.style.backgroundColor = '#FFFFFF';
						column.style.cursor = 'pointer';
						column.onclick = () => {
							this.calendarChoiceDay(column);
						};
					}

					// @details 현재일인 경우
					else if (this.nowDate.getDate() == day) {
						column.style.backgroundColor = '#FFFFE6';
						column.style.cursor = 'pointer';
						column.onclick = () => {
							this.calendarChoiceDay(column);
						};
					}

					// @details 현재월보다 이전인경우
				} else if (toDay.getMonth() < this.nowDate.getMonth()) {
					if (Math.sign(day) == 1 && day <= lastDate.getDate()) {
						column.style.backgroundColor = '#E5E5E5';
					}
				}

				// @details 현재월보다 이후인경우
				else {
					if (Math.sign(day) == 1 && day <= lastDate.getDate()) {
						column.style.backgroundColor = '#FFFFFF';
						column.style.cursor = 'pointer';
						column.onclick = () => {
							this.calendarChoiceDay(column);
						};
					}
				}
			}

			// @details 선택한년도가 현재년도보다 작은경우
			else if (toDay.getFullYear() < this.nowDate.getFullYear()) {
				if (Math.sign(day) == 1 && day <= lastDate.getDate()) {
					column.style.backgroundColor = '#E5E5E5';
				}
			}

			// @details 선택한년도가 현재년도보다 큰경우
			else {
				if (Math.sign(day) == 1 && day <= lastDate.getDate()) {
					column.dataset.date = column.style.backgroundColor = '#FFFFFF';
					column.style.cursor = 'pointer';
					column.onclick = () => {
						this.calendarChoiceDay(column);
					};
				}
			}

			dom++;
		}
	}

	/**
	 * @brief   캘린더 오픈
	 * @details 날짜 값을 받아 캘린더 폼을 생성하고, 날짜값을 채워넣는다.
	 */
	buildCalendar() {
		this.init();

		this.createHeader(this.toDay);

		this.createCalender(this.toDay);
	}

	/**
	 * @brief   날짜 선택
	 * @details 사용자가 선택한 날짜에 체크표시를 남긴다.
	 */
	async calendarChoiceDay(column) {
		window.currentColumn = column;
		// @param 기존 선택일이 존재하는 경우 기존 선택일의 표시형식을 초기화 한다.
		if (document.getElementsByClassName('choiceDay')[0]) {
			// @see 금일인 경우
			if (
				document.getElementById('calMonth').innerText == autoLeftPad(this.nowDate.getMonth() + 1, 2) &&
				document.getElementsByClassName('choiceDay')[0].innerText == autoLeftPad(this.toDay.getDate(), 2)
			) {
				document.getElementsByClassName('choiceDay')[0].style.backgroundColor = '#FFFFE6';
			}

			// @see 금일이 아닌 경우
			else {
				document.getElementsByClassName('choiceDay')[0].style.backgroundColor = '#FFFFFF';
			}
			document.getElementsByClassName('choiceDay')[0].classList.remove('choiceDay');
		}

		// @param 선택일 체크 표시
		column.style.backgroundColor = '#FF9999';

		// @param 선택일 클래스명 변경
		column.classList.add('choiceDay');

		// 코어로 부터 데이터를 가져와 그려준다
		const bibleInfo = todayOrder(column.dataset.month, column.dataset.day);
		this.config?.beforeClick(bibleInfo);



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
