const API_URL = 'https://yesu.io/bible';

const doc = {
	창세기: 'ge',
	출애굽기: 'exo',
	레위기: 'lev',
	민수기: 'num',
	신명기: 'deu',
	여호수아: 'josh',
	사사기: 'jdgs',
	룻기: 'ruth',
	사무엘상: '1sm',
	사무엘하: '2sm',
	열왕기상: '1ki',
	열왕기하: '2ki',
	역대상: '1chr',
	역대하: '2chr',
	에스라: 'ezra',
	느헤미야: 'neh',
	에스더: 'est',
	욥기: 'job',
	시편: 'psa',
	잠언: 'prv',
	전도서: 'eccl',
	아가: 'ssol',
	이사야: 'isa',
	예레미야: 'jer',
	예레미야애가: 'lam',
	에스겔: 'eze',
	다니엘: 'dan',
	호세아: 'hos',
	요엘: 'joel',
	아모스: 'amos',
	오바댜: 'obad',
	요나: 'jonah',
	미가: 'mic',
	나훔: 'nahum',
	하박국: 'hab',
	스바냐: 'zep',
	학개: 'hag',
	스가랴: 'zec',
	말라기: 'mal',
	마태복음: 'mat',
	마가복음: 'mark',
	누가복음: 'luke',
	요한복음: 'john',
	사도행전: 'acts',
	로마서: 'rom',
	고린도전서: '1cor',
	고린도후서: '2cor',
	갈라디아서: 'gal',
	에베소서: 'eph',
	빌립보서: 'phi',
	골로새서: 'col',
	데살로니가전서: '1th',
	데살로니가후서: '2th',
	디모데전서: '1tim',
	디모데후서: '2tim',
	디도서: 'titus',
	빌레몬서: 'phmn',
	히브리서: 'heb',
	야고보서: 'jas',
	베드로전서: '1pet',
	베드로후서: '2pet',
	요한1서: '1jn',
	요한2서: '2jn',
	요한3서: '3jn',
	유다서: 'jude',
	요한계시록: 'rev',
};

