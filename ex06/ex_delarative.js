//명령형 프로그래밍과 선언적 프로그래밍 비교
//1. 명령형 프로그래밍
const string = "Restaurants in Seoul Korea";
let urlFriendly = "";

for(var i = 0; i < string.length; i++) {
  if(string[i] === " ") {
    urlFriendly += "-";
  } else {
    urlFriendly += string[i];
  }
}
console.log(urlFriendly);

console.log("------------------------------------");

//2.선언전 프로그래밍
const string2 = "Restaurants in Seoul Korea";

//정규식 표현으로 공백을 "-"으로 변경
const urlFriendly2 = string2.replace(/ /g, "-");

console.log(urlFriendly2);

//위 예제와 같이 선언적 프로그래밍은 가독성이 더 좋고 유지보수면에서도 직관적이어서
//추론하기 더 쉬운 프로그래밍이 가능하다

//순수함수의 개념
//순수 함수란 외부 객체에게 영향을 받지 않는 함수를 말한다.
function fn1(a, b) {
  return a + b;
}
fn1(1, 2);  //fn1은 순수함수라고 할 수 있다.

//리액트에서는 UI를 순수함수로 표현한다.
//순수함수의 표현은 애플리케이션 상태에 영향을 미치지 않기 때문에 코딩이 편해진다.
//순수함수의 규칙
//1. 순수 함수는 파라미터를 최소 하나 이상 받아야 한다.
//2. 순수 함수는 값이나 다른 함수를 반환해야 한다.
//3. 순수 함수는 인자나 함수 밖에 있는 다른 변수를 변경하거나, 입추력을 수행해서는 안된다.