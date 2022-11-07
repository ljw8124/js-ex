const assert = require('assert');

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
      {name: 'Byzantium', cose: 10, production: 9},
      {name: 'Attalia', cost: 12, production: 10},
      {name: 'Sinope', cost: 10, production: 6},
    ],
    demand: 30,
    price: 20,
  };
}

//생산 부족분을 제대로 계산하는지 확인하는 테스트
//모카프레임워크
describe('province', function() {
  it('shortfall ', function() {
    const asia = new Province(sampleProvinceData());  //픽스처 설정
    assert.equal(asia.shortfall, 5);                  //검증
  });
});

// ES6 를 사용하였다면 따로 실행필요
// npm install @babel/register --save-dev