const todayOrder = (month, day) => {
	const table = {
		'12_11': {
			lang: 'kor',
			doc: doc['스바냐'],
			pos: '스바냐',
			start: '1',
			end: '3', // 끝가지 다읽기
			daycnt: 199,
		},
		'12_12': {
			lang: 'kor',
			doc: doc['학개'],
			pos: '학개',
			start: '1',
			end: '2', // 끝가지 다읽기
			daycnt: 200,
		},
		'12_13': {
			lang: 'kor',
			doc: doc['스가랴'],
			pos: '스가랴',
			start: '1',
			end: '8', // 끝가지 다읽기
			daycnt: 201,
		},
		'12_14': {
			lang: 'kor',
			doc: doc['스가랴'],
			pos: '스가랴',
			start: '9',
			end: '14', // 끝가지 다읽기
			daycnt: 202,
		},
		'12_15': {
			lang: 'kor',
			doc: doc['말라기'],
			pos: '말라기',
			start: '1',
			end: '100', // 끝가지 다읽기
			daycnt: 203,
		},
		'1_2': {
			lang: 'kor',
			doc: doc['마태복음'],
			pos: '마태복음',
			start: '1',
			end: '4', // 끝가지 다읽기
			daycnt: 2,
		},
		'1_3': {
			lang: 'kor',
			doc: doc['마태복음'],
			pos: '마태복음',
			start: '5',
			end: '7', // 끝가지 다읽기
			daycnt: 3,
		},
		'1_4': {
			lang: 'kor',
			doc: doc['마태복음'],
			pos: '마태복음',
			start: '8',
			end: '10', // 끝가지 다읽기
			daycnt: 4,
		},
		'1_5': {
			lang: 'kor',
			doc: doc['마태복음'],
			pos: '마태복음',
			start: '11',
			end: '14', // 끝가지 다읽기
			daycnt: 5,
		},
		'1_8': {
			lang: 'kor',
			doc: doc['마태복음'],
			pos: '마태복음',
			start: '15',
			end: '18', // 끝가지 다읽기
			daycnt: 6,
		},
		'1_9': {
			lang: 'kor',
			doc: doc['마태복음'],
			pos: '마태복음',
			start: '19',
			end: '21', // 끝가지 다읽기
			daycnt: 7,
		},
		'1_10': {
			lang: 'kor',
			doc: doc['마태복음'],
			pos: '마태복음',
			start: '22',
			end: '25', // 끝가지 다읽기
			daycnt: 8,
		},
		'1_11': {
			lang: 'kor',
			doc: doc['마태복음'],
			pos: '마태복음',
			start: '26',
			end: '28', // 끝가지 다읽기
			daycnt: 9,
		},
		'1_12': {
			lang: 'kor',
			doc: doc['마가복음'],
			pos: '마가복음',
			start: '1',
			end: '4', // 끝가지 다읽기
			daycnt: 10,
		},
		'1_15': {
			lang: 'kor',
			doc: doc['마가복음'],
			pos: '마가복음',
			start: '5',
			end: '8', // 끝가지 다읽기
			daycnt: 11,
		},
		'1_16': {
			lang: 'kor',
			doc: doc['마가복음'],
			pos: '마가복음',
			start: '9',
			end: '12', // 끝가지 다읽기
			daycnt: 12,
		},
		'1_17': {
			lang: 'kor',
			doc: doc['마가복음'],
			pos: '마가복음',
			start: '13',
			end: '16', // 끝가지 다읽기
			daycnt: 13,
		},
		'1_18': {
			lang: 'kor',
			doc: doc['누가복음'],
			pos: '누가복음',
			start: '1',
			end: '4', // 끝가지 다읽기
			daycnt: 14,
		},
		'1_19': {
			lang: 'kor',
			doc: doc['누가복음'],
			pos: '누가복음',
			start: '5',
			end: '8', // 끝가지 다읽기
			daycnt: 15,
		},
		'1_22': {
			lang: 'kor',
			doc: doc['누가복음'],
			pos: '누가복음',
			start: '9',
			end: '12', // 끝가지 다읽기
			daycnt: 16,
		},
		'1_23': {
			lang: 'kor',
			doc: doc['누가복음'],
			pos: '누가복음',
			start: '13',
			end: '15', // 끝가지 다읽기
			daycnt: 17,
		},
		'1_24': {
			lang: 'kor',
			doc: doc['누가복음'],
			pos: '누가복음',
			start: '16',
			end: '18', // 끝가지 다읽기
			daycnt: 18,
		},
		'1_25': {
			lang: 'kor',
			doc: doc['누가복음'],
			pos: '누가복음',
			start: '19',
			end: '21', // 끝가지 다읽기
			daycnt: 19,
		},
		'1_26': {
			lang: 'kor',
			doc: doc['누가복음'],
			pos: '누가복음',
			start: '22',
			end: '24', // 끝가지 다읽기
			daycnt: 20,
		},
		'1_29': {
			lang: 'kor',
			doc: doc['요한복음'],
			pos: '요한복음',
			start: '1',
			end: '4', // 끝가지 다읽기
			daycnt: 21,
		},
		'1_30': {
			lang: 'kor',
			doc: doc['요한복음'],
			pos: '요한복음',
			start: '5',
			end: '7', // 끝가지 다읽기
			daycnt: 22,
		},
		'1_31': {
			lang: 'kor',
			doc: doc['요한복음'],
			pos: '요한복음',
			start: '8',
			end: '10', // 끝가지 다읽기
			daycnt: 23,
		},
		'2_1': {
			lang: 'kor',
			doc: doc['요한복음'],
			pos: '요한복음',
			start: '11',
			end: '13', // 끝가지 다읽기
			daycnt: 24,
		},
		'2_2': {
			lang: 'kor',
			doc: doc['요한복음'],
			pos: '요한복음',
			start: '14',
			end: '17', // 끝가지 다읽기
			daycnt: 25,
		},
		'2_3': {
			lang: 'kor',
			doc: doc['요한복음'],
			pos: '요한복음',
			start: '18',
			end: '21', // 끝가지 다읽기
			daycnt: 26,
		},
		'2_5': {
			lang: 'kor',
			doc: doc['사도행전'],
			pos: '사도행전',
			start: '1',
			end: '4', // 끝가지 다읽기
			daycnt: 27,
		},
		'2_6': {
			lang: 'kor',
			doc: doc['사도행전'],
			pos: '사도행전',
			start: '5',
			end: '8', // 끝가지 다읽기
			daycnt: 28,
		},
		'2_7': {
			lang: 'kor',
			doc: doc['사도행전'],
			pos: '사도행전',
			start: '9',
			end: '11', // 끝가지 다읽기
			daycnt: 29,
		},
		'2_8': {
			lang: 'kor',
			doc: doc['사도행전'],
			pos: '사도행전',
			start: '12',
			end: '14', // 끝가지 다읽기
			daycnt: 30,
		},
		'2_13': {
			lang: 'kor',
			doc: doc['사도행전'],
			pos: '사도행전',
			start: '15',
			end: '17', // 끝가지 다읽기
			daycnt: 31,
		},
		'2_14': {
			lang: 'kor',
			doc: doc['사도행전'],
			pos: '사도행전',
			start: '18',
			end: '20', // 끝가지 다읽기
			daycnt: 32,
		},
		'2_15': {
			lang: 'kor',
			doc: doc['사도행전'],
			pos: '사도행전',
			start: '21',
			end: '24', // 끝가지 다읽기
			daycnt: 33,
		},
		'2_16': {
			lang: 'kor',
			doc: doc['사도행전'],
			pos: '사도행전',
			start: '25',
			end: '28', // 끝가지 다읽기
			daycnt: 34,
		},
		'2_17': {
			lang: 'kor',
			doc: doc['로마서'],
			pos: '로마서',
			start: '1',
			end: '4', // 끝가지 다읽기
			daycnt: 35,
		},
		'2_19': {
			lang: 'kor',
			doc: doc['로마서'],
			pos: '로마서',
			start: '5',
			end: '8', // 끝가지 다읽기
			daycnt: 36,
		},
		'2_20': {
			lang: 'kor',
			doc: doc['로마서'],
			pos: '로마서',
			start: '9',
			end: '12', // 끝가지 다읽기
			daycnt: 37,
		},
		'2_21': {
			lang: 'kor',
			doc: doc['로마서'],
			pos: '로마서',
			start: '13',
			end: '16', // 끝가지 다읽기
			daycnt: 38,
		},
		'2_22': {
			lang: 'kor',
			doc: doc['고린도전서'],
			pos: '고린도전서',
			start: '1',
			end: '4', // 끝가지 다읽기
			daycnt: 39,
		},
		'2_23': {
			lang: 'kor',
			doc: doc['고린도전서'],
			pos: '고린도전서',
			start: '5',
			end: '8', // 끝가지 다읽기
			daycnt: 40,
		},
		'2_24': {
			lang: 'kor',
			doc: doc['고린도전서'],
			pos: '고린도전서',
			start: '9',
			end: '11', // 끝가지 다읽기
			daycnt: 41,
		},
		'2_26': {
			lang: 'kor',
			doc: doc['고린도전서'],
			pos: '고린도전서',
			start: '12',
			end: '14',
			daycnt: 42,
		},
		'2_27': {
			lang: 'kor',
			doc: doc['고린도전서'],
			pos: '고린도전서',
			start: '15',
			end: '16', // 끝가지 다읽기
			daycnt: 43,
		},
		'2_28': {
			lang: 'kor',
			doc: doc['고린도후서'],
			pos: '고린도후서',
			start: '1',
			end: '4', // 끝가지 다읽기
			daycnt: 44,
		},
		'2_29': {
			lang: 'kor',
			doc: doc['고린도후서'],
			pos: '고린도후서',
			start: '5',
			end: '9', // 끝가지 다읽기
			daycnt: 45,
		},
		'3_1': {
			lang: 'kor',
			doc: doc['고린도후서'],
			pos: '고린도후서',
			start: '10',
			end: '13', // 끝가지 다읽기
			daycnt: 46,
		},
		'3_2': {
			lang: 'kor',
			doc: doc['갈라디아서'],
			pos: '갈라디아서',
			start: '1',
			end: '16', // 끝가지 다읽기
			daycnt: 47,
		},
		'3_4': {
			lang: 'kor',
			doc: doc['디모데전서'],
			pos: '디모데전서',
			start: '1',
			end: '6', // 끝가지 다읽기
			daycnt: 48,
		},
		'3_5': {
			lang: 'kor',
			doc: doc['디모데후서'],
			pos: '디모데후서',
			start: '1',
			end: '4', // 끝가지 다읽기
			daycnt: 49,
		},
		'3_6': {
			lang: 'kor',
			doc: doc['디도서'],
			pos: '디도서',
			start: '1',
			end: '3', // 끝가지 다읽기
			daycnt: 50,
		},
		'3_7': {
			lang: 'kor',
			doc: doc['빌레몬서'],
			pos: '빌레몬서',
			start: '1',
			end: '1', 
			daycnt: 51,
		},
		'3_8': {
			lang: 'kor',
			doc: doc['히브리서'],
			pos: '히브리서',
			start: '1',
			end: '6', 
			daycnt: 52,
		},
		'3_9': {
			lang: 'kor',
			doc: doc['히브리서'],
			pos: '히브리서',
			start: '7',
			end: '10',
			daycnt: 53,
		},
		'3_11': {
			lang: 'kor',
			doc: doc['히브리서'],
			pos: '히브리서',
			start: '11',
			end: '13', 
			daycnt: 54,
		},
		'3_12': {
			lang: 'kor',
			doc: doc['야고보서'],
			pos: '야고보서',
			start: '1',
			end: '5',
			daycnt: 55,
		},
		'3_13': {
			lang: 'kor',
			doc: doc['베드로전서'],
			pos: '베드로전서',
			start: '1',
			end: '5',
			daycnt: 56,
		},
		'3_14': {
			lang: 'kor',
			doc: doc['베드로후서'],
			pos: '베드로후서',
			start: '1',
			end: '3', 
			daycnt: 57,
		},
		'3_15': {
			lang: 'kor',
			doc: doc['요한1서'],
			pos: '요한1서',
			start: '1',
			end: '5', 
			daycnt: 58,
		},
		'3_16': {
			lang: 'kor',
			doc:[ doc['요한2서'], doc['요한3서'], doc['유다서']],
			pos: ['요한2서', '요한3서', '유다서' ],
			start: '1',
			end: '1', 
			daycnt: 59,
		},
		'3_18': {
			lang: 'kor',
			doc: doc['요한계시록'],
			pos: '요한계시록',
			start: '1',
			end: '3', 
			daycnt: 60,
		},
		'3_19': {
			lang: 'kor',
			doc: doc['요한계시록'],
			pos: '요한계시록',
			start: '4',
			end: '9', 
			daycnt: 61,
		},
		'3_20': {
			lang: 'kor',
			doc: doc['요한계시록'],
			pos: '요한계시록',
			start: '10',
			end: '13', 
			daycnt: 62,
		},
		'3_21': {
			lang: 'kor',
			doc: doc['요한계시록'],
			pos: '요한계시록',
			start: '14',
			end: '18', 
			daycnt: 63,
		},
		'3_22': {
			lang: 'kor',
			doc: doc['요한계시록'],
			pos: '요한계시록',
			start: '19',
			end: '22', 
			daycnt: 64,
		},
		'3_23': {
			lang: 'kor',
			doc: doc['에베소서'],
			pos: '에베소서',
			start: '1',
			end: '6', 
			daycnt: 65,
		},
		'3_25': {
			lang: 'kor',
			doc: doc['빌립보서'],
			pos: '빌립보서',
			start: '1',
			end: '4', 
			daycnt: 66,
		},
		'3_26': {
			lang: 'kor',
			doc: doc['골로새서'],
			pos: '골로새서',
			start: '1',
			end: '4', 
			daycnt: 67,
		},
		'3_27': {
			lang: 'kor',
			doc: doc['데살로니가전서'],
			pos: '데살로니가전서',
			start: '1',
			end: '5', 
			daycnt: 68,
		},
		'3_28': {
			lang: 'kor',
			doc: doc['데살로니가후서'],
			pos: '데살로니가후서',
			start: '1',
			end: '3', 
			daycnt: 69,
		},
		
		none: {
			lang: 'kor',
			doc: '',
			pos: '',
			start: '',
			end: '', // 끝가지 다읽기
			daycnt: '',
		},
	};

	return table[`${month}_${day}`] || table['none'];
};
