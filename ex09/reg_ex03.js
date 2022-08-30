// 단어 레벨로 검색하기
// 분해되지 않은 단어 레벨로 검색하기 위해서는 + 사용
const target = 'A AA B BB Aa Bb';

// A 또는 B가 한 번 이상 반복되는 무자열을 전역 검색함
const regExp = /A+|B+/g;
// 간단히 표현하기
// const regExp = /[AB]+/g;

console.log(target.match(regExp));

const target2 = 'A AA BB ZZ Aa Bb';

const regExp2 = /[A-Z]+/g;

console.log(target2.match(regExp2));

// \w과 \W 검색
const target3 = 'Aa Bb 12,345 _$%&';

// 알파벳, 숫자, 언더스코어, ','가 한 번 이상 반복되는 문자열을 전역 검색
const regExp3 = /[\w,]+/g;

console.log(target3.match(regExp3));

// NOT 검색
// [...] 내의 ^는 not(!)의 의미를 갖는다
// ex) [^0-9]는 숫자를 제외한 문자열을 의미함
const target4 = 'Aa Bb 12 Cc Dd';

const regExp4 = /[^0-9]+/g;

console.log(target4.match(regExp4));

//시작위치로 탐색
// [...] 밖의 ^은 문자열의 시작을 의미한다. 단, [...] 내의 ^은 not을 의미함으로 주의!