const target = 'Is this all there is?';

// 패턴: is
// 플래그: i => 대소문자를 구별하지 않고 검색
const regExp = /is/i;

console.log(regExp.test(target));

// 생성자 함수를 이용하여 객체를 생성할 수도 있다.
// new RegExp(pattern[, flags]) 형식

const regExp2 = new RegExp(/is/i);  //ES6 형식
// const regExp2 = new RegExp('is', 'i');
// const regExp2 = new RegExp(/is/, 'i');
console.log(regExp2.test(target));

//------------------------------------------------------------

//global 플래그가 없으므로 하나만 찾아서 반환함
const regExp3 = /is/;
console.log(target.match(regExp3));

//global 플래그로 인해서 모든 값을 배열로 반환함
const regExp4 = /is/g;
console.log(target.match(regExp4));

// flag 종류
// i: ignore case => 대소문자 구별하지 않고 패턴 검색
// g: global => 대상 문자열 내에서 패턴과 일치하는 모든 문자열 전역 검사
// m: Multi line => 문자열의 행이 바뀌어도 계속 검색
// 중복해서도 사용가능함 ex) /ig

const regExp5 = /is/ig;
console.log(target.match(regExp5));

// 임의의 문자열 검색
// .은 임의의 문자 한 개를 의미함
const regExp6 = /.../g;
console.log(target.match(regExp6));