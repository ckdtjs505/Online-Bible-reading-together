export default class AppState {
    constructor() {
        // 클래스가 처음 생성될 때, 초기 상태를 설정합니다.
        this.state = {
            // 초기 상태 예시
            userProgress: null,
            userName : localStorage.getItem('name') || '',
            fontSize : JSON.parse(localStorage.getItem('fontSize')) || 1.2
        };
    }
    // AppState 인스턴스를 저장할 변수
    static instance = null;

    // AppState 인스턴스를 가져오거나 생성하는 정적 메서드
    static getInstance() {
        if (!AppState.instance) {
            AppState.instance = new AppState();
        }
        return AppState.instance;
    }

    get userName(){
        return this.state.userName
    }

    set userName(name){
        this.state.userName = name;
        localStorage.setItem('name', name)
    }

    get readingPlan(){
        return this.state.readingPlan;
    }

    set readingPlan(readingPlan){
        this.state.readingPlan = readingPlan;
    }

    get viewDayCnt(){
        return this.state.viewDayCnt;
    }

    set viewDayCnt(cnt){
        this.state.viewDayCnt = cnt;
    }

    get fontSize(){
        return this.state.fontSize;
    }

    set fontSize(fontSize){
        this.state.fontSize = fontSize;
        document.getElementById("content").style.fontSize = fontSize + 'rem';
        localStorage.setItem("fontSize", fontSize);
    }
}