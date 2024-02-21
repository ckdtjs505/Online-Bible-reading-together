class Main {
	constructor() {
		this.core = new BibleEntity();
		this.view = new View(this.core);
		this.eventBind();
	}

	static setup(){
		window.main = new Main();
		window.main.createApplication();
		window.main.start();
	}

	/**
	 * 캘린더를 생성하고 유저 이름을 설정합니다.
	 */
	createApplication(){
		this.view.createCalender();
		this.view.setUser();
	}

	start(){
		const currentDate = new Date();
		const $currentDom = document.getElementById(`${currentDate.getMonth() + 1}_${currentDate.getDate()}`);
		$currentDom?.click();
	}

	eventBind() {
		document.querySelector('#changeName').addEventListener('click', () => {
			const name = document.querySelector('#nameInput').value;
			document.querySelector('#name').innerHTML = name;
			localStorage.setItem('name', name);
		});
	}
}

class View {
	constructor(core) {
		this.core = core;
		this.calender = new Calendar(core, {
			beforeClick: (data) => {
				this.initialize();
				this.updateLoadingUI(data);
			},
			afterClick: (data) => {
				console.log(data)
				this.renderBibleVerse(data.messageInfo);
				this.renderChapterVideo(data.adminInfo);
			},
		});
	}

	createCalender(){
		this.calender.buildCalendar();
	}

	setUser() {
		document.getElementById('name').innerText = localStorage.getItem('name') || ''; // 접속한 유저 이름
	}

	updateLoadingUI({ doc, start, end, pos, daycnt }) {
		if (doc === '') {
			document.getElementById('content').innerHTML = '함온성이 없는 날';
			document.querySelector('#todaymessage').innerHTML = ``;
			return;
		}

		document.querySelector('#todaymessage').innerHTML = `${pos} ${start}장 ~ ${end}장(${daycnt}일차)`;
		document.getElementById('day').innerHTML = daycnt;
		document.getElementById('content').innerHTML = '데이터를 가져오고 있습니다.';
	}

	initialize(){
		// 오늘 내게 주신 말씀 초기화
		const myMessageElement = document.getElementById('myMessage');
		if( myMessageElement ) myMessageElement.innerHTML = '';

		// 한줄 기도 초기화
		const payInputElement = document.getElementById('pray');
		if(payInputElement) payInputElement.value = '';

		// 성경 개관 미노출
		const iframe = document.getElementById('messageVideo');
		if( iframe )iframe.style.display = 'none';
	}

	/**
	 * 성경개관 영상
	 * @param {array[number]} data 
	 */
	renderChapterVideo(data){
		if (data.row.isUrlOn && data.row[data.pos]) {
			const iframe = document.getElementById('messageVideo');
			iframe.src = `https://www.youtube.com/embed/${data.row[data.pos]}`;
			iframe.style.display = 'block';
		}
	}

	/**
	 * 성경 말씀 그려주고, 클릭시 하이라이트 기능 제공
	 * @param {array<number>} info 
	 * @returns void
	 */
	renderBibleVerse(info){
		if (info == undefined || info.length === 0) {
			console.log('데이터가 없습니다');
			return;
		}

		const contentElement = document.getElementById('content')
		if( contentElement ){
			// 말씀 생성
			contentElement.innerHTML = info
				.map(({ chapter, message, verse }, key) => {
					if( chapter && message && verse){
						return `<div> <span class='mes' id="mes_${key}"> ${chapter}:${verse} ${message} </span> </div>`;
					}else {
						return `<div> <span class='mes' id="mes_${key}"> ${message} </span> </div>`;
					}
				})
				.join(' <br> ');
			
			contentElement.querySelectorAll('.mes').forEach((ele) => {
				const div = document.createElement('div');
				div.id = `select_${ele.id}`;
				div.innerHTML = ele.innerHTML;
				// 말씀 클릭시 하이라이트 기능, 클릭한 말씀 하단에 복사
				ele.addEventListener('click', () => {
					if (ele.classList.contains('highlight')) {
						ele.classList.remove('highlight');
						document.getElementById('myMessage')?.removeChild(div);
					} else {
						ele.classList.add('highlight');
						document.getElementById('myMessage')?.appendChild(div);
					}
				});
			});
			
		}
	}
}

class BibleEntity {
	constructor() {
		this.info = [];
	}

	getTodayData({ lang, doc, start, end }) {
		return fetch(`${API_URL}?lang=${lang}&doc=${doc}&start=${start}:1&end=${end}:200`)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				this.info = data;
				return data;
			}).catch( (e) => {
				console.error(`getTodayDat를 못가지고 옴`)
			});
	}

	getAdminInfo() {
		const queryParams = new URLSearchParams({
			type: 'admin',
		});

		return fetch(
			`https://script.google.com/macros/s/AKfycbxjekHGkkVHJrMGLCF8kjgskTG5u9RO_Syupi5NU4xuwFol0F1HtB-wygcAZEWKcGEu/exec?${queryParams}`,
			{
				redirect: 'follow',
				headers: {
					'Content-Type': 'text/plain;charset=utf-8',
				},
			}
		)
			.then((response) => {
				const res =  response.json();
				
				return res;
			}).catch( (e) => {
				console.error(`어드민 정보를 못가지고 옴`)
			});
	}
	
}
