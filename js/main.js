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

		this.core.getUserProgressInfo(this.userName).then( (data) => {
			window.progressData = data.row;
			this.calender.setProgressInfo(data.row);
		});
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
				console.log(this.info)
				if( doc === "1pet" ){
					this.info.forEach( ({chapter, verse, message }, idx) => {
						if( message === ''){
							if( chapter == 2){
								if( verse == 23) this.info[idx].message = "욕을 받으시되 대신 욕하지 아니하시고 고난을 받으시되 위협하지 아니하시고 오직 공의로 심판하시는 자에게 부탁하시며"
								if( verse == 24) this.info[idx].message = "친히 나무에 달려 그 몸으로 우리 죄를 담당하셨으니 이는 우리로 죄에 대하여 죽고 의에 대하여 살게 하려 하심이라 저가 채찍에 맞음으로 너희는 나음을 얻었나니"
								if( verse == 25) this.info[idx].message = "너희가 전에는 양과 같이 길을 잃었더니 이제는 너희 영혼의 목자와 감독 되신 이에게 돌아왔느니라"
							}
							if( chapter == 3){
								if( verse == 20) this.info[idx].message = "그들은 전에 노아의 날 방주 예비할 동안 하나님이 오래 참고 기다리실 때에 순종치 아니하던 자들이라 방주에서 물로 말미암아 구원을 얻은 자가 몇명 뿐이니 겨우 여덟 명이라"
								if( verse == 21) this.info[idx].message = "물은 예수 그리스도의 부활하심으로 말미암아 이제 너희를 구원하는 표니 곧 세례라 육체의 더러운 것을 제하여 버림이 아니요 오직 선한 양심이 하나님을 향하여 찾아가는 것이라"
								if( verse == 22) this.info[idx].message = "저는 하늘에 오르사 하나님 우편에 계시니 천사들과 권세들과 능력들이 저에게 순복하느니"
							}
							if( chapter == 4){
								if( verse == 15) this.info[idx].message = "너희 중에 누구든지 살인이나 도적질이나 악행이나 남의 일을 간섭하는 자로 고난을 받지 말려니와"
								if( verse == 16) this.info[idx].message = "만일 그리스도인으로 고난을 받은즉 부끄러워 말고 도리어 그 이름으로 하나님께 영광을 돌리라Z"
								if( verse == 17) this.info[idx].message = "하나님 집에서 심판을 시작할 때가 되었나니 만일 우리에게 먼저 하면 하나님의 복음을 순종치 아니하는 자들의 그 마지막이 어떠하며"
								if( verse == 18) this.info[idx].message = "또 의인이 겨우 구원을 얻으면 경건치 아니한 자와 죄인이 어디 서리요"
								if( verse == 19) this.info[idx].message = "그러므로 하나님의 뜻대로 고난을 받는 자들은 또한 선을 행하는 가운데 그 영혼을 미쁘신 조물주께 부탁할찌어다"
							}
							if( chapter == 5){
								if( verse == 1) this.info[idx].message = '너희 중 장로들에게 권하노니 나는 함께 장로 된 자요 그리스도의 고난의 증인이요 나타날 영광에 참예할 자로라';
								if( verse == 2) this.info[idx].message = "너희 중에 있는 하나님의 양 무리를 치되 부득이함으로 하지 말고 오직 하나님의 뜻을 좇아 자원함으로 하며 더러운 이를 위하여 하지 말고 오직 즐거운 뜻으로 하며"
								if( verse == 3) this.info[idx].message = "맡기운 자들에게 주장하는 자세를 하지 말고 오직 양 무리의 본이 되라 "
								if( verse == 4) this.info[idx].message = "그리하면 목자장이 나타나실 때에 시들지 아니하는 영광의 면류관을 얻으리라 "
								if( verse == 5) this.info[idx].message = "젊은 자들아 이와 같이 장로들에게 순복하고 다 서로 겸손으로 허리를 동이라 하나님이 교만한 자를 대적하시되 겸손한 자들에게는 은혜를 주시느니라 "
								if( verse == 6) this.info[idx].message = "그러므로 하나님의 능하신 손 아래서 겸손하라 때가 되면 너희를 높이시리라"
								if( verse == 7) this.info[idx].message = "너희 염려를 다 주께 맡겨 버리라 이는 저가 너희를 권고하심이니라 "
								if( verse == 8) this.info[idx].message = "근신하라 깨어라 너희 대적 마귀가 우는 사자 같이 두루 다니며 삼킬 자를 찾나니 "
								if( verse == 9) this.info[idx].message = "너희는 믿음을 굳게 하여 저를 대적하라 이는 세상에 있는 너희 형제들도 동일한 고난을 당하는 줄을 앎이니라 "
								if( verse == 10) this.info[idx].message = "모든 은혜의 하나님 곧 그리스도 안에서 너희를 부르사 자기의 영원한 영광에 들어가게 하신 이가 잠간 고난을 받은 너희를 친히 온전케 하시며 굳게 하시며 강하게 하시며 터를 견고케 하시리라 "
								if( verse == 11) this.info[idx].message = "권력이 세세무궁토록 그에게 있을찌어다 아멘 "
								if( verse == 12) this.info[idx].message = "내가 신실한 형제로 아는 실루아노로 말미암아 너희에게 간단히 써서 권하고 이것이 하나님의 참된 은혜임을 증거하노니 너희는 이 은혜에 굳게 서라"
								if( verse == 13) this.info[idx].message = "함께 택하심을 받은 바벨론에 있는 교회가 너희에게 문안하고 내 아들 마가도 그리하느니라 "
								if( verse == 14) this.info[idx].message = "너희는 사랑의 입맞춤으로 피차 문안하라 그리스도 안에 있는 너희 모든 이에게 평강이 있을찌어다"
							}
						}
					})
				}
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
