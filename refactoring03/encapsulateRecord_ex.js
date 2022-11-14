// 캡슐화
// 대표적인 형태로는 '레코트 캡슐화하기', '컬렉션 캡슐화하기', '기본형을 객체'로 바꾸기가 있다.
// 클래스 또는 함수를 캡슐화하여 숨기는 것은 유용하지만, 너무 많이 숨기다보면 인터페이스가 비대해질 수 있으니
// 반대 기법인 '중개자 제거하기'를 적절하게 사용하여야 한다.

// record 는 field(파일구조에서 파일을 구성하는 요소 중 가장 작은 단위) 들의 집합이다

// 레코트 캡슐화하기
organtiztion = {name: "애크미 구스베리", country: "GB"};

// 위 객체값을 클래스로 따로 캡슐화한다.
class Organization {
  constructor(data) {
    this._name = data.name;
    this._country = data.country;
  }
  get name() { return this._name; }
  set name(aString) { this._name = aString; }
  get country() { return this._country; }
  set country(aCountry) { this._country = aCountry; }
}

// record 는 두 가지로 구분할 수 있다.
// 하나는 필드 일므을 노출하는 형태고, 다른 하나는 내가 원하는 일므을 쓸 수 있는 형태이다.

// 절차
// 1. 레코드를 담은 변수를 캡슐화 한다. -> 이 때 이름은 검색하기 쉬운 이름으로 한다.
// 2. 레코드를 감싼 단순한 클래스로 해당 변수의 내용을 교체한다. 반환하는 접근자도 정의하고, 캡슐화 함수는 이 접근자를 사용하도록 한다.
// 3. 테스트한다.
// 4. 원본 레코드 대신 새로 정의한 클래스 타입의 객체를 반환하는 함수들을 만든다.
// 5. 레코드 반환 함수를 예전 함수 대신 4에서 작성한 새 함수를 사용하도록 수정한다. 필드에 접근할 때는 객체의 접근자를 이용하고, 접근자가 없다면 추가한다.
// 6. 클래스에서 원본 데이터를 반환하는 접근자와 원본 레코드를 반환하는 함수들을 제거한다.
// 7. 테스트한다.
// 8. 레코드의 필드도 중첩구조라면, 캡슐화 하기를 적절하게 사용한다.

// 캡슐화에서는 값을 수정하는 부분을 명확하게 드러내고 한 곳에 모아두는 일이 중요하다.

// 읽기 처리
// 세터와 같이 일근ㄴ 코드를 모두 독립 함수로 추출하여 고객 데이터 클래스로 옮기는 방법이 있다.
// 다른 방법으로는 클라이언트가 데이터 구조를 요청할 때 실제 데이터를 제공하는 곳이다.
// 실제 데이터를 처리하는 경우 값의 변경으로 위험해 질 수도 있으므로 내부 데이터를 복제해서 제공하는 방법이 있다.

// 2번 째 방법은 간단하지만 데이터 구조가 클수록 복사 비용이 커져서 성능이 느려질 수 있다.

// 위 두가지 방법 둘다 레코드 캡슐화를 재귀적으로 제공함으로서 할일은 늘어나지만 확실하게 제어할 수 있다.