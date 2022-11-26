// 서브클래스 제거하기
// 소프트웨어 시스템의 성장에 따라서 서브클래스들이 다른 모듈로 이동하거나 완전히 사라지기도 한다.
// 더 이상 쓰이지 않는 서브클래스를 바로바로 제거해주는 것이 좋다.

// 절차
// 1. 서브클래스의 생성자를 팩터리 함수로 바꾼다.
// 2. 서브클래스의 타입을 검사하는 코드가 있다면 그 검사 코드에 '함수 추출하기'와 '함수 옮기기'를 차례로 적용하여 슈퍼클래스로 옮긴다. 그 때마다 테스트
// 3. 서브클래스의 타입을 나타내는 필드를 슈퍼클래스에 만든다.
// 4. 서브클래스를 참조하는 메서드가 방금 만든 타입 필드를 이용하도록 수정한다.
// 5. 서브클래스를 지운다.
// 6. 테스트한다.

// ex
class Person {
  get genderCode() { return "X"; }
}
class Male extends Person {
  get genderCode() { return "M"; }
}
class Female extends Person {
  get genderCode() { return "F"; }
}

// 위 서브클래스들이 별다른 할 일이 없고 다른 라인에서 메서드를 호출하지 않는다면, 부모클래스에 합치는 것이 좋다.

class PersonRefac {
  constructor(genderCode) {
    this._genderCode = genderCode;
  }
  get genderCode() { return this._genderCode; }
}