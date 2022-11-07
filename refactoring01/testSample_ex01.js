const assert = require('assert');
const expect = require('chai').expect;

class Province {
  constructor(doc) {
    this._name = doc.name;
    this._producers = [];
    this._totalProduction = 0;
    this._demand = doc.demand;
    this._price = doc.price;
    doc.producers.forEach(produce => {
      this.addProducer(new Producer(this, produce));
    });
  }
  
  addProducer(arg) {
    this._producers.push(arg);
    this._totalProduction += arg.production;
  }
  
  get name() { return this._name; }
  
  get producers() { return this._producers.slice(); }
  
  get totalProduction() { return this._totalProduction; }
  
  set totalProduction(arg) { this._totalProduction = arg; }
  
  get demand() { return this._demand; }
  
  set demand(arg) { this._demand = parseInt(arg); }
  
  get price() { return this._price; }
  
  set price(arg) { this._price = parseInt(arg); }
  
  get shortfall() {
    return this._demand - this.totalProduction;
  }
  
  get profit() {
    return this.demandValue - this.demandCost;
  }
  
  get satisfiedDemand() {
    return Math.min(this._demand, this.totalProduction);
  }
  
  //수익계산
  get demandCost() {
    let remainingDemand = this.demand;
    let result = 0;
    this.producers.sort((a, b) => a.cost - b.cost).forEach(p => {
      const contribution = Math.min(remainingDemand, p.production);
      remainingDemand -= contribution;
      result += contribution * p.cost;
    });
    return result;
  }
  
  get demandValue() {
    return this.satisfiedDemand * this.price;
  }
}

class Producer {
  constructor(aProvince, data) {
    this._province = aProvince;
    this._cost = data.cost;
    this._name = data.name;
    this._production = data.production || 0;
  }
  
  get name() { return this._name; }
  
  get cost() { return this._cost; }
  
  set cost(arg) { this._cost = parseInt(arg); }
  
  get production() { return this._production; }
  
  set production(amountStr) {
    const amount = parseInt(amountStr);
    const newProduction = Number.isNaN(amount) ? 0 : amount;
    
    this._province.totalProduction += newProduction - this._production;
    this._production = newProduction;
  }
}

function sampleProvinceData() {
  return {
    name: 'Asia',
    producers: [
      {name: 'Byzantium', cost: 10, production: 9},
      {name: 'Attalia', cost: 12, production: 10},
      {name: 'Sinope', cost: 10, production: 6},
    ],
    demand: 30,
    price: 20,
  };
}

// 생산 부족분을 제대로 계산하는지 확인하는 테스트
// 모카프레임워크
// 모카 프레임워크는 어느 테스트가 실패했는지, 실패원인을 추론할 수 있는 단서를 제공한다.
describe('province', function() {
  it('shortfall ', function() {
    const asia = new Province(sampleProvinceData());  //픽스처 설정
    assert.equal(asia.shortfall, 5);                  //검증
  });
});

// ES6 를 사용하였다면 따로 실행필요
// npm install @babel/register --save-dev

// 실패해야 할 상황에서는 반드시 실패하게 만들자
// 자주 테스트하라. 작성 중인 코드는 최소한 몇 분 간격으로 테스트하고, 적어도 하루에 한 번은 전체 테스트를 돌려보자.

// 테스트는 위험 요인을 중심으로 만들어야 한다.
// 와벽하게 만드느라 테스트를 수행하지 못하느니, 불완전한 테스트라도 작성해 실행하는 게 낫다.

// expect 는 chai 에서 추가 필요
/*
describe('province2', function() {
  // 이런식으로 공유 픽스처를 생성하는 것은 좋지 않다.
  // const 는 상수라는 의미인데, 나중에 asia 를 수정할 필요가 생기면 오류가 발생하기 때문이다.
  // const asia = new Province(sampleProvinceData());
  it('shortfall', function() {
    const asia = new Province(sampleProvinceData());
    expect(asia.shortfall).equal(5);
  });
  it('profit', () => {
    const asia = new Province(sampleProvinceData());
    expect(asia.profit).equal(230);
  })
});
 */

// mocha 에서 describe
// before() - 모든 테스트가 실행되지 너에 모든 테스트를 describe
// after() - 한 번 실행한 후 모든 테스트를 describe
// beforeEach() - 테스트가 실행되기 전에 각각 describe
// afterEach() - 테스트가 실행 된 이후 각각 describe

describe('province2', () => {
  
  let asia;
  beforeEach(() => {
    asia = new Province(sampleProvinceData());
  });
  it('shortfall', () => {
    expect(asia.shortfall).equal(5);
  });
  it('profit', () => {
    expect(asia.profit).equal(230);
  });
  
  // setter 테스트
  // beforeEach 블록에서 설정한 표준 픽스처를 취해서 테스트를 수행하고, 제대로 처리했는지 검증한다.
  // '설정-실행-검증' 또는 '조건-발생-결과' 또는 '준비-수행-단언' 등으로 불림
  it('change production', () => {
    asia.producers[0].production = 20;
    expect(asia.shortfall).equal(-6);
    expect(asia.profit).equal(292);
  });
  // 위 코드에서는 it 에서 두가지 사항을 검증하고 있는데,
  // 일반적으로는 it 하나당 하나의 사항을 검증하는 것이 좋음
  // because, 앞 쪽 검증을 통과하지 않으면 나머지 검증은 실행되지도 않고 실패하기 때문이다.
});



