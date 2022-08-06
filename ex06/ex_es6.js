//ES6 모듈
//모듈은 다른 JS에서 이름 충돌없이 쉽게 불러서 재사용할 수 있는 코드조각이다

//커먼JS
//커먼JS는 모든 버전의 노드에서 지원하는 일반적인 모듈패턴을 말한다

//함수형 프로그래밍
//일반적으로 사용하는 함수표현식
var log = function(message) {
  console.log(message);
}
log("자바스크립트에서는 함수를 변수에 넣을 수 있습니다.");

console.log("--------------------------------------");

//화살표함수를 이용한 함수 정의
const log2 = message => console.log(message);
log2("화살표함수를 이용하여 변수를 넣을 수도 있습니다.");

console.log("--------------------------------------");

//함수를 객체에 넣기
const obj = {
  message: "함수를 객체에 넣을 수도 있습니다.",
  log3(message) {
    console.log(message);
  }
}
obj.log3(obj.message);

console.log("--------------------------------------");

//함수를 다른 값과 마찬가지로 객체에 추가할 수도 있음
//심지어 배열에 넣을 수도 있다.
const messages = [
    "함수를 배열에 넣을 수 있습니다.",
    message => console.log(message),
    "일반적인 값과 마찬가지 입니다.",
    message => console.log(message),
]
messages[1](messages[0]);
messages[3](messages[2]);

console.log("--------------------------------------");

//함수를 다른 함수에 인자로 넣을 수도 있다.
const insideFn = logger => {
  logger("함수를 다른 함수에 인자로 넣을 수 있습니다.");
}
insideFn(message => console.log(message));

console.log("--------------------------------------");

//함수가 함수를 리턴할 수도 있다.
// const createScream = function(logger) {
//   return function(message) {
//     logger(message.toUpperCase() + "!!!");
//   };
// };

//위 함수를 고차함수로 표현하기
//화살표함수는 자동으로 return 하므로 return을 명시할 필요가 없음
const createScream = logger => message => {
  logger(message.toUpperCase() + "!!!!");
}

const scream = createScream(message => console.log(message));

scream('함수가 함수를 반환 할 수 있습니다.');
scream('createScream은 함수를 반환합니다.');
scream('scream은 createScream이 반환한 함수를 가리킵니다.');