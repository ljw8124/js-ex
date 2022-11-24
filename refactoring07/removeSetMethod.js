// 세터 제거하기
// 세터가 존재한다는 것은 필드가 수정될 수 있다는 것을 말한다.
// 불변을 원한다면 세터를 넣지 않는 것이 정상이다.
// 세터 제거하기의 목표는 첫 번째로는 무조건 접근자 메서드를 통해서만 필드를 다루려 할 때 이다.
// 두 번째는 클라이언트에서 생성 스크립트를 사용해 객체를 생성할 때 이다.

// 절차
// 1. 설정해야 할 값을 생성자에서 받지 않는다면 그 값을 받을 매개변수를 생성자에 추가한다(함수 선언 바꾸기)
//    그런 다음 생성자 안에서 적절한 세터를 호출한다.
// 2. 생성자 밖에서 세터를 호출하는 곳을 찾아 제거하고, 대신 새로운 생성자를 사용하도록 한다. 하나 수정할떄마다 테스트한다.
// 3. 세터 메서드를 인라인한다. 가능하다면 해당 필드를 불변으로 만든다.
// 4. 테스트 한다.

// ex.
// class Person {
//   constructor() {
//   }
//   get name() { return this._name; }
//   set name(arg) { this._name = arg; }
//   get id() { return this._id; }
//   set id(arg) { this._id = arg; }
// }

const martin = new Person();
martin.name = "마틴";
martin.id = "1234";

// 사람의 속성중 이름은 객체가 생성된 후라도 변경 될 수 있겠지만, id는 그래서는 안된다.
// 이 의도를 명확하게 하기 위해서 id 세터를 삭제해보자
class Person {
  constructor(id) {
    this._id = id;
  }
  get name() { return this._name; }
  set name(arg) { this._name = arg; }
  get id() { return this._id; }
  // set id(arg) { this._id = arg; }
}

const dummy = new Person("1234"); // 객체 생성시 id 를 불변으로 넘김
dummy.name = "마틴";