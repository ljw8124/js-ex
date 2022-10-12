import invoices from './invoices.json' assert {type: 'json'};
import plays from './plays.json' assert {type: 'json'};

// statement는 문자열만 반환하도록 수정
// -> 중간 데이터 구조 역할을 할 객체를 만듦
// -> 계산에 관련된 데이터는 statement로 이동
function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays));
}

// 데이터를 가공하는 함수를 따로 제공
function createStatementData(invoice, plays) {

  const statementData = {};

  statementData.customer = invoice.customer;  //고객 데이터를 중간데이터로 옮김
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);

  return statementData;

  // 연극 제목도 중간데이터구조에 추가하기 위해 공연정보 레코드에 연극데이터 추가
  function enrichPerformance(aPerformance) {

    const result = Object.assign({}, aPerformance); // 얉은 복사

    result.play = playFor(result);                     // 중간데이터에 연극정보를 저장 => 데이터화의 중요성
    result.amount = amountFor(result);                 // 중간데이터에 가격정보를 저장
    result.volumeCredits = volumeCreditsFor(result);   // 중간데이터에 점수정보를 저장

    return result;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function amountFor(aPerformance) {

    let result = 0;

    switch (aPerformance.play.type) {
      case "tragedy":
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;

      case "comedy":
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;

      default:
        throw new Error(`알 수 없는 장르: ${aPerformance.play.type}`)
    }
    return result;
  }

  function volumeCreditsFor(perf) {

    let result = 0;

    result += Math.max(perf.audience - 30, 0);
    if("comedy" === perf.play.type) result += Math.floor(perf.audience / 5);

    return result;
  }

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

    // 위의 for문을 파이프라인으로 변경
    return data.performances
    .reduce((total, p) => total + p.volumeCredits, 0);  // 이 때 0 은 initialValue
  }

}

// HTML 문자열을 반환하는 함수
// 중간데이터로 invoice 데이터를 옮김으로써 invoice를 파라미터로 전해줄 필요가 없어짐
function renderPlainText(data, /*invoice,*/ plays) {
  let result = `청구 내역 (고객명: ${data.customer})\n`;

  for(let perf of data.performances) {
    result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`;
  }

  result += `총액: ${usd(data.totalAmount)}\n`;
  result += `적립 포인트: ${data.totalVolumeCredits}점\n`;
  return result;

  function usd(aNumber) {
    return new Intl.NumberFormat("en-US",
        { style: "currency", currency: "USD",
          minimumFractionDigits: 2}).format(aNumber / 100);
  }
}


console.log(statement(invoices, plays));


/*
  reduce() 는 배열의 각 요소에 대해 함수를 실행하고 눚거된 값을 출력할 때 용이함.
  ex. 모든 배열의 합을 구하는 경우
  reduce는 원본 배열을 그대로 보존한다다


*/