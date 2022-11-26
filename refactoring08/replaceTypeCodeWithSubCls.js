// 타입코드를 서브클래스로 바꾸기
// 시스템에서는 비슷한 대상드을 특정 특성에 따라 구분해야 할 때가 자주 있다.
// 그 예로 담당 업무대로 나눈다거나, 주문의 시급성을 기준으로 구분할 때도 있다.
// 이런 일을 다루기 위해서 타입코드라는 것을 이용하는데, 타입코드는 프로그래밍 언어 특성에 따라서 열거형이나 심볼, 문자열, 숫자 등으로 표현한다.
// 타입코드만으로도 불편한 상황은 없겠지만, 그 이상이 필요할 때 서브클래스를 이용한다.
// 서브클래스는 두 가지 측면에서 매력적인데, 첫 번째는 조건에 따라 다르게 동작하도록 해주는 다형성을 제공한다.(타입 코드에 따라 동작이 다른 함수를 표현할 때 좋음)
// 두 번째로는 특정 타입에서만 의미가 있는 값을 사용하는 필드나 메서드가 있을 때 유용하다.

// 절차
// 1. 타입 코드 필드를 자가 캡슐화한다.
// 2. 타입 코드 값 하나를 선택하여 그  값에 해당하는 서브클래스를 만든다. 타입 코드 게터 메서드를 오버라이드하여
//    해당 타입 코드의 리터럴 값을 반환하도록 한다.
// 3. 매개변수로 받은 타입 코드와 방금 만든 서브클래스를 매핑하는 선택 로직을 만든다.
// 4. 테스트한다.
// 5. 타입 코드 값 각각에 대해 서브클래스 생성과 선택 로직 추가를 반복한다. 클래스 하나가 완성될 때마다 테스트한다.
// 6. 타입 코드 필드를 제거한다.
// 7. 테스트한다.
// 8. 타입 코드 접근자를 이용하는 메서드 모두에 '메서드 내리기'와 '조건부 로직을 다형성으로 바꾸기'를 적용한다

// ex. 직접 상속 시
class Employee {
  constructor(name) {
    this._name = name;
  }
  // validateType(arg) {
  //   if(!["engineer", "manager", "salesperson"].includes(arg)) {
  //     throw new Error(`${arg}라는 직원 유형은 없습니다.`);
  //   }
  // }
  // 게터 삽입
  toString() { return `${this._name} (${this.type})`; }
}

// 그 후 서브클래스 생성
class Engineer extends Employee {
  // get type() { return "engineer"; }
}

class Salesperson extends Employee {
  // get type() { return "salesperson"; }
}

class Manager extends  Employee {
  // get type() { return "manager"; }
}

// 생성자를 팩터리 함수로 바꿔 선택로직을 담을 장소 마련
// 새로 만든 서브클래스를 이용하기 위한 선택 로직을 팩터리에 추가
function createEmployee(name, type) {
  switch(type) {
    case "engineer": return new Engineer(name);
    case "salesperson": return new Salesperson(name);
    case "manager": return new Manager(name);
    default: throw new Error(`${type}라는 직원 유형은 없습니다.`)
  }
  // return new Employee(name, type);
}

// ex. 간접 상속시
class Employee2 {
  constructor(name, type) {
    this.validateType(type);
    this._name = name;
    this._type = type;
  }
  validateType(arg) {
    if(!["engineer", "manager", "salesperson"].includes(arg)) {
      throw new Error(`${arg}라는 직원 유형은 없습니다.`);
    }
  }
  get typeString() { return this._type.toString(); }
  get type() { return this._type; }
  set type(arg) { this._type = arg; }

  get capitalizedType() {
    return this.typeString.charAt(0).toUpperCase()
        + this.typeString.slice(1).toLowerCase();
  }
  toString() {
    return `${this._name} (${this.capitalizedType})`;
  }
}

// 첫 번째로 할 일은 타입 코드를 객체로 바꾸기 이다.(기본형을 객체로 바꾸기)
class EmployeeType {
  constructor(aString) {
    this._value = aString;
  }
  toString() { return this._value; }
}

// 그 후 직접 상속과 같이 차분하게 리팩토링한다.
class EmployeeRefac {
  constructor() {
    // this.validateType(type);
    // this._name = name;
    // this._type = type;
  }
  // validateType(arg) {
  //   if(!["engineer", "manager", "salesperson"].includes(arg)) {
  //     throw new Error(`${arg}라는 직원 유형은 없습니다.`);
  //   }
  // }
  // get typeString() { return this._type.toString(); }
  // get type() { return this._type; }
  get name() { return this._name; }
  set type(arg) { this._type = EmployeeRefac.createEmployeeType(arg); }

  static createEmployeeType(aString) {
    switch(aString) {
      case "engineer": return new EngineerRefac();
      case "manager": return new ManagerRefac();
      case "salesperson": return new SalespersonRefac();
      default: throw new Error(`${aString}라는 직원 유형은 없습니다.`);
    }
  }
  toStirng() {
    return `${this._name} (${this.type.capitalizedType()})`
  }

  get capitalizedType() {
    return this.toString().charAt(0).toUpperCase()
        + this.toString().slice(1).toLowerCase();
  }
  toString() {
    return `${this._name} (${this.capitalizedType})`;
  }
}
class EngineerRefac extends EmployeeRefac {
  toString() { return "engineer"; }
}
class ManagerRefac extends EmployeeRefac {
  toString() { return "manager"; }
}
class SalespersonRefac extends EmployeeRefac {
  toString() { return "salesperson"; }
}

