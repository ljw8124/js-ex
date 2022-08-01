//생성자 함수에서 메서드를 프로토타입에 추가하여 공유
//이렇게 하면 인스턴스 생성할 때 마다 추가되지 않고 상속받는 개념
function Circle(radius) {
  this.radius = radius;
}

//일일이 인스턴스화 하지 Circle 함수 프로토타입에 바인딩
Circle.prototype.getArea = function() {
  return Math.PI * this.radius ** 2;  //**은 거듭제곱
}

//인스턴스 생성
const circle1 = new Circle(1);
const circle2 = new Circle(2);

//circle1과 circle2는 같이 getArea를 상속 받음
console.log(circle1.getArea === circle2.getArea); //true

console.log(circle1.getArea());
console.log(circle2.getArea());

//생성자 함수로 생성된 인스턴스는 자신의 프로토타입, 상위 객체 역할의
//생성자 함수의 모든 프로퍼티와 메서드를 상속받는다.
//클래스기반의 자바와의 다른점