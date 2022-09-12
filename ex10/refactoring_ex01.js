
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
    let thisAmount = 0;

    // 이런식의 switch문으로 파악한 정보는 휘발성이 높아서
    // 재빨리 코드에 반영해야 한다.
    // 그러면 다음번에 코드를 볼 때 다시 분석하지 않아도
    // 코드 스스로 자신의 역할이 무엇인지 말할 것이다.
    switch(play.type) {
      case "tragedy":
        thisAmount = 40000;
        if(perf.audience > 30) {
          thisAmount += 1000 * (perf.audience - 30);
        }
        break;

      case "comedy":
        thisAmount = 30000;
        if(perf.audience > 20) {
          thisAmount += 10000 + 500 * (perf.audience - 20);
        }
        thisAmount += 300 * perf.audience;
        break;

      default:
        throw new Error(`알 수 없는 장르: ${play.type}`)
    }

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

console.log(statement(invoices, plays));

/*
  리팩토링의 필요성

  만약 프로그램이 새로운 기능을 추가하기에 편한 구조가 아니라면,
  먼저 기능을 추가하기 쉬운 형태로 리팩터링을 한 후에
  원하는 기능을 추가하는 것이 좋다.

 */