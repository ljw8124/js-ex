// 값을 참조로 바꾸기
// 하나의 데이터 구조안에 논리적으로 똑같은 제 3의 데이터 구조를 참조하는 레코드가 여러개 있을 때가 있다.
// 논리적으로 같은 데이터를 물리적으로 복제해 사용할 때 가장 크게 문제되는 상황은 그 데이터를 갱신해야 할 때이다.
// 하나라도 놓치면 데이터 일관성이 깨져버리기 때문에 이런 상황에서는 복제된 데이터들을 모두 참조로 바꾸는 것이 좋다.
// 값을 참조로 변경하면 엔티티 하나당 객체도 단 하나만 존재하게 되므로, 객체들을 하나에 모아놓고 접근을 관리해주는 저장소가 필요하다.
// 따라서 객체들은 저장소에서 얻어 쓰는 방식이 되는 것이다.

// 절차
// 1. 같은 부류에 속하는 객체들을 보관할 저장소를 만든다.
// 2. 생성자에서 이 부류의 객체들 중 특정 객체를 정확히 찾아내는 방법이 있는지 확인한다.
// 3. 호스트 객체의 생성자들을 수정하여 필요한 객체를 이 저장소에서 찾도록한다. 하나 수정할 때마다 테스트한다.

// ex
// class Order {
//   constructor(data) {
//     this._number = data.number;
//     this._customer = new Customer(data.customer)  // data.customer은 ID
//     // 기타 다른 데이터
//   }
//   get customer() { return this._customer; }
// }

class Customer {
  constructor(id) {
    this._id = id;
  }
  get id() { return this._id; }
}

// 객체들 접근을 위한 저장소를 생성한다.
let _repositoryData;

export function initialize() {
  _repositoryData = [];
  _repositoryData.customers = new Map();
}

export function registerCumstomer(id) {
  if(!_repositoryData.customers.has(id)) {
    _repositoryData.customers.set(id, new Customer(id));
    return findCustomer(id);
  }
}

export function findCustomer(id) {
  return _repositoryData.customers.get(id);
}

// 이후 Order 에서 저장소를 이용하도록 수정
class Order {
  constructor(data) {
    this._number = data.number;
    this._customer = registerCumstomer(data.customer)  // data.customer은 ID
    // 기타 다른 데이터
  }
  get customer() { return this._customer; }
}
