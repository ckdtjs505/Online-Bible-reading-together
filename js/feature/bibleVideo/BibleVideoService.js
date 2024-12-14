export default class BibleVideoService {
	getVideoInfo() {
		const queryParams = new URLSearchParams({
			type: 'admin',
		});

		return fetch(
			`https://script.google.com/macros/s/AKfycbwD8c8UZED8cW3clChWkysu5M_ryzKUbnJM2WPAAitYNyh8B-V8lTA8l-inrKtnya_W/exec?${queryParams}`,
			{
				redirect: 'follow',
				headers: {
					'Content-Type': 'text/plain;charset=utf-8',
				},
			}
		).then((response) => {
            const res =  response.json();
            return res;
        }).catch( (e) => {
            console.error(`어드민 정보를 못가지고 옴`)
        });
	}
}
