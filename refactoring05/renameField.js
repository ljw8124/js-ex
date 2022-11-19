// 필드 이름 바꾸기
// 레코드 구조체와 필드의 이름은 매우 중요하다고 할 수 있다.
// 게터와 세터 이름 바꾸기도 레코드 구조체의 필드 이름 바꾸기와 똑같이 중요하다고 할 수 있다.

// 절차
// 1. 레코드의 유효 범위가 제한적이라면 필드에 접근하는 모든 코드르 수정한 후 테스트한다. 이 후 단계는 필요없다.
// 2. 레코드가 캡슐화 되어 있지 않다면 우선 레코드를 캡슐화 하낟.
// 3. 캡슐화된 객체 안의 private 필드명을 변경하고, 그에 맞게 내부 메서드들을 수정한다.
// 4. 테스트한다.
// 5. 생성자의 매개변수 중 필드와 이름이 겹치는 게 있다면 함수 선언 바꾸기로 변경한다.
// 6. 접근자들의 이름도 바꿔준다

// ex
// const organization = {name: "애크미 구스베리", country: "GB"};

// 만약 위 객체 속성을 바꾸고 싶을 때, 코드베이스 곳곳에서 사용할 수가 있다. 그래서 organization 을 캡슐화할 필요가 있다.

class Organization {
  constructor(data) {
    this._name = data.name;
    this._country = data.country;
  }
  get name() { return this._name; }
  set name(aString) { this._name = aString; }
  get country() { return this._country; }
  set country(aCountryCode) { this._country = aCountryCode; }
}

const organization = new Organization({name: "애크미 구스베리", country: "GB"});

// 캡슐화를 하니, 세터함수, 게터함수, 생성자, 내부 데이터 구조 등 수정할 것이 많아 보이지만, 실제로는 더 일을 줄인 격이다.
// 모든 변경을 한번에 수행하는 대신 작은 단계들로 나눠 독립적으로 수행할 수 있게 되었기 때문이다.

// 리팩터링 도중에 실패한다면 더 작은 단계로 나눠야 한다는 신호이다.
// 데이터 구조를 불변으로 만들 수 있는 언어도 있는데, 이 때에는 캡슐화 대신 데이터 구조의 값을 복제하고 새로운 이름을 선언한다.