/*
  리팩터링 첫 단계

  첫 단계는 항상 같은데, 리팩터링 한 부분을 검사할 테스트 코드 작성이 필요하다
  이 때 테스트는 반드시 자가진단하도록 만든다.
 */

// statement() 함수 쪼개기

import invoices from './invoices.json' assert {type: 'json'};
import plays from './plays.json' assert {type: 'json'};

function statement(invoice, plays) {

  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;

  const format = new Intl.NumberFormat("en-US",
      { style: "currency", currency: "USD",
        minimumFractionDigits: 2}).format;

  for(let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = amountFor(perf, play); // 추출한 함수를 이용

    //포인트 적립
    volumeCredits += Math.max(perf.audience - 30, 0);
    if("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

    //청구내역 출력
    result += ` ${play.name}: ${format(thisAmount/ 100)} (${perf.audience}\n`;
    totalAmount += thisAmount;
  }

  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
}
// 값이 바뀌지 않는 변수는 매개변수로 전달하는 것이 좋음
// 매개변수의 역할이 뚜렷하지 않을 때 a/an 처럼 관사를 넣어 역할을 명시할 수도 있음
function amountFor(aPerformance, play) {

  let result = 0;  //변수 초기화하는 코드, 변수 이름도 직관적으로 변경

  switch (play.type) {
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
      throw new Error(`알 수 없는 장르: ${play.type}`)
  }
  return result;
}

// 리팩터링을 단계적으로 실행하면서 바로바로 테스트를 함으로서
// 에러가 발생하지 앟는지 확인하는 것이 중요함
console.log(statement(invoices, plays));

// 리팩터링의 핵심은 조금씩 변경하고 매번 테스트하는 것이다.
// 한번에 많은 코드를 수정하다 에러가 발생하는 경우
// 디버깅이 어려워져서 결과적으로 작업시간이 더 늘어나게 된다.
// 조금씩 수정하여 피드백 주기를 짧게하는 습관은 이러한 실수를 줄일 수 있는 방법이다.

// 리팩터링을 수행할 때마다 형상관리를 하는 것도 용이함.
// 그렇게 하는 경우 에러가 발생하면 바로바로 돌릴 수 있기 때문이다.