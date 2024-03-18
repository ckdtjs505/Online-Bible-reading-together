export default class BibleVideoService {
	getVideoInfo() {
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
		).then((response) => {
            const res =  response.json();
            return res;
        }).catch( (e) => {
            console.error(`어드민 정보를 못가지고 옴`)
        });
	}
}
