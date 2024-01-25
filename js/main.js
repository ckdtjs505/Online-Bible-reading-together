class Main {
	constructor() {
		this.core = new BibleEntity();
		this.view = new View(this.core);
		this.view.calender.buildCalendar();
		this.view.setUser();

		/**
		 * 현재일을 클릭해서 동작하도록.
		 */
		const currentDate = new Date();
		const $currentDom = document.getElementById(`${currentDate.getMonth() + 1}_${currentDate.getDate()}`);
		$currentDom?.click();

		this.eventBind();
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
				this.setMessageLoading(data);
			},
			afterClick: (data) => {
				this.setMessage(data);
			},
		});
	}

	setUser() {
		document.getElementById('name').innerText = localStorage.getItem('name') || ''; // 접속한 유저 이름
	}

	setMessageLoading({ doc, start, end, pos, daycnt }) {
		document.getElementById('myMessage').innerText = ''; // 기존에 있는 데이터 초기화
		document.getElementById('pray').value = '';
		if (doc === '') {
			document.getElementById('content').innerHTML = '함온성이 없는 날';
			document.querySelector('#todaymessage').innerHTML = ``;
			return;
		}

		document.querySelector('#todaymessage').innerHTML = `${pos} ${start}장 ~ ${end}장(${daycnt}일차)`;
		document.getElementById('day').innerHTML = daycnt;
		document.getElementById('content').innerHTML = '데이터를 가져오고 있습니다.';
	}

	setMessage(info) {
		if (info == undefined || info.length === 0) {
			console.log('데이터가 없습니다');
			return;
		}

		document.getElementById('content').innerHTML = info
			.map(({ chapter, message, verse }, key) => {
				return `<div> <span class='mes' id="mes_${key}"> ${chapter}:${verse} ${message} </span> </div>`;
			})
			.join(' <br> ');

		document.querySelectorAll('.mes').forEach((ele) => {
			const div = document.createElement('div');
			div.id = `select_${ele.id}`;
			div.innerHTML = ele.innerHTML;
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

class BibleEntity {
	constructor() {
		this.info = [];
	}

	getTodayData({ lang, doc, start, end, pos, daycnt }) {
		return fetch(`${API_URL}?lang=${lang}&doc=${doc}&start=${start}:1&end=${end}:200`)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				this.info = data;
				return data;
			});
	}
}
