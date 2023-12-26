const API_URL = 'https://yesu.io/bible'

const doc = {
    창세기 : 'ge', 
    출애굽기 : 'exo', 
    레위기 : 'lev', 
    민수기 : 'num', 
    신명기 : 'deu', 
    여호수아 : 'josh', 
    사사기 : 'jdgs', 
    룻기 : 'ruth', 
    사무엘상 : '1sm', 
    사무엘하 : '2sm', 
    열왕기상 : '1ki', 
    열왕기하 : '2ki', 
    역대상 : '1chr', 
    역대하 : '2chr', 
    에스라 : 'ezra', 
    느헤미야 : 'neh', 
    에스더 : 'est', 
    욥기 : 'job', 
    시편 : 'psa', 
    잠언 : 'prv', 
    전도서 : 'eccl', 
    아가 : 'ssol', 
    이사야 : 'isa', 
    예레미야 : 'jer', 
    예레미야애가 : 'lam', 
    에스겔 : 'eze', 
    다니엘 : 'dan', 
    호세아 : 'hos', 
    요엘 : 'joel', 
    아모스 : 'amos', 
    오바댜 : 'obad', 
    요나 : 'jonah', 
    미가 : 'mic', 
    나훔 : 'nahum', 
    하박국 : 'hab', 
    스바냐 : 'zep', 
    학개 : 'hag', 
    스가랴 : 'zec', 
    말라기 : 'mal', 
    마태복음 : 'mat', 
    마가복음 : 'mark', 
    누가복음 : 'luke', 
    요한복음 : 'john', 
    사도행전 : 'acts', 
    로마서 : 'rom', 
    고린도전서 : '1cor', 
    고린도후서 : '2cor', 
    갈라디아서 : 'gal', 
    에베소서 : 'eph', 
    빌립보서 : 'phi', 
    골로새서 : 'col', 
    데살로니가전서 : '1th', 
    데살로니가후서 : '2th', 
    디모데전서 : '1tim', 
    디모데후서 : '2tim', 
    디도서 : 'titus', 
    빌레몬서 : 'phmn', 
    히브리서 : 'heb', 
    야고보서 : 'jas', 
    베드로전서 : '1pet', 
    베드로후서 : '2pet', 
    요한1서 : '1jn', 
    요한2서 : '2jn', 
    요한3서 : '3jn', 
    유다서 : 'jude', 
    요한계시록 : 'rev'
}

const todayOrder = (month, day) => {

    const table = {
        '12_11' : {
            lang : 'kor',
            doc : doc['스바냐'],
            pos : '스바냐',
            start: '1:1' ,
            end: '3:20', // 끝가지 다읽기
            daycnt: 199

        },
        '12_12' : {
            lang : 'kor',
            doc : doc['학개'],
            pos : '학개',
            start: '1:1' ,
            end: '2:23', // 끝가지 다읽기
            daycnt: 200
        },
        '12_13' : {
            lang : 'kor',
            doc : doc['스가랴'],
            pos : '스가랴',
            start: '1:1' ,
            end: '8:23', // 끝가지 다읽기
            daycnt: 201
        },
        '12_14' : {
            lang : 'kor',
            doc : doc['스가랴'],
            pos : '스가랴',
            start: '9:1' ,
            end: '14:21', // 끝가지 다읽기
            daycnt: 202

        },
        '12_15' : {
            lang : 'kor',
            doc : doc['말라기'],
            pos : '말라기',
            start: '1:1' ,
            end: '100:100', // 끝가지 다읽기
            daycnt: 203
        },
        '1_2': {
            lang : 'kor',
            doc : doc['마태복음'],
            pos : '마태복음',
            start: '1:1' ,
            end: '4:25', // 끝가지 다읽기
            daycnt: 2
        },
        '1_3': {
            lang : 'kor',
            doc : doc['마태복음'],
            pos : '마태복음',
            start: '5:1' ,
            end: '7:29', // 끝가지 다읽기
            daycnt: 3
        },
        '1_4': {
            lang : 'kor',
            doc : doc['마태복음'],
            pos : '마태복음',
            start: '8:1' ,
            end: '10:200', // 끝가지 다읽기
            daycnt: 4
        },
        '1_5': {
            lang : 'kor',
            doc : doc['마태복음'],
            pos : '마태복음',
            start: '11:1' ,
            end: '14:200', // 끝가지 다읽기
            daycnt: 5
        },
        '1_8': {
            lang : 'kor',
            doc : doc['마태복음'],
            pos : '마태복음',
            start: '15:1' ,
            end: '18:200', // 끝가지 다읽기
            daycnt: 6
        },

        'none' : {
            lang : 'kor',
            doc : 'none',
            pos : 'none',
            start: 'none' ,
            end: 'none', // 끝가지 다읽기
            daycnt: 'none'
        }
    }
    

    return table[`${month}_${day}`] || table['none'];

}