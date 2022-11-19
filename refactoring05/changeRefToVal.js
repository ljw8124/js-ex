// 참조를 값으로 바꾸기
// 필드를 값으로 다룬다면 내부 객체의 클래스를 수정하여 값 객체로 만들 수 있다.
// 값 객체는 불변이기 때문에 대체로 자유롭게 활용하기 좋다. 그렇기 때문에 일반적으로 불변 데이터 구조는 다루기가 더 쉽다.
// 불변데이터 값은 이리저리 전달해도 값이 변경될 여지가 없기 때문이다.
// 그렇기 때문에, 값 객체는 분산 시스템과 동시성 시스템에서 특히 유용하다.
// 한편 값 객체의 이러한 특성 때문에 오히려 리팩터링 하면 안되는 경우가 있다.
// 예컨대 특정 객체를 여러 객체에서 공유하고자 한다면, 공용 객체의 값을 변경했을 때 이를 관련 객체 모두에 알려주어야 한다.

// 절차
// 1. 후보 클래스가 불변인지, 혹은 불변이 될 수 있는지 점검한다.
// 2. 각각의 세터를 하나씩 제거한다.
// 3. 이 값 객체의 필드들을 사용하는 동치성 비교 메서드를 만든다.

// class Person {
//   constructor() {
//     this._telephoneNumber = new TelephoneNumber();
//   }
//   get officeAreaCode() { return this._telephoneNumber.areaCode; }
//   set officeAreaCode(arg) { this._telephoneNumber.areaCode = arg; }
//   get officeNumber() { return this._telephoneNumber.number; }
//   set officeNumber(arg) { this._telephoneNumber.number = arg; }
// }

// class TelephoneNumber {
//   constructor() {
//     this._areaCode = null;
//     this._number = null;
//   }
//   get areaCode() { return this._areaCode; }
//   set areaCode(arg) { this._areaCode = arg; }
//   get number() { return this._number; }
//   set number(arg) { this._number = arg; }
// }

// 제일 먼저 할 일은 전화번호 클래스의 값들을 불변으로 만들어 주는 것이다.
// 필드들의 세터들을 제거하고 생성자에서 입력받아 설정하게 하는 방법이 있다.(함수 선언 바꾸기)


class TelephoneNumber {
  constructor(areaCode, number) {
    this._areaCode = areaCode;
    this._number = number;
  }
  get areaCode() { return this._areaCode; }
  // set areaCode(arg) { this._areaCode = arg; }
  get number() { return this._number; }
  // set number(arg) { this._number = arg; }

  equal(other) {  // 동치성 평가 메서드
    if(!(other instanceof TelephoneNumber)) return false;
    return this.areaCode === other.areaCode && this.number === other.number;
  }
}

// 그 후 호출하는 쪽에서 전화번호를 매번 다시 대입하도록 변경한다.

class Person {
  constructor() {
    this._telephoneNumber = new TelephoneNumber();
  }
  get officeAreaCode() { return this._telephoneNumber.areaCode; }
  set officeAreaCode(arg) { this._telephoneNumber = new TelephoneNumber(arg, this.officeNumber); }
  get officeNumber() { return this._telephoneNumber.number; }
  set officeNumber(arg) { this._telephoneNumber = new TelephoneNumber(this.officeAreaCode, arg); }
}

// 위에서 전화번호가 불변이 되었으므로, 이제 진짜 '값'이 될 준비가 끝났다.
// 값 객체로 인정받기 위해서는 동치성을 값 기반으로 평가해야 한다. JS 에서는 아쉽게 지원하지 않는다.


