//JS 엔진은 단 하나의 실행 컨텍스트 스택을 가짐.
//JS 엔진은 싱글 스레드 방식이므로 처리에 시간이 걸리는 경우 블로킹(작업중단)이 발생
//브라우저는 멀티 스레드 방식이어서 비동기처리가 가능해짐
function sleep(func, delay) {
  const delayUntil = Date.now() + delay;
  
  while(Date.now() < delayUntil);
  
  func();
}

function foo() {
  console.log('foo...');
}

function bar() {
  console.log('bar...');
}

//sleep 함수는 3초 이상 실행
sleep(foo, 3 * 1000);

//bar는 sleep 이후에 호출
bar();

console.log("----------------------------------");

//setTimeout을 이용한 비동기처리 예제
//이경우에는 bar2를 블로킹하지 않고 foo2만 3초후에 처리
//이를 비동기처리라고 한다
function foo2() {
  console.log('foo2');
}
function bar2() {
  console.log('bar2');
}

setTimeout(foo2, 3 * 1000);
bar2();
//이 경우에는 블로킹이 발생하지 않는다는 장점이 있지만
//테스크의 실행 순서가 보장되지 않는다는 단점이 있다.