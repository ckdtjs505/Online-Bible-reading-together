class Main {
	constructor() {
		this.core = new BibleEntity();
		this.view = new View(this.core);
		this.eventBind();
	}

	static setup(){
		window.main = new Main();
		window.main.createApplication();
	}

	/**
	 * 캘린더를 생성하고 유저 이름을 설정합니다.
	 */
	async createApplication(){
		this.view.setUser();
		const getUserProgressInfo = await this.core.getUserProgressInfo(this.view.userName);
		window.getUserProgressInfo = getUserProgressInfo.row 
		this.view.createCalender();
		this.start();
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

		document.getElementById('prayForUserCheckBox').addEventListener('click', () => {
			const prayForUser = document.getElementById('prayForUser');
			prayForUser.style.display = prayForUser.style.display === 'none' ? 'block' : 'none';
			localStorage.setItem('isPrayForUserVisible', prayForUser.style.display !== 'none');
		});

		document.getElementById('prayCheckBox').addEventListener('click', () => {
			const prayBox = document.getElementById('prayBox');
			prayBox.style.display = prayBox.style.display === 'none' ? 'block' : 'none';
			localStorage.setItem('isPrayVisible', prayBox.style.display !== 'none');
		});

		document.getElementById('larger').addEventListener('click', () => {
			this.view.fontSize = this.view.fontSize + 0.1;
			this.view.setFontSize(this.view.fontSize);
			localStorage.setItem("fontSize", this.view.fontSize);
		})

		document.getElementById('smaller').addEventListener('click', () => {
			this.view.fontSize  = this.view.fontSize - 0.1;
			this.view.setFontSize(this.view.fontSize );
			localStorage.setItem("fontSize", this.view.fontSize);
		})
	}
}

class View {
	constructor(core) {
		this.core = core;
		this.fontSize = parseFloat(localStorage.getItem("fontSize")) || 1.2;
		this.calender = new Calendar(core, {
			DayClick: async (bibleInfo) => {
				this.initialize();
				this.updateLoadingUI(bibleInfo);
				
				let messageInfo = [];

				if( Array.isArray(bibleInfo.doc) ){
					const promises = bibleInfo.doc.map((val, ind) => {
						return this.core.getTodayData({
							lang: 'kor',
							doc: bibleInfo.doc[ind],
							pos: bibleInfo.pos[ind],
							start: '1',
							end: '1',
						});
					});

					const results = await Promise.all(promises);
					results.forEach((data, idx) => {
						messageInfo = [...messageInfo, { message : bibleInfo.pos[idx] } ,...data];
					});
				}else {
					messageInfo = await this.core.getTodayData(bibleInfo);
				}

				this.renderBibleVerse(messageInfo);

				let adminInfo = await this.core.getAdminInfo(bibleInfo.pos);
				this.renderChapterVideo({ ...adminInfo, pos : bibleInfo.pos });				
			},
		});
	}

	createCalender(){
		this.calender.buildCalendar();
	}

	setUser() {
		this.userName = localStorage.getItem('name') || ''
		document.getElementById('name').innerText = this.userName; // 접속한 유저 이름
		
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

	setFontSize(fontSize){
		document.getElementById('content').style.fontSize = `${fontSize}rem`;
		document.getElementById('todaymessage').style.fontSize =  `${fontSize + 0.2}rem`;
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


		const prayForUser = document.getElementById('prayForUser');

		// 로컬 스토리지에서 저장된  상태를 불러와 설정
		const isPrayForUserVisible = localStorage.getItem('isPrayForUserVisible');
		if (isPrayForUserVisible === 'true') {
			prayForUser.style.display = 'block';
			prayForUserCheckBox.checked = true; // prayForUserCheckBox의 체크  상태를 설정
		} else {
			prayForUser.style.display = 'none';
			prayForUserCheckBox.checked = false; // prayForUserCheckBox의 체크  상태를 설정
		}

		const prayBox = document.getElementById('prayBox');
		const isPrayVisible = localStorage.getItem('isPrayVisible');
		if (isPrayVisible === 'true') {
			prayBox.style.display = 'block';
			prayCheckBox.checked = true; //  체크  상태를 설정
		} else {
			prayBox.style.display = 'none';
			prayCheckBox.checked = false; //  체크  상태를 설정
		}

		this.setFontSize(this.fontSize)
	}

	/**
	 * 성경개관 영상
	 * @param {array[number]} data 
	 */
	renderChapterVideo(data){
		console.log(data)
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


	getUserProgressInfo(userName) {
		const queryParams = new URLSearchParams({
			type: 'userProgress',
			userName
		});

		return fetch(
			`https://script.google.com/macros/s/AKfycbwHiTDeqtNUONNMdS5nekjTPponxGXkXMAM56So9S9LddNrGEk9kJY1QqlZelZefmUD/exec?${queryParams}`,
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
