// 명령을 함수로 바꾸기
// 명령은 그저 함수를 하나 호출해 정해진 일을 수행하는 용도로 주로 쓰인다.
// 로직이 크게 복잡하지 않은 경우에는 명령보다는 함수로 사용하는 것이 더 낫다.

// 절차
// 1. 명령을 생성하는 코드와 명령의 실행 메서드를 호출하는 코드를 함께 함수로 호출한다.
// 2. 명령의 실행 함수가 호출하는 보조 메서드들 각각을 인라인한다.
// 3. '함수 선언 바꾸기'를 적용하여 생성자의 매개변수 모두를 명려으이 실행 메서드로 옮긴다.
// 4. 명령의 실행 메서드에서 참조하는 필드들 대신 대응하는 매개변수를 사용하게끔 바꾼다. 하나 수정 시 마다 테스트한다.
// 5. 생성자 호출과 명령의 실행 메서드 호출을 호출자(대체함수) 안으로 인라인한다.
// 6. 테스트한다.
// 7. '죽은 코드 제거하기'로 명령 클래스를 없앤다.

// ex.
class ChargeCalculator {
  constructor(customer, usage, provider) {
    this._customer = customer;
    this._usage = usage;
    this._provider = provider;
  }
  get baseCharge() {
    return this._customer.baseRate * this._usage;
  }
  charge(customer, usage, provider) {
    return this.baseCharge + this._provider.connectionCharge;
  }
}
monthCharge = new ChargeCalculator(customer, usgae, provider).charge;

// 위의 명령 클래스는 간단한 편이므로, 함수로 대체하는 것이 나아보인다.
function charge(customer, usage, provider) {
  return new ChargeCalculator(customer, usage, provider)
      .charge(customer, usage, provider);
}

// 파라미터를 따로 넘김으로서, 생성자에서 따로 필드를 만들 필요도 없어졌고, 클래스가 아닌 함수안에 모두다 옮길 수 있게 되었다.

function chargeRefac(customer, usage, provider) {
  const baseCharge = customer.baseRate * usage;
  return baseCharge + provider.connectionCharge;
}

// 그 후 호출부와 클래스를 제거한다.