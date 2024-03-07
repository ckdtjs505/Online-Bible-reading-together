import { chapter } from "../bibleReading/BibleReadingData.js";
import DailyVerseModel from "./DailyVerseModel.js";
const API_URL = 'https://yesu.io/bible';
export default class DailyVerseService {
    static getDailyVerse({ lang, book, start, end }) {
		return fetch(`${API_URL}?lang=${lang}&doc=${chapter[book]}&start=${start}:1&end=${end}:200`)
			.then((response) => {
				return response.json();
			})
			.then((info) => {
                return info.map(data => new DailyVerseModel( data.chapter, data.message, data.verse));
			}).catch( (e) => {
				console.error(`getTodayDat를 못가지고 옴`)
                return [];
			});
	}
}


