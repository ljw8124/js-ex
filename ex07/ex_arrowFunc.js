//화살표 함수
//화살표 함수는 인스턴스를 생성할 수 없는 non-constructor 이다.
//인스턴스를 생성할 수 없으므로 prototype 프로퍼티가 없어서 프로토타입도 생성되지 않는다.
const foo =  () => {};  //화살표 함수에서 인자가 없어도 소괄호 생략불가능
foo.hasOwnProperty('prototype');   //false, prototype 이 없으므로 false

console.log('-----------------------------------this');

//콜백 함수 내부의 this 문제
class Prefixer {
  constructor(prefix) {
    this.prefix = prefix;
  }
  
  add(arr) {
    //add 메서드는 인수로 전달된 arr 배열을 순회하여 모든 요소에 prefix를 추가
    return arr.map(function(item) {
      return this.prefix + item;  // -> typeError
    });
  }
}

const prefixer = new Prefixer('-webkit-');
// console.log(prefixer.add(['transition', 'user-select']));

//위 예제에서 class 내부에서는 암묵적으로 use strict 가 적용된다.
//또한 콜백함수에서는 일반함수로 호출되므로 16 line에 this는 use strict의 영향으로 undefined가 된다

//이 문제를 해결하기 위해서는 add 내부에서 this를 따로 객체로 저장한 후
//콜백함수에서 그 객체를 매게로 호출하여야 한다
//ex) const thisObj = this;

//이 문제는 ES6에서 화살표 함수를 이용하여 해결할 수 있다
class Prefixer2{
  constructor(prefix) {
    this.prefix2 = prefix
  }
  add(arr) {
    return arr.map(item => this.prefix2 + item);
  }
}
const prefixer2 = new Prefixer2('-webkit-');
console.log(prefixer2.add(['transition', 'user-select']));

//화살표 함수는 함수 자체의 this 바인딩을 갖지 않는다.
//따라서 화살표함수에서 this 를 참조하면 상위 스코프에서 this 를 그대로 참조하게 된다.
//이를 lexical this 라고 한다

//만약 화살표 함수가 중첩되어 있다면 상위 화살표함수에도 this 바인딩이 없으므로
//스코프 체인상 가장 가까운 상위 함수 중에서 화살표함수가 아닌 함수의 this 를 참조한다

console.log('-----------------------------------super');
//또한 화살표함수에서는 super 바인딩을 갖지 않는다
//따라서 this 와 같이 super 도 사우이 스코프의 super 를 참조한다
class Base {
  constructor(name) {
    this.name = name
  }
  sayHi() {
    return `Hi ${this.name}`;
  }
}

class Derived extends Base {
  sayHi = () => `${super.sayHi()} How are you doing?`;
}

const derived = new Derived('Lee');
console.log(derived.sayHi());

console.log('---------------------------arguments');

//arguments 또한 화살표함수에서는 바인딩을 가지지 않는다
//그러므로 this, super 와 마찬가지고 상위 스코프에서 arguments 를 참조한다

//아래 함수는 즉시실행 함수로, 함수를 정의함과 동시에 바로 실행되는 함수
//익명 함수를 응용한 형태이고 한번 수행 후 재 호출할 수 없다
(function() {
  //화살표 함수 foo 의 arguments 는 상위 스코프인 즉시 실행 함수의 arguments 를 가르킨다
  const foo = () => console.log(arguments);
  foo(3, 4);
}(1, 2));

//temp 는 화살표 함수로 상위 스코프에서 arguments 를 찾는다
//하지만 temp 의 상위인 전역에는 arguments 가 없다
const temp = () => console.log(arguments);
temp(1, 2); //ReferenceError
