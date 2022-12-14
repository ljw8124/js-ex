//ES6에 맞춰 객체지향 스타일로 변경

//공연료 계산기 클래스
class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance;
    this.play = aPlay
  }

  //getter 를 이용하여 클래스 내 함수 선언
  get amount() {
    let result = 0;

    switch (this.play.type) {
      case "tragedy":
        result = 40000;
        if (this.performance.audience > 30) {
          result += 1000 * (this.performance.audience - 30);
        }
        break;

      case "comedy":
        result = 30000;
        if (this.performance.audience > 20) {
          result += 10000 + 500 * (this.performance.audience - 20);
        }
        result += 300 * this.performance.audience;
        break;

      default:
        throw new Error(`알 수 없는 장르: ${this.performance.play.type}`)
    }
    return result;
  }

  get volumeCredits() {
    let result = 0;

    result += Math.max(this.performance.audience - 30, 0);
    if("comedy" === this.play.type) result += Math.floor(this.performance.audience / 5);

    return result;
  }
}

export default function createStatementData(invoice, plays) {

  const result = {};

  result.customer = invoice.customer;  //고객 데이터를 중간데이터로 옮김
  result.performances = invoice.performances.map(enrichPerformance);
  result.totalAmount = totalAmount(result);
  result.totalVolumeCredits = totalVolumeCredits(result);

  return result;


  function enrichPerformance(aPerformance) {

    const calculator = new PerformanceCalculator(aPerformance, playFor(aPerformance)); // 공연료 계산기 클래스 생성
    const result = Object.assign({}, aPerformance);

    result.play = playFor(result);
    result.amount = calculator.amount;
    result.volumeCredits = calculator.volumeCredits;

    return result;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  //PerformanceCalculator class 내 함수로 이동

  // function amountFor(aPerformance) {
  //     return new PerformanceCalculator(aPerformance, playFor(aPerformance).amount);
  //
  // }

  // function volumeCreditsFor(perf) {
  //
  //   let result = 0;
  //
  //   result += Math.max(perf.audience - 30, 0);
  //   if("comedy" === perf.play.type) result += Math.floor(perf.audience / 5);
  //
  //   return result;
  // }

  function totalAmount(data) {

    // let result = 0;
    // for(let perf of data.performances) {
    //   result += perf.amount;
    // }
    // return result;

    //for문을 파이프라인으로 변경
    return data.performances
    .reduce((total, p) => total + p.amount, 0);
  }

  function totalVolumeCredits(data) {

    // let result = 0;
    // for(let perf of data.performances) {
    //   result += perf.volumeCredits;
    // }
    // return result;


    return data.performances
    .reduce((total, p) => total + p.volumeCredits, 0);  // 이 때 0 은 initialValue
  }

}
