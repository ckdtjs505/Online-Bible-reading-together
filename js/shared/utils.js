
export default class Utils {

    static autoLeftPad(num, digit) {
        if (String(num).length < digit) {
            num = new Array(digit - String(num).length + 1).join('0') + num;
        }
        return num;
    }

    static getToday(){
        // 오늘 날짜를 가져오기 위한 코드
        const today = new Date();

        // 년, 월, 일 가져오기
        const year = today.getFullYear();
        const month = today.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
        const day = today.getDate();

        // 오늘 날짜를 YYYY-MM-DD 형식으로 문자열로 반환하는 함수
        function getFormattedDate() {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0'); // 두 자리 숫자로 만들기 위해 padStart 사용
            const day = String(today.getDate()).padStart(2, '0');
            
            return `${year}-${month}-${day}`;
        }

        return getFormattedDate();
    }
}
