//Rest 파라미터는 매개변수 앞에 ... 을 붙여서 정의하는 매개변수이다
//Rest 파라미터는 전달된 인수를 배열로 전달받는다
function foo(...rest) {
  console.log(rest);
}

foo(1, 2, 3);

//순차적으로 할당하는 것도 가능하다
function foo2(param, ... rest) {
  console.log('param: ', param);  //값 그대로 반환
  console.log('rest: ', rest);  //배열로 반환
}
foo2(1, 2, 3, 4, 5);

function bar(param1, param2, ...rest) {
  console.log(param1);
  console.log(param2);
  console.log(rest);
}
bar(1, 2, 3, 4, 5)

//이 때 rest 는 마지막에 인자로 작성해야한다.
// function temp(...rest, param1, param2) {}
// temp(1, 2, 3, 4, 5);  //SyntaxError

//또한 rest 파라미터는 한 번만 사용가능
// function temp(...rest, ...rest) {}
// temp(1, 2, 3, 4, 5);  //SyntaxError

