//고차함수
//커링이란 연산을 수행할 때 일부를 저장하고 나중에 나머지를 전달받는 방식을 말한다.

const userLogs = userName => message =>
    console.log(`${userName} -> ${message}`);

const log = userLogs("ljw8124");
log("attempted to load 20 fake members");

//여기서 userLogs 는 고차 함수이다.

//재귀함수
const countdown = (value, fn) => {
  fn(value);
  return(value > 0) ? countdown(value -1, fn) : value;
};

countdown(10, value => console.log(value));
//10번 호출되도록 재귀함수 작성