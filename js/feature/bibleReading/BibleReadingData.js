const BibleReadingsData = [
    { date: '2024-1-2', lang: 'kor', book: '마태복음', start: '1', end: '4', dayCount: 2 },
    { date: '2024-1-3', lang: 'kor', book: '마태복음', start: '5', end: '7', dayCount: 3 },
    { date: '2024-1-4', lang: 'kor', book: '마태복음', start: '8', end: '10', dayCount: 4 },
    { date: '2024-1-5', lang: 'kor', book: '마태복음', start: '11', end: '14', dayCount: 5 },
    { date: '2024-1-8', lang: 'kor', book: '마태복음', start: '15', end: '18', dayCount: 6 },
    { date: '2024-1-9', lang: 'kor', book: '마태복음', start: '19', end: '21', dayCount: 7 },
    { date: '2024-1-10', lang: 'kor', book: '마태복음', start: '22', end: '25', dayCount: 8 },
    { date: '2024-1-11', lang: 'kor', book: '마태복음', start: '26', end: '28', dayCount: 9 },
    { date: '2024-1-12', lang: 'kor', book: '마가복음', start: '1', end: '4', dayCount: 10 },
    { date: '2024-1-15', lang: 'kor', book: '마가복음', start: '5', end: '8', dayCount: 11 },
    { date: '2024-1-16', lang: 'kor', book: '마가복음', start: '9', end: '12', dayCount: 12 },
    { date: '2024-1-17', lang: 'kor', book: '마가복음', start: '13', end: '16', dayCount: 13 },
    { date: '2024-1-18', lang: 'kor', book: '누가복음', start: '1', end: '4', dayCount: 14 },
    { date: '2024-1-19', lang: 'kor', book: '누가복음', start: '5', end: '8', dayCount: 15 },
    { date: '2024-1-22', lang: 'kor', book: '누가복음', start: '9', end: '12', dayCount: 16 },
    { date: '2024-1-23', lang: 'kor', book: '누가복음', start: '13', end: '15', dayCount: 17 },
    { date: '2024-1-24', lang: 'kor', book: '누가복음', start: '16', end: '18', dayCount: 18 },
    { date: '2024-1-25', lang: 'kor', book: '누가복음', start: '19', end: '21', dayCount: 19 },
    { date: '2024-1-26', lang: 'kor', book: '누가복음', start: '22', end: '24', dayCount: 20 },
    { date: '2024-1-29', lang: 'kor', book: '요한복음', start: '1', end: '4', dayCount: 21 },
    { date: '2024-1-30', lang: 'kor', book: '요한복음', start: '5', end: '7', dayCount: 22 },
    { date: '2024-1-31', lang: 'kor', book: '요한복음', start: '8', end: '10', dayCount: 23 },
    { date: '2024-2-1', lang: 'kor', book: '요한복음', start: '11', end: '13', dayCount: 24 },
    { date: '2024-2-2', lang: 'kor', book: '요한복음', start: '14', end: '17', dayCount: 25 },
    { date: '2024-2-3', lang: 'kor', book: '요한복음', start: '18', end: '21', dayCount: 26 },
    { date: '2024-2-5', lang: 'kor', book: '사도행전', start: '1', end: '4', dayCount: 27 },
    { date: '2024-2-6', lang: 'kor', book: '사도행전', start: '5', end: '8', dayCount: 28 },
    { date: '2024-2-7', lang: 'kor', book: '사도행전', start: '9', end: '11', dayCount: 29 },
    { date: '2024-2-8', lang: 'kor', book: '사도행전', start: '12', end: '14', dayCount: 30 },
    { date: '2024-2-13', lang: 'kor', book: '사도행전', start: '15', end: '17', dayCount: 31 },
    { date: '2024-2-14', lang: 'kor', book: '사도행전', start: '18', end: '20', dayCount: 32 },
    { date: '2024-2-15', lang: 'kor', book: '사도행전', start: '21', end: '24', dayCount: 33 },
    { date: '2024-2-16', lang: 'kor', book: '사도행전', start: '25', end: '28', dayCount: 34 },
    { date: '2024-2-17', lang: 'kor', book: '로마서', start: '1', end: '4', dayCount: 35 },
    { date: '2024-2-19', lang: 'kor', book: '로마서', start: '5', end: '8', dayCount: 36 },
    { date: '2024-2-20', lang: 'kor', book: '로마서', start: '9', end: '12', dayCount: 37 },
    { date: '2024-2-21', lang: 'kor', book: '로마서', start: '13', end: '16', dayCount: 38 },
    { date: '2024-2-22', lang: 'kor', book: '고린도전서', start: '1', end: '4', dayCount: 39 },
    { date: '2024-2-23', lang: 'kor', book: '고린도전서', start: '5', end: '8', dayCount: 40 },
    { date: '2024-2-24', lang: 'kor', book: '고린도전서', start: '9', end: '11', dayCount: 41 },
    { date: '2024-2-26', lang: 'kor', book: '고린도전서', start: '12', end: '14', dayCount: 42 },
    { date: '2024-2-27', lang: 'kor', book: '고린도전서', start: '15', end: '16', dayCount: 43 },
    { date: '2024-2-28', lang: 'kor', book: '고린도후서', start: '1', end: '4', dayCount: 44 },
    { date: '2024-2-29', lang: 'kor', book: '고린도후서', start: '5', end: '9', dayCount: 45 },
    { date: '2024-3-1', lang: 'kor', book: '고린도후서', start: '10', end: '13', dayCount: 46 },
    { date: '2024-3-2', lang: 'kor', book: '갈라디아서', start: '1', end: '6', dayCount: 47 },
    { date: '2024-3-4', lang: 'kor', book: '디모데전서', start: '1', end: '6', dayCount: 48 },
    { date: '2024-3-5', lang: 'kor', book: '디모데후서', start: '1', end: '4', dayCount: 49 },
    { date: '2024-3-6', lang: 'kor', book: '디도서', start: '1', end: '3', dayCount: 50 },
    { date: '2024-3-7', lang: 'kor', book: '빌레몬서', start: '1', end: '1', dayCount: 51 },
    { date: '2024-3-8', lang: 'kor', book: '히브리서', start: '1', end: '6', dayCount: 52 },
    { date: '2024-3-9', lang: 'kor', book: '히브리서', start: '7', end: '10', dayCount: 53 },
    { date: '2024-3-11', lang: 'kor', book: '히브리서', start: '11', end: '13', dayCount: 54 },
    { date: '2024-3-12', lang: 'kor', book: '야고보서', start: '1', end: '5', dayCount: 55 },
    { date: '2024-3-13', lang: 'kor', book: '베드로전서', start: '1', end: '5', dayCount: 56 },
    { date: '2024-3-14', lang: 'kor', book: '베드로후서', start: '1', end: '3', dayCount: 57 },
    { date: '2024-3-15', lang: 'kor', book: '요한1서', start: '1', end: '5', dayCount: 58 },
    {
        date: '2024-3-16',
        readings: [
            { lang: 'kor', book: '요한2서', start: '1', end: '1'},
            { lang: 'kor', book: '요한3서', start: '1', end: '1'},
            { lang: 'kor', book: '유다서', start: '1', end: '1'}
        ],
        dayCount: 59
    },
    { date: '2024-3-18', lang: 'kor', book: '요한계시록', start: '1', end: '3', dayCount: 60 },
    { date: '2024-3-19', lang: 'kor', book: '요한계시록', start: '4', end: '9', dayCount: 61 },
    { date: '2024-3-20', lang: 'kor', book: '요한계시록', start: '10', end: '13', dayCount: 62 },
    { date: '2024-3-21', lang: 'kor', book: '요한계시록', start: '14', end: '18', dayCount: 63 },
    { date: '2024-3-22', lang: 'kor', book: '요한계시록', start: '19', end: '22', dayCount: 64 },
    { date: '2024-3-23', lang: 'kor', book: '에베소서', start: '1', end: '6', dayCount: 65 },
    { date: '2024-3-25', lang: 'kor', book: '빌립보서', start: '1', end: '4', dayCount: 66 },
    { date: '2024-3-26', lang: 'kor', book: '골로새서', start: '1', end: '4', dayCount: 67 },
    { date: '2024-3-27', lang: 'kor', book: '데살로니가전서', start: '1', end: '5', dayCount: 68 },
    { date: '2024-3-28', lang: 'kor', book: '데살로니가후서', start: '1', end: '3', dayCount: 69 },
    { date: '2024-4-1', lang: 'kor', book: '창세기', start: '1', end: '4', dayCount: 70 },
    { date: '2024-4-2', lang: 'kor', book: '창세기', start: '5', end: '8', dayCount: 71 },
    { date: '2024-4-3', lang: 'kor', book: '창세기', start: '9', end: '11', dayCount: 72 },
    { date: '2024-4-4', lang: 'kor', book: '창세기', start: '12', end: '15', dayCount: 73 },
    { date: '2024-4-5', lang: 'kor', book: '창세기', start: '16', end: '19', dayCount: 74 },
    { date: '2024-4-6', lang: 'kor', book: '창세기', start: '20', end: '23', dayCount: 75 },
    { date: '2024-4-8', lang: 'kor', book: '창세기', start: '24', end: '26', dayCount: 76 },
    { date: '2024-4-9', lang: 'kor', book: '창세기', start: '27', end: '31', dayCount: 77 },
    { date: '2024-4-10', lang: 'kor', book: '창세기', start: '32', end: '36', dayCount: 78 },
    { date: '2024-4-11', lang: 'kor', book: '창세기', start: '37', end: '41', dayCount: 79 },
    { date: '2024-4-12', lang: 'kor', book: '창세기', start: '42', end: '45', dayCount: 80 },
    { date: '2024-4-13', lang: 'kor', book: '창세기', start: '46', end: '50', dayCount: 81 },
    { date: '2024-4-15', lang: 'kor', book: '출애굽기', start: '1', end: '4', dayCount: 82 },
    { date: '2024-4-16', lang: 'kor', book: '출애굽기', start: '5', end: '7', dayCount: 83 },
    { date: '2024-4-17', lang: 'kor', book: '출애굽기', start: '8', end: '11', dayCount: 84 },
    { date: '2024-4-18', lang: 'kor', book: '출애굽기', start: '12', end: '15', dayCount: 85 },
    { date: '2024-4-19', lang: 'kor', book: '출애굽기', start: '16', end: '19', dayCount: 86 },
    { date: '2024-4-20', lang: 'kor', book: '출애굽기', start: '20', end: '22', dayCount: 87 },
    { date: '2024-4-22', lang: 'kor', book: '출애굽기', start: '23', end: '25', dayCount: 88 },
    { date: '2024-4-23', lang: 'kor', book: '출애굽기', start: '26', end: '28', dayCount: 89 },
    { date: '2024-4-24', lang: 'kor', book: '출애굽기', start: '29', end: '31', dayCount: 90 },
    { date: '2024-4-25', lang: 'kor', book: '출애굽기', start: '32', end: '34', dayCount: 91 },
    { date: '2024-4-26', lang: 'kor', book: '출애굽기', start: '35', end: '37', dayCount: 92 },
    { date: '2024-4-27', lang: 'kor', book: '출애굽기', start: '38', end: '40', dayCount: 93 },
    { date: '2024-4-29', lang: 'kor', book: '레위기', start: '1', end: '5', dayCount: 94 },
    { date: '2024-4-30', lang: 'kor', book: '레위기', start: '6', end: '9', dayCount: 95 }

];

export const chapter = {
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

export const getReadingPlanForDate = (date) => {
    // 주어진 날짜에 해당하는 읽기 계획을 찾습니다.
    const plan = BibleReadingsData.find(plan => plan.date === date);

    // 찾은 계획이 있다면, 해당 계획을 리턴합니다.
    if (plan) {
        // 여러 readings가 있는 경우와 단일 reading인 경우를 모두 처리
        if (plan.readings && Array.isArray(plan.readings)) {
        // 여러 readings가 있는 경우
        return plan.readings;
        } else {
        // 단일 reading인 경우
        return [plan]; // 일관된 배열 형태로 리턴
        }
    } else {
        // 해당 날짜에 대한 계획이 없는 경우
        return [];
    }
}
