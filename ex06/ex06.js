//비동치 자바스크립트
//단순한 프라미스와 fetch
// console.log(fetch("https://api.randomuser.me/?nat=US&results=1")); //이런식의 코드는 then을 기다림

//then은 프라미스가 정상적으로완료되면 콜백 함수를 한번만 호출
fetch("https://api.randomuser.me/?nat=US&results=1").then(res =>
    console.log(res.json()) //promise 반환
) //이곳에 또 then 을 이용하여 다음 호출할 것을 작성할 수 있다.

console.log("-------------------------------------------");

//async/await을 이용한 비동기 프라미스 작성
//try...catch를 이용한 예외처리
const getFakePerson = async () => {
  try {
    let res = await fetch('https://api.randomuser.me/?nat=US&results=1');
    let {results} = res.json();
    console.log(results);
  } catch (error) {
    console.error(error);
  }
}
getFakePerson();