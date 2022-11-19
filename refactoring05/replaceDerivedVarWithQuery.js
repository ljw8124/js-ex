// 파생 변수를 질의 함수로 바꾸기
// 가변 데이터의 유효범위를 최대한 줄이는 것이 좋다.
// 계산 과정을 코드 자체로 보여줌으로서 데이터의 의미를 더 알기 쉽게 변환할 수도 있고, 다시 대입하지 않아서 발생하는 오류를 방지할 수도 있다.
// 만약 새로운 데이터 구조를 생성하는 '변형 연산' 이라면 대체 가능하더라도 그대로 두는 것이 좋다.

// 변형 연산이란?
// 첫 째, 데이터 구조를 감싸며 그 데이터에 기초하여 계산된 결과를 속성으로 제공하는 객체
// 두번 째, 데이터 구조를 받아 다른 데이터 구조를 변환해 반환하는 함수

// 절차
// 1. 변수 값이 갱신되는 지점을 모두 찾는다. 필요하면 '변수 쪼개기'를 활용하여 각 갱신 지점에서 변수를 분리한다.
// 2. 해당 변수의 값을 계산해주는 함수를 만든다.
// 3. 해당 변수가 사용되는 모든 곳에 어서션을 추가하여 함수의 계산 결과가 변수의 값과 같은지 확인한다.
// 4. 테스트한다.
// 5. 변수를 일근ㄴ 코드를 모두 함수 호출로 대체한다.
// 6. 테스트한다.
// 7. 변수를 선언하고 갱신하는 코드를 '죽은 코드 제거하기'로 없앤다.

// ex. 소스가 둘 이상일 때
class Production {
  constructor(production) {
    this._production = production;
    this._adjustments = [];
  }
  get production() { return this._production; }
  applyAdjustment(anAdjustment) {
    this._adjustments.push(anAdjustment);
    this._production += anAdjustment.amount;
  }
}

// 위의 코드는 _production 의 초깃값이 0이 아니라면 실패하고 만다.
// 이 파생 데이터를 대체하기 위해서 '변수쪼개기'를 적용하면 된다.

class Production {
  constructor(production) {
    this._initialProduction = production;
    this._productionAccumulator = 0;
    this._adjustments = [];
  }
  get production() {
    console.assert(this._productionAccumulator === this.calculatedProductionAccumulator);
    return this._initialProduction + this._productionAccumulator;
  }
  get calculatedProductionAccumulator() {
    return this._adjustments.reduce((sum, a) => sum + a.amount, 0);
  }
  // applyAdjustment(anAdjustment) {
  //   this._adjustments.push(anAdjustment);
  //   this._production += anAdjustment.amount;
  // }
}
