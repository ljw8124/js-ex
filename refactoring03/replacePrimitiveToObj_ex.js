// 기본형을 객체로 바꾸기

// 절차
// 1. 아직 변수를 캡슐화하지 않았다면 캡슐화한다.
// 2. 단순한 값 클래스를 만든 후, 생성자는 기존 값을 인수로 받아 저장하고, 이 값을 반환하는 게터를 만든다.
// 3. 정적 검사를 수행한다.
// 4. 인스턴스를 새로 만들어 필드에 저장하도록 세터를 수정한다. 이미 있다면 필드 타입을 적절히 변경한다.
// 5. 새로 만든 클래스의 게터를 호출한 결과를 반환하도록 게터를 수정한다.
// 6. 테스트한다.
// 7. 함수 일므을 바꾸면 원본 접근자의 동작을 더 잘드러낼 수 있도록 수정한다.

class Order {
  constructor(data) {
    this._priority = data.priority;
  }
  getPriority() { return this._priority; }
  get priorityString() { return this._priority.toString(); }
  set priority(aString) { this._priority = new Priority(aString); }
}

class Priority {
  constructor(value) {
    if(value instanceof Priority) return value;
    if(Priority.legalValue().includes(value)) this._value = value;
    else throw new Error(`<${value}>는 유효하지 않은 우선순위 입니다.`);
  }
  toString() { return this._value; }
  get _index() { return Priority.legalValues().findIndex(s => s === this.value); }
  static legalValues() { return ['low', 'normal', 'high', 'rush']; }  // static 이라는 말 그대로 정적 메서드를 의미함
  equals(other) { return this._index === other._index; }
  higherThan(other) { return this._index > other._index; }
  lowerThan(other) { return this._index < other._index; }
}

// Priority 에 메서드르 추가하여 클아이언트 코드에서 더 사용하기 쉽게 작성할 수 있게됨