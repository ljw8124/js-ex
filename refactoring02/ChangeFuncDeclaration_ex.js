// 함수 선언 바꾸기
// 함수의 이름이 좋으면 구현 코드를 살펴 볼 필요없이 무슨일을 하는지 알 수 있다.
// 함수의 매개변수도 마찬가지이다.

// 간단한 절차
// 1. 매개변수를 제거하려거든 먼저 함수 본문에서 제거 대상 매개변수를 참조하는 곳은 없는지 확인한다.
// 2. 메서드 선언을 원하는 형태로 바꾼다.
// 3. 기존 메서드 선언을 참조하는 부분을 모두 찾아서 바뀐 형태로 수정한다.
// 4. 테스트한다.

// 마이그레이션 절차
// 1. 이어지는 추출 단계를 수월하게 만들어야 한다면 함수의 본문을 적절히 리팩터링한다.
// 2. 함수 본문을 새로운 함수로 추출한다.
// 3. 추출한 함수에 매개변수를 추가해야 한다면 '간단한 절차'를 다라 추가한다.
// 4. 테스트한다
// 5. 기존 함수를 인라인한다
// 6. 이름을 임시로 붙여뒀다면 함수 선언 바꾸기를 한번 더 적용해서 원래 이름으로 되돌린다.
// 7. 테스트한다.

// 공개된 API를 리팩터링할 때는 새 함수를 추가한 다음 리팩터링을 잠시 멈출 수 있다.

// 간단한 절차
// 함수의 이름을 이해하기 쉽게 변경
// function circum(radius) {
function circumference(radius) {
  return 2 * Math.PI * radius;
}

//마이그레이션 절차
function circum(radius) {
  return 2 * Math.PI * radius
}

// 이번에는 위 함수에서 함수 본문 전체를 새로운 함수로 추출한다

function circum(radius) {
  return circumference(radius);
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// 매개변수 추가하기
class Book {
  constructor() {
    this._reservations = null;
    
  }
  // addReservation(customer) {
  //   this._reservations.push(customer);
  // }
  // 위 메서드의 내용을 따로 추출하여 저장
  
  addReservation(customer) {
    this.zz_addReservation(customer, false);
  }
  
  zz_addReservation(aCustomer, isPriority) {
    assert(isPriority === true || isPriority === false);
    this._reservations.push(aCustomer, );
  }
  
}
