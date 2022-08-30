// 정규표현식 예제
const tel = '010-1234-567팔';
const tel2 = '010-1234-5678';

// 정규표현식으로 휴대폰 전화번호 패턴을 정함
// ^와 $는 각각 줄의 시작과 끝에 대응함
const regExp = /^\d{3}-\d{4}-\d{4}$/;

// \d가 숫자를 찾으므로 tel은 false
console.log(regExp.test(tel));
console.log(regExp.test(tel2));

// 정규표현식의 사용은 쓸데없는 반복문과 조건문을 줄이지만
// 주석이나 공백을 허용하지 않기 때문에 가독성이 좋지 않다는 문제가 있다.