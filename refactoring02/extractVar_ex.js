// 변수 추출하기 (직관적 임시변수 사용)
// 표현식이 너무 복잡하여 이해하기 어려울 때, 지역 변수를 활용하면 표현식을 쪼개 관리하기 더 쉽게 만들 수 있다.
// 절차
// 1. 추출하려는 표현식에 부작용은 없는지 확인한다.
// 2. 볼변 변수를 하나 선언하고 이름을 붙일 표현식의 복제본을 대입한다.
// 3. 원본 표현식을 새로 만든 변수로 교체한다.
// 4. 테스트한다.
// 5. 표현식을 여러 곳에서 사용한다면 각각을 새로 만든 변수로 교체한다. 하나 교체할 때마다 테스트 한다.

function price(order) {
  // 가격(price) = 기본 가격 - 수량 할인 + 배송비
  return order.quantity * order.itemPrice -
      Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
      Math.min(order.quantity * order.itemPrice * 0.1, 100);
}

// 위 코드의 경우 곱하고 더하고 빼는 것들이 명확하지 않아서 헷갈릴 수 있다.
// 따라서 기본 가겨을 담을 변수를 만들고 적절한 이름을 지어준다.

function price(order) {
  const basePrice = order.quantity * order.itemPrice;
  return basePrice -
      Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
      Math.min(basePrice * 0.1, 100);
}

// 위와 같이 변수를 선언하고 초기화 한다고 해서 변하는 것은 없지만, 가독성면에서 훨씬 좋다

function price(order) {
  const basePrice = order.quantity * order.itemPrice;
  const quantityDiscount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
  return basePrice - quantityDiscount + Math.min(basePrice * 0.1, 100);
}

function price(order) {
  const basePrice = order.quantity * order.itemPrice;
  const quantityDiscount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
  const shipping = Math.min(basePrice * 0.1, 100);
  
  return basePrice - quantityDiscount + shipping;
}

////////////////////////////////////////////////////////////////////////////////////////////////
// 클래스 안에서 테스트
class Order {
  constructor(aRecord) {
    this._data = aRecord;
  }
  get quantity() { return this._data.quantity; }
  get itemPrice() { return this._data.itemPrice; }
  
  get price() {
    return this.quantity * this.itemPrice -
        Math.max(0, this.quantity - 500) * this.itemPrice * 0.05 +
        Math.min(this.quantity * this.itemPrice * 0.1, 100);
  }
}

// 클래스 전체에 영향을 줄 때는 변수가 아닌 메서드로 추출하는 편이 좋다.

class Order {
  constructor(aRecord) { this._data = aRecord; }
  
  get quantity() { return this._data.quantity; }
  get itemPrice() { return this._data.itemPrice; }
  
  get price() {
    return this.basePrice - this.quantityDiscount * this.shipping;
  }
  
  get basePrice() { return this.quantity * this.itemPrice; }
  get quantityDiscount() { return Math.max(0, this.quantity - 500) * this.itemPrice * 0.05; }
  get shipping() { return Math.min(this.basePrice * 0.1, 100); }
}

// 객체는 특정 로직과 데이터를 외부와 공유하려 할 때 공유할 정도를 설명해주는 적당한 문맥이 되어준다.
// 간단하지만, 별도 이름으로 추상화하면 객체를 다룰 때 더 쉽게 활용할 수 있다.