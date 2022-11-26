// 슈퍼클래스 추출하기
// 비슷한 일을 수행하는 두 클래스가 있다면 상속 메커니즘을 이용하여 슈퍼클래스로 옮겨 담을 수 있다.

// 절차
// 1. 빈 슈퍼클래스를 만든다. 원래의 클래스들이 새 클래스를 상속하도록 한다.
// 2. 테스트한다.
// 3. '생성자 본문 올리기', '메서드 올리기', '필드 올리기'를 차례로 적용하여 공통 원소르 슈퍼클래스로 옮긴다.
// 4. 서브클래스에 남은 메서드들을 검토한다. 공통되는 부분이 있다면 함수로 추출한 다음 '메서드 올리기'를 적용한다.
// 5. 원래 클래스들을 사용하는 코드를 검토하여 슈퍼클래스의 인터페이스를 사용하게 할지 고민해본다.

// class Employee {
//   constructor(name, id, monthlyCost) {
//     this._name = name;
//     this._id = id;
//     this._monthlyCost = monthlyCost;
//   }
//   get monthlyCost() { return this._monthlyCost; }
//   get name() { return this._name; }
//   get id() { return this._id; }
//
//   get annualCost() { return this.monthlyCost * 12; }
// }
//
// class Department {
//   constructor(name, staff) {
//     this._name = name;
//     this._staff = staff;
//   }
//   get staff() { return this._staff; }
//   get name() { return this._name; }
//
//   get totalMonthlyCost() {
//     return this.staff
//         .map(e => e.monthlyCost)
//         .reduce((sum, cost) => sum + cost);
//   }
//   get headCount() { return this.staff.length; }
//   get totalAnnualCost() { return this.totalMonthlyCost * 12; }
// }

// 두 클래스로부터 슈퍼클래스를 추출하면 이 공통 동작들을 더 명확하게 나타낼 수 있다.
class Party {
  constructor(name) {
    this._name = name;
  }
  get name() { return this._name; }
  get annualCost() { return this.monthlyCost * 12; }
}

class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super(name);
    // this._name = name;
    this._id = id;
    this._monthlyCost = monthlyCost;
  }
  get monthlyCost() { return this._monthlyCost; }
  // get name() { return this._name; }
  get id() { return this._id; }

  // get annualCost() { return this.monthlyCost * 12; }
}

class Department extends Party {
  constructor(name, staff) {
    super(name);
    // this._name = name;
    this._staff = staff;
  }
  get staff() { return this._staff; }
  // get name() { return this._name; }

  get monthlyCost() {
    return this.staff
    .map(e => e.monthlyCost)
    .reduce((sum, cost) => sum + cost);
  }
  get headCount() { return this.staff.length; }
  // get totalAnnualCost() { return this.totalMonthlyCost * 12; }
}
