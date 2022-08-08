//JAVA와 다르게 JS는 this 사용시 바인딩이 동적으로 된다.
//즉, 함수가 호출되는 방식에 따라 this에 바인딩될 값이 달라짐
function Circle(radius) {
  this.radius = radius
}

//프로토타입을 이용한 메서드 추가
Circle.prototype.getDiameter = function() {
  return 2 * this.radius;
}

//인스턴스 생성
const circle1 = new Circle(5);  //this 는 생성되는 circle1을 가르킴
console.log(circle1.getDiameter());

//this 바인딩은 함수 호출 방식에 따라 동적으로 결정된다.
const foo = function() {
  console.dir(this);
}

//1. 일반 함수 호출
//foo 함수를 이용한 일반적인 방식으로 호출
//foo 함수 내부의 this 는 전역객체 window 를 가르킴
console.log('------------------func');
foo();

//2. 메서드 호출
//foo 함수를 프롵퍼티 값으로 할당하여 호출
//foo 함수 내부 this 는 객체 obj 를 가르킨다
console.log('------------------method');
const obj = { foo };
obj.foo();

//3. 생성자 함수 호출
//foo 함수를 인스턴스화 하여 호출
//foo 함수 내부의 this 는 생성된 인스턴스를 가르킴
console.log('-----------------constructor');
new foo();

//4. prototype을 이용한 apply/call/bind 메서드 간접호출
//foo 함수 내부의 this 는 인수에 의해 결정
console.log('-----------------prototype')
const bar = { name: 'bar' };

foo.call(bar);
foo.apply(bar);
foo.bind(bar);


console.log('--------------------window this');
//일반함수에서 this 는 window 를 가르킴
//메서드 내에서 중첩함수에서 this 또한 window 를 가르킨다

//var 로 선언한 전역변수는 전역객체의 프로퍼티가 된다
//const 로 선언한 전역변수는 전역객체의 프로퍼티가 아니다
var value = 1;

const obj2 = {
  value: 100,
  foo() {
    console.log("foo's this: " + this); //{value: 100, foo: f}
    console.log("foo's this.value: " + this.value); //100
  
    function temp() {
      console.log("temp's this: ", this); //window
      console.log("temp's this.value: ", this.value); //undefined
    }
    
    temp();
  }
  
}
obj2.foo();

//콜백함수가 일반함수로 호출된다면 콜백 함수 내부의 this 에도 전역객체가 바인딩된다
//즉 어떠한 함수라도 일반함수로 호출되면 this 에 전역객체가 바인딩된다

//생성자 함수 호출시에도 new 연산자로 호출되지 않으면 일반 함수로 호출되므로,
//this 는 전역객체를 가르키게 된다