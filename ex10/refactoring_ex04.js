
import invoices from './invoices.json' assert {type: 'json'};
import plays from './plays.json' assert {type: 'json'};

function statement(invoice) {

  let result = `청구 내역 (고객명: ${invoice.customer})\n`;

  for(let perf of invoice.performances) {
    //청구내역 출력
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`;
  }

  result += `총액: ${usd(totalAmount())}\n`;
  result += `적립 포인트: ${totalVolumeCredits()}점\n`;
  return result;
}

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

function playFor(aPerformance) {
  return plays[aPerformance.playID];
}

function volumeCreditsFor(perf) {

  let result = 0;

  result += Math.max(perf.audience - 30, 0);
  if("comedy" === playFor(perf).type) result += Math.floor(perf.audience / 5);

  return result;
}

function usd(aNumber) {
  return new Intl.NumberFormat("en-US",
      { style: "currency", currency: "USD",
        minimumFractionDigits: 2}).format(aNumber / 100);
}

function totalVolumeCredits() {

  let result = 0;
  for(let perf of invoices.performances) {
    result += volumeCreditsFor(perf);
  }
  return result;
}

function totalAmount() {

  let result = 0;
  for(let perf of invoices.performances) {
    result += amountFor(perf);
  }
  return result;
}

console.log(statement(invoices));

/*

리팩터링의 단계
1. 반복문 쪼개기로 변수 값을 누적시키는 부분을 분리
2. 문자 슬라이드하기로 변수 초기화 ㅁ누장을 변수 값 누적 코드 바로 앞으로 옮김
3. 함수 추출하기로 적립 포인트 계산 부분을 별도로 함수 추출
4. 변수 인라인하기로 voluemCredits 변수를 제거

 */