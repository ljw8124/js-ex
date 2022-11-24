// 생성자를 팩터리 함수로 바꾸기
// 많은 객체 지향 언어에서 제공하는 생성자는 객체를 초기화하는 특별한 용도의 함수다
// 실제로 새로운 객체를 생성할 때면 주로 생성자를 호출한다.
// 생성자를 호출하려면 특별한 연산자(new)를 사용해야 해서 일반 함수가 오길 바라는 자리에는 사용할 수가 없다.
// 하지만 팩터리 함수에는 이런 제약이 없다.

// 절차
// 1. 팩터리 함수를 만든다. 팩터리 함수의 본문에서는 원래의 생성자를 호출한다.
// 2. 생성자를 호출하던 코드를 팩터리 함수 호출로 바꾼다.
// 3. 하나씩 수정할 때마다 테스트한다.
// 4. 생성자의 가시 범위가 최소가 되도록 제한한다.

// ex
class Employee {
  constructor(name, typeCode) {
    this._name = name;
    this._typeCode = typeCode;
  }
  get name() { return this._name; }
  get type() { return Employee.legalTypeCodes[this._typeCode]; }
  static get legalTypeCodes() {
    return {"E": "Engineer", "M": "Manager", "S": "Salesperson"};
  }
}

let candidate = new Employee(document.name, document.empType);

let leadEngineer = new Employee(document.leadEngineer, 'E');

// 그 후 팩터리 함수 생성
function createEmployee(name, typeCode) {
  return new Employee(name, typeCode);
}

// 그 후 생성자를 호출하는 것이 아니라 팩터리 함수를 호출하도록 수정한다.
candidate = createEmployee(document.name, document.empType);
leadEngineer = createEmployee(document.leadEngineer, 'E');