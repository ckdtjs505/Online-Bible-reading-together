import { bookKeyNumber, chapter } from "../bibleReading/BibleReadingData.js";
import DailyVerseModel from "./DailyVerseModel.js";
const API_URL = 'https://yesu.io/bible';
export default class DailyVerseService {
	static getDailyVerseInKorean({ lang, book, start, end }) {
		const queryParams = new URLSearchParams({
			type: 'getBible',
			book : bookKeyNumber(book),
			start,
			end
		});

		return fetch(
			`https://script.google.com/macros/s/AKfycbyG3RF_QF7FTnl-rtPKLbuAp6Fp8dhyoDD1oCR_0PI54zAJgHU_RlsOkU3VgOof2Q/exec?${queryParams}`,
			{
				redirect: 'follow',
				headers: {
					'Content-Type': 'text/plain;charset=utf-8',
				},
			}
		).
		then((response) => {
            const res =  response.json();
			return res;
        }).
		then((res) => {
			return res.map(data => new DailyVerseModel( data.chapter, data.message, data.verse));
        }).catch( (e) => {
            console.error(e)
        });
	}

	static getDailyVerseInKIV({ lang, book, start, end }) {
		const queryParams = new URLSearchParams({
			type: 'getKIV',
			book : bookKeyNumber(book),
			start,
			end
		});

		return fetch(
			`https://script.google.com/macros/s/AKfycbxqS1R9w1vnTRyS379DAmUxKapSdJdohYN6AuFTL9rwWsn5y2QZzGlhzv03wWWyNN2s/exec?${queryParams}`,
			{
				redirect: 'follow',
				headers: {
					'Content-Type': 'text/plain;charset=utf-8',
				},
			}
		).
		then((response) => {
            const res =  response.json();
			return res;
        }).
		then((res) => {
			return res.map(data => new DailyVerseModel( data.chapter, data.message, data.verse));
        }).catch( (e) => {
            console.error(e)
        });
	}
}


