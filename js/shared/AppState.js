export default class AppState {
    constructor() {
      // 클래스가 처음 생성될 때, 초기 상태를 설정합니다.
        this.state = {
            // 초기 상태 예시
            userProgress: null,
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

    // 사용자 진행 상황을 설정하는 메서드
    setUserProgress(progress) {
        this.state.userProgress = progress;
    }

    // 사용자 진행 상황을 가져오는 메서드
    getUserProgress() {
        return this.state.userProgress;
    }
}