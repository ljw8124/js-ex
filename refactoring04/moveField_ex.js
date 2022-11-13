// 필드 옮기기
// 프로그램의 진짜 힘은 데이터 구조에 있다.
// 주어진 문제에 적합한 데이터 구조를 활용하면 자연스럽게 직관적으로 만들어진다.
// 반면 잘못된 데이터 구조는 코드를 데이터 구조 활용만을 위한 코드로 범벅이 된다.
// 즉, 경험과 도메인 주도 설계 같은 기술이 중요하다고 할 수 있다.
// 클래스는 함수가 곁들여진 레코드라 할수 있고, 데이터와 마찬가지로 건강하게 유지되어야 한다.

// 절차
// 1. 소스 필드가 캡슐화되어 있지 않다면 캡슐화한다.
// 2. 테스트한다.
// 3. 타깃 객체와 필드(와 접근자 메서드들)를 생성한다.
// 4. 정적 검사를 수행한다.
// 5. 소스 객체에서 타깃 객체를 참조할 수 있는지 확인한다.
// 6. 접근자들이 타깃 필드를 사용하도록 수정한다.
// 7. 테스트한다.
// 8. 소스 필드를 제거한다.
// 9. 테스트한다.

class Customer {
  constructor(name, discountRate) {
    this._name = name;
    this._setDiscountRate(discountRate);
    this._contract = new CustomerContract(dateToday());
  }
  get discountRate() { return this._contract.discountRate; }
  becomePreferred() {
    this._setDiscountRate(this._contract.discountRate + 0.03) ;
    // 다른 일들..
  }
  _setDiscountRate(aNumber) { this._contract.discountRate = aNumber; }
  applyDiscount(amount) {
    return amount.subtract(amount.multiply(this.discountRate));
  }
}

class CustomerContract {
  constructor(startDate, discountRate) {
    this._startDate = startDate;
    this._discountRate = discountRate;
  }
  get discountRate() { return this._discountRate; }
  set discountRate(arg) { this._discountRate = arg; }
}

// 날 레코드로 변경하기
// 가장 먼저 레코드를 캡슐화하여 클래스로 바꾸고, 필드 옮기기를 하면 리팩터링이 더 수월해진다.

// ex. 공유 객체로 이동하기
class Account {
  constructor(number, type) {
    this._number = number;
    this._type = type;
    // assert(interestRate === this._type._interestRate);  // 어시션을 추가하여 에러 점검하기
  }
  get interestRate() { return this._type.interestRate; }
}

class AccountType {
  constructor(nameString, interestRate) {
    this._name = nameString;
    this._interestRate = interestRate;
  }
  get interestRate() { return this._interestRate; }
}