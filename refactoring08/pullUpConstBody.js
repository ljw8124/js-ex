// 생성자 본문 올리기
// 생성자는 다루기 까다롭다. 생성자는 할 수 있는 일과 호출 순서에 제약이 있기 때문에 조금 다르게 접근해야 한다.
// if. 리팩터링이 간단히 끝나지 않는다면 '생성자를 팩터리 함수로 바꾸기'를 고려해보는 것도 방법이다.

// 절차
// 1. 슈퍼클래스에 생성자가 없다면 하나 정의한다. 서브클래스의 생성자들에서 이 생성자가 호출되는지 확인한다.
// 2. '문장 슬라이드하기'로 공통 문장 모두를 super() 호출 직후로 옮긴다.
// 3. 공통 코드를 슈퍼클래스에 추가하고 서브클래스들에서는 제거한다. 생성자 매개변수 중 공통 코드에서 참조하는 값들을 모두 super()로 건넨다.
// 4. 테스트한다.
// 5. 생성자 시작 부분으로 옮길 수 없는 공통 코드에는 '함수 추출하기'와 '메서드 올리기'를 차례로 적용한다.

// ex.
// 상속받은 코드에서 공통으로 사용하는 필드인 _name 을 부모 클래스로 옮긴다.
// 테스트 후 통과하면 리팩토링 종료.
class Party {
  constructor(name) {
    this._name = name;
  }
}

class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super(name);
    // this._name = name;
    this._id = id;
    this._monthlyCost = monthlyCost;
  }
  // 생략
}

class Department extends Party {
  constructor(name, staff) {
    super(name);
    // this._name = name;
    this._staff = staff;
  }
  // 생략
}
