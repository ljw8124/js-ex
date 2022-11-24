// 매개변수를 질의 함수로 바꾸기
// 피호출 함수가 스스로 '쉽게' 결정할 수 있는 값을 매개변수로 건네는 것도 일종의 중복이다.
// 해당 매개변수를 제거하면 값을 결정하는 책임 주체가 달라진다.
// 매개변수를 질의 함수로 바꾸면 안되는 경우도 있는데, 매개변수를 제거하면 피호출 함수에 원치 않는 의존성이 생길 때다.
// (새로운 의존성이 생기거나, 제거하고 싶은 기존 의존성을 강화하는 경우)

// 제거하려는 매개변수의 값을 다른 매개변수에 질의해서 얻을 수 있다면, 질의함수로 바꿀 수 있다.
// 한 가지 주의해야할 점은 대상 함수가 참조 투명해야 한다는 것이다.

// 절차
// 1. 필요하다면 대상 매개변수의 값을 계산하는 코드를 별도 함수로 추출해놓는다.
// 2. 함수 본문에서 대상 매개변수로의 참조를 모두 찾아서 그 매개변수의 값을 만들어주는 표현식을 참조하도록 바꾼다.
//    하나 수정할 때마다 테스트한다.
// 3. '함수 선언 바꾸기'로 대상 매개변수를 없앤다.

// ex

class Order {
  constructor(quantity, price) {
    this.quantity = quantity;
    this.itemPrice = price;
  }

  get finalPrice() {
    const basePrice = this.quantity * this.itemPrice;
    let discountLevel;
    if(this.quantity > 100) discountLevel = 2;
    else discountLevel = 1;
    return this.discountedPrice(basePrice, discountLevel);
  }

  discountedPrice(basePrice, discountLevel) {
    switch(discountLevel) {
      case 1: return basePrice * 0.95;
      case 2: return basePrice* 0.9;
    }
  }

}

// 위 클래스에서 임시 변수를 질의 함수로 바꾸기를 적용
class Order {
  constructor(quantity, price) {
    this.quantity = quantity;
    this.itemPrice = price;
  }

  get finalPrice() {
    const basePrice = this.quantity * this.itemPrice;
    return this.discountedPrice(basePrice);
  }
  get discountLevel() { return (this.quantity > 100) ? 2 : 1; }

  discountedPrice(basePrice) {
    switch(this.discountLevel) {
      case 1: return basePrice * 0.95;
      case 2: return basePrice* 0.9;
    }
  }

}