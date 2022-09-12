
import invoices from './invoices.json' assert {type: 'json'};
import plays from './plays.json' assert {type: 'json'};

// 지역변수를 제거함

// 지역변수의 제거는 추출작업이 더 쉽게 만들어준다.
// 변수 인라인을 이용하여 코드를 더욱 간결하게 수정
function statement(invoice, plays) {

  // 이 경우에 format 이라는 임시 변수가 나중에 문제를 일으킬 가능성이 있음
  // 자신의 함수 스코프 안에서만 유효하므로 따로 함수화하여 사용하는 것이 좋음
  // const format = new Intl.NumberFormat("en-US",
  //     { style: "currency", currency: "USD",
  //       minimumFractionDigits: 2}).format;

  let totalAmount = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;

  for(let perf of invoice.performances) {
    //청구내역 출력
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`;
    totalAmount += amountFor(perf);
  }

  let volumeCredits = 0;  // 그리고 문장슬라이드로 보기 쉬운 위치로 변경
  //누적되는 로직만을 적용하는 for문으로 따로 작성
  for(let perf of invoice.performances) {
    //추출한 함수를 이용하여 값을 누적
    volumeCredits += volumeCreditsFor(perf);
  }

  result += `총액: ${usd(totalAmount)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
}

//불필요하게 전달되는 변수 제거하기
function amountFor(aPerformance) {

  let result = 0;

  switch (playFor(aPerformance).type) {
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
      throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`)
  }
  return result;
}

// play는 개별공연에서 얻기 때문에 매개변수로 전달할 필요없이
// 이름만 추출하는 함수를 따로 작성
// 이 방법은 임시 변수를 질의 함수로 바꾸는 것이다.
function playFor(aPerformance) {
  return plays[aPerformance.playID];
}

// volumeCredits이 반복문을 돌 때마다 누적되어 까다롭게 작성중
function volumeCreditsFor(perf) {

  let result = 0;

  result += Math.max(perf.audience - 30, 0);
  if("comedy" === playFor(perf).type) result += Math.floor(perf.audience / 5);

  return result;
}

// 함수 이름도 format 에서 직관적으로 usd 로 변경
function usd(aNumber) {
  return new Intl.NumberFormat("en-US",
       { style: "currency", currency: "USD",
         minimumFractionDigits: 2}).format(aNumber / 100);
}

console.log(statement(invoices, plays));

// 이처럼 함수 변수를 일반 함수로 변경하는 것도 리팩터링이다.
