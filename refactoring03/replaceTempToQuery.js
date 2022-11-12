// 임시 변수를 질의 함수로 바꾸기
// 함수 안에서 어떤 코드의 결괏값을 뒤에서 다시 참조할 목적으로 임시 변수로 쓰기도 한다.
// 임시 변수를 사용하면 값을 계산하는 코드가 반복되는 걸 줄이고, 값의 의미를 설명할 수 있어서 유용하다.
// 더 나아가서 함수로 작성하여 임시 변수의 값을 반환하는 것이 좋을 때가 많다.

let basePrice = this._quantity * this._itemPrice;

if(basePrice > 1000) basePrice * 0.95;
else basePrice * 0.98;

// 위 코드를 함수화 한다.
class temp {
  constructor(quantity, itemPrice) {
    this._quantity = quantity;
    this._itemPrice = itemPrice;
  }
  get basePrice() {
    this._quantity * this._itemPrice;
  }

}

// 긴 함수의 한 부분을 별도 함수로 추출하고자 할 때 먼저 변수들을 각각의 함수로 만들게되면,
// 추출한 함수를 따로 전달할 필요가 없어지고, 이 덕에 추출한 함수와 원래 함수의 경계가 명확해진다.

// 이번 챕터는 클래스안에서 적용할 때 효과가 가장 크다.
// 클래스는 추출할 메서드들에 공유 컨텍스트를 제공하기 때문이다.

// 절차
// 1. 변수가 사용되기 전에 값이 확실히 결정되는지, 변수를 사용할 때마다 계산 로직이 매번 다른 결과를 내지는 않는지 확인한다.
// 2. 읽기전용으로 만들 수 있는 변수는 읽기전용으로 만든다.
// 3. 테스트한다.
// 4. 변수 대입문을 함수로 추출한다.
// 5. 테스트한다.
// 6. 변수 인라인하기로 임시변수를 제거한다.

// ex
// class order {
//   constructor(quantity, item) {
//     this._quantity = quantity;
//     this._item = item;
//   }
//   get price() {
//     const basePrice = this.basePrice; // 이 함수 안에서 basePrice 를 읽기전용으로 사용하기 위해 get basePrice() 를 따로 작성
//     let discountFactor = 0.98;
//
//     if(basePrice > 1000) discountFactor -= 0.03;
//
//     return basePrice * discountFactor;
//   }
//   get basePrice() {
//     return this._quantity * this._item.price;
//   }
//
// }

// 이제 위 단계에서 변수 인라인 한 후 discountFactor 도 같은 순서로 처리한다.

class order {
  constructor(quantity, item) {
    this._quantity = quantity;
    this._item = item;
  }
  get price() {
    // const basePrice = this.basePrice;
    // let discountFactor = 0.98;
    //
    // if(this.basePrice > 1000) discountFactor -= 0.03;

    return this.basePrice * this.discountFactor;
  }
  get basePrice() {
    return this._quantity * this._item.price;
  }
  get discountFactor() {
    let discountFactor = 0.98;
    if(this.basePrice > 1000) discountFactor -= 0.03;
    return discountFactor;
  }

}