class PrayOptionDisplay {
    constructor() {
        this.container = document.querySelector('#prayOption');
    }
    static get isPrayForUserVisible(){
        // 로컬 스토리지에서 저장된  상태를 불러와 설정
		const isPrayForUserVisible = localStorage.getItem('isPrayForUserVisible');
		return isPrayForUserVisible === 'true' ? true : false;
    }

    static get isPrayVisible(){
        const isPrayVisible = localStorage.getItem('isPrayVisible');
		return isPrayVisible === 'true' ? true : false;
    }

    render(){
        this.container.innerHTML = `<div style="font-size: large;"> ✔️ 함온성 설정  <span style="font-size: 0.8rem;"> (네모박스를 클릭하면 활성화됩니다) </span> </div>
            <div>
                <input type="checkbox" id="prayForUserCheckBox" name="prayForUserCheckBox" ${PrayOptionDisplay.isPrayForUserVisible ? 'checked' : ''}> 
                <label for="prayForUserCheckBox">앞사람을 위한 기도하기</label>
            </div>
            <div>
                <input type="checkbox" id="prayCheckBox" name="prayCheckBox" ${PrayOptionDisplay.isPrayVisible ? 'checked' : ''}> 
                <label for="prayCheckBox">한줄 기도하기 </label>
            </div>`

        this.addEvent();
    }

    addEvent(){
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
    }

}

export default PrayOptionDisplay;