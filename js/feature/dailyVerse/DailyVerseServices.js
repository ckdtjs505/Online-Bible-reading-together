import { bookKeyNumber, chapter } from "../bibleReading/BibleReadingData.js";
import DailyVerseModel from "./DailyVerseModel.js";
const API_URL = 'https://yesu.io/bible';
export default class DailyVerseService {
    static getDailyVerse({ lang, book, start, end }) {
		return fetch(`${API_URL}?lang=${lang}&doc=${chapter[book]}&start=${start}:1&end=${end}:200`)
			.then((response) => {
				return response.json();
			})
			.then((info) => {
				if( chapter[book] === "1pet" ){
					info.forEach( ({chapter, verse, message }, idx) => {
						if( message === ''){
							if( chapter == 2){
								if( verse == 23) info[idx].message = "욕을 받으시되 대신 욕하지 아니하시고 고난을 받으시되 위협하지 아니하시고 오직 공의로 심판하시는 자에게 부탁하시며"
								if( verse == 24) info[idx].message = "친히 나무에 달려 그 몸으로 우리 죄를 담당하셨으니 이는 우리로 죄에 대하여 죽고 의에 대하여 살게 하려 하심이라 저가 채찍에 맞음으로 너희는 나음을 얻었나니"
								if( verse == 25) info[idx].message = "너희가 전에는 양과 같이 길을 잃었더니 이제는 너희 영혼의 목자와 감독 되신 이에게 돌아왔느니라"
							}
							if( chapter == 3){
								if( verse == 20) info[idx].message = "그들은 전에 노아의 날 방주 예비할 동안 하나님이 오래 참고 기다리실 때에 순종치 아니하던 자들이라 방주에서 물로 말미암아 구원을 얻은 자가 몇명 뿐이니 겨우 여덟 명이라"
								if( verse == 21) info[idx].message = "물은 예수 그리스도의 부활하심으로 말미암아 이제 너희를 구원하는 표니 곧 세례라 육체의 더러운 것을 제하여 버림이 아니요 오직 선한 양심이 하나님을 향하여 찾아가는 것이라"
								if( verse == 22) info[idx].message = "저는 하늘에 오르사 하나님 우편에 계시니 천사들과 권세들과 능력들이 저에게 순복하느니"
							}
							if( chapter == 4){
								if( verse == 15) info[idx].message = "너희 중에 누구든지 살인이나 도적질이나 악행이나 남의 일을 간섭하는 자로 고난을 받지 말려니와"
								if( verse == 16) info[idx].message = "만일 그리스도인으로 고난을 받은즉 부끄러워 말고 도리어 그 이름으로 하나님께 영광을 돌리라"
								if( verse == 17) info[idx].message = "하나님 집에서 심판을 시작할 때가 되었나니 만일 우리에게 먼저 하면 하나님의 복음을 순종치 아니하는 자들의 그 마지막이 어떠하며"
								if( verse == 18) info[idx].message = "또 의인이 겨우 구원을 얻으면 경건치 아니한 자와 죄인이 어디 서리요"
								if( verse == 19) info[idx].message = "그러므로 하나님의 뜻대로 고난을 받는 자들은 또한 선을 행하는 가운데 그 영혼을 미쁘신 조물주께 부탁할찌어다"
							}
							if( chapter == 5){
								if( verse == 1) info[idx].message = '너희 중 장로들에게 권하노니 나는 함께 장로 된 자요 그리스도의 고난의 증인이요 나타날 영광에 참예할 자로라';
								if( verse == 2) info[idx].message = "너희 중에 있는 하나님의 양 무리를 치되 부득이함으로 하지 말고 오직 하나님의 뜻을 좇아 자원함으로 하며 더러운 이를 위하여 하지 말고 오직 즐거운 뜻으로 하며"
								if( verse == 3) info[idx].message = "맡기운 자들에게 주장하는 자세를 하지 말고 오직 양 무리의 본이 되라 "
								if( verse == 4) info[idx].message = "그리하면 목자장이 나타나실 때에 시들지 아니하는 영광의 면류관을 얻으리라 "
								if( verse == 5) info[idx].message = "젊은 자들아 이와 같이 장로들에게 순복하고 다 서로 겸손으로 허리를 동이라 하나님이 교만한 자를 대적하시되 겸손한 자들에게는 은혜를 주시느니라 "
								if( verse == 6) info[idx].message = "그러므로 하나님의 능하신 손 아래서 겸손하라 때가 되면 너희를 높이시리라"
								if( verse == 7) info[idx].message = "너희 염려를 다 주께 맡겨 버리라 이는 저가 너희를 권고하심이니라 "
								if( verse == 8) info[idx].message = "근신하라 깨어라 너희 대적 마귀가 우는 사자 같이 두루 다니며 삼킬 자를 찾나니 "
								if( verse == 9) info[idx].message = "너희는 믿음을 굳게 하여 저를 대적하라 이는 세상에 있는 너희 형제들도 동일한 고난을 당하는 줄을 앎이니라 "
								if( verse == 10) info[idx].message = "모든 은혜의 하나님 곧 그리스도 안에서 너희를 부르사 자기의 영원한 영광에 들어가게 하신 이가 잠간 고난을 받은 너희를 친히 온전케 하시며 굳게 하시며 강하게 하시며 터를 견고케 하시리라 "
								if( verse == 11) info[idx].message = "권력이 세세무궁토록 그에게 있을찌어다 아멘 "
								if( verse == 12) info[idx].message = "내가 신실한 형제로 아는 실루아노로 말미암아 너희에게 간단히 써서 권하고 이것이 하나님의 참된 은혜임을 증거하노니 너희는 이 은혜에 굳게 서라"
								if( verse == 13) info[idx].message = "함께 택하심을 받은 바벨론에 있는 교회가 너희에게 문안하고 내 아들 마가도 그리하느니라 "
								if( verse == 14) info[idx].message = "너희는 사랑의 입맞춤으로 피차 문안하라 그리스도 안에 있는 너희 모든 이에게 평강이 있을찌어다"
							}
						}
					})
				}
				else if(chapter[book] === "ge"){
					info.forEach( ({chapter, verse, message }, idx) => {
						if( message === ''){
							if( chapter == 30){
								if( verse == 32) info[idx].message = '오늘 내가 외삼촌의 양 떼에 두루 다니며 그 양 중에 아롱진 것과 점 있는 것과 검은 것을 가려내며 또 염소 중에 점 있는 것과 아롱진 것을 가려내리니 이같은 것이 내 품삯이 되리이다';
								if( verse == 33) info[idx].message = '후일에 외삼촌께서 오셔서 내 품삯을 조사하실 때에 나의 의가 내 대답이 되리이다 내게 혹시 염소 중 아롱지지 아니한 것이나 점이 없는 것이나 양 중에 검지 아니한 것이 있거든 다 도둑질한 것으로 인정하소서'; 
								if( verse == 34) info[idx].message = '라반이 이르되 내가 네 말대로 하리라 하고';
								if( verse == 35) info[idx].message = '그 날에 그가 숫염소 중 얼룩무늬 있는 것과 점 있는 것을 가리고 암염소 중 흰 바탕에 아롱진 것과 점 있는 것을 가리고 양 중의 검은 것들을 가려 자기 아들들의 손에 맡기고'; 
								if( verse == 36) info[idx].message = '자기와 야곱의 사이를 사흘 길이 뜨게 하였고 야곱은 라반의 남은 양 떼를 치니라';
								if( verse == 37) info[idx].message = '야곱이 버드나무와 살구나무와 신풍나무의 푸른 가지를 가져다가 그것들의 껍질을 벗겨 흰 무늬를 내고';
								if( verse == 38) info[idx].message = '그 껍질 벗긴 가지를 양 떼가 와서 먹는 개천의 물 구유에 세워 양 떼를 향하게 하매 그 떼가 물을 먹으러 올 때에 새끼를 배니';
								if( verse == 39) info[idx].message = '가지 앞에서 새끼를 배므로 얼룩얼룩한 것과 점이 있고 아롱진 것을 낳은지라';
								if( verse == 40) info[idx].message = '야곱이 새끼 양을 구분하고 그 얼룩무늬와 검은 빛 있는 것을 라반의 양과 서로 마주보게 하며 자기 양을 따로 두어 라반의 양과 섞이지 않게 하며'; 
								if( verse == 41) info[idx].message = '튼튼한 양이 새끼 밸 때에는 야곱이 개천에다가 양 떼의 눈 앞에 그 가지를 두어 양이 그 가지 곁에서 새끼를 배게 하고';
								if( verse == 42) info[idx].message = '약한 양이면 그 가지를 두지 아니하니 그렇게 함으로 약한 것은 라반의 것이 되고 튼튼한 것은 야곱의 것이 된지라'; 
								if( verse == 43) info[idx].message = '이에 그 사람이 매우 번창하여 양 떼와 노비와 낙타와 나귀가 많았더라';
							}
						}
					})
				}
                return info.map(data => new DailyVerseModel( data.chapter, data.message, data.verse));
			}).catch( (e) => {
				console.error(`getTodayDat를 못가지고 옴`)
                return [];
			});
	}

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
			console.log(res);
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
			console.log(res);
			return res.map(data => new DailyVerseModel( data.chapter, data.message, data.verse));
        }).catch( (e) => {
            console.error(e)
        });
	}
}


