//객체리터럴 표현식
var person = {
  name: 'LeeJoungWoo',
  //여기서 함수는 함수라 부르지 않고 메서드라 부른다
  sayhello: function () {
    console.log(`hello my name is ${this.name}.`);
  }
}

//프로퍼티 접근법
//1 -> 이 경우에는 이름에 특수기호가 있는 경우에 사용
console.log("1. " + person['name']);
console.log("2. " + person["sayhello"]);        //이 경우는 함수만 호출되므르 f. 형식으로 호출

console.log('-------------------------------');

//2
console.log("3. " + person.name);
console.log("4. " + person.sayhello()); //호출만 되므로 4. ~ 와 같이 찍히지 않고 따로 sayHello가 호출됨

//모듈 패턴을 이용한 함수 만들기
var Counter = (function() {
  var num = 0;

  return {
    increase() {
      return ++num;
    },
    decrease() {
      return --num;
    }
  };
}());

//전역에서는 내부 변수가 접근 불가능하다.
console.log(Counter.num); //undefined
console.log(Counter.increase()); //1
console.log(Counter.decrease()); //-1

//생성자 함수를 이용한 호출
function Circle(radius) {
    this.radius = radius;
    this.getDiameter = function() {
        return 2 * this.radius;
    };
    //만약 생성자 함수에서 명시적으로 객체를 return 값으로 쓰는 경우 그 값이 리턴됨
    // return {}; //{}
    //하지만 원시값의 경우는 리턴되지 않음
    //return 100; //Circle { radius: 1, getDiameter: [Function (anonymous)]
  
  //생성자 함수에서 명시적으로 다른 값을 반환하는 것은 생성자 함수의 기본 동작을 훼손하는 것임
}

const circle = new Circle(1);
console.log(circle);
