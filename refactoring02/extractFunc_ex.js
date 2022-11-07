// 함수 추출하기
/*
function printOwing(invoice) {
  printBanner();
  let outstanding = calculateOutstanding();
  
  // 세부사항 출력
  console.log(`고객명: ${invoice.customer}`);
  console.log(`채무액: ${outstanding}`);
}

*/
// 위 코드에서 console 출력 부분을 함수 printDetails 로 추출
function printOwing(invoice) {
  printBanner();
  let outstanding = calculateOutStanding(invoice);
  
  printDetails(outstanding);
  
  function printDetails(outstanding) {
    console.log(`고객명: ${invoice.customer}`);
    console.log(`채무액: ${outstanding}`);
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 독립된 함수로 추출하고 목적에 맞는 이름을 붙여준다
// 목적과 구현을 분리하는 방식이 가장 합리적인 기준으로 함수 추출하기를 할 수 있다

// 함수를 짧게 많이 작성한다고 해서 성능면에서 문제가 생기지는 않는다
// 오히려 함수가 짧으면 캐싱하기 쉽기 때문에 컴파일러가 최적화하는 데 유리할 때가 많다

// '함수 추출하기'의 절차
// 1. 함수를 새로 만들고 목적을 잘 드러내는 이름을 붙인다 ('어떻게'가 아닌 '무엇을' 하는지가 드러내야 한다)
//    만약 이름이 잘떠오르지 않는다면 함수로 추출하면 안 된다는 신호이다
// 2. 추출할 코드를 원본 함수에서 복사하여 새 함수에 붙여넣는다
// 3. 추출한 코드 중 원본 함수의 지역변수를 참조하거나 추출한 함수의 유효범위를 벗어나는 변수는 없는지 검사한다. 있다면 매개변수로 전달한다
// 4. 변수를 다 처리했다면 컴파일한다
// 5. 원본 함수에서 추출한 코드 부분을 새로 만든 함수를 호출하는 문장으로 바꾼다(즉, 추출한 함수로 일을 위임한다)
// 6. 테스트한다
// 7. 다른 코드에 방금 추출한 것과 똑같거나 비슷한 코드가 없는지 살핀다. 있다면 방금 추출한 새 함수를 호출하도록 바꿀지 검토한다(인라인 코드를 함수 호출로 바꾸기)

//ex. 유효범위를 벗어나는 변수가 없을 때
 /*
function printOwint(invoice) {
  let outstanding = 0;
  
  console.log("***************");
  console.log("*** 고객채무 ***");
  console.log("***************");
  
  // 미채결 채무(outstanding)를 계산한다
  for(const o of invoice.orders) {
    outstanding += o.amount;
  }
  
  // 마감일(dueDate)을 기록한다
  const today = Clock.today;
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
  
  //세부사항을 출력한다.
  console.log(`고객명: ${invoice.customer}`);
  console.log(`채무액: ${outstanding}`);
  console.log(`마감일: ${invoice.dueDate.toLocaleDateString()}`);
}
 */
// 위 코드를 함수 추출하기를 이용하여 재작성

function printOwing(invoice) {
  let outstanding = 0;
  
  printBanner();  //배너 출력 로직을 함수로 추출
  
  // 미채결 채무(outstanding)를 계산한다
  for(const o of invoice.orders) {
    outstanding += o.amount;
  }
  
  // 마감일(dueDate)을 기록한다
  const today = Clock.today;
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(),
      today.getDate() + 30);
  
  printDetails();
  
  function printBanner() {
    console.log("***************");
    console.log("*** 고객채무 ***");
    console.log("***************");
  }
  
  function printDetails() {
    console.log(`고객명: ${invoice.customer}`);
    console.log(`채무액: ${outstanding}`);
    console.log(`마감일: ${invoice.dueDate.toLocaleDateString()}`);
  }
  // 이렇게 중첩함수로 작성하는 방법은 지원하지 않는 언어에서는 불가능한 방법이다
  // 그럴 때는 함수를 최상위 수준으로 추출
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ex. 지역변수를 사용할 때
function printOwing(invoice) {
  let outstanding = 0;
  
  printBanner();
  
  // 미채결 채무(outstanding)를 계산한다
  for(const o of invoice.orders) {
    outstanding += o.amount;
  }
  // 파라미터로 전달
  recordDueDate(invoice);
  printDetails(invoice, outstanding);
}

function printDetails(invoice, outstanding) {
  console.log(`고객명: ${invoice.customer}`);
  console.log(`채무액: ${outstanding}`);
  console.log(`마감일: ${invoice.dueDate.toLocaleDateString()}`);
}

function recordDueDate(invoice) {
  const today = Clock.today;
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(),
      today.getDate() + 30);
}

function printBanner() {
  console.log("***************");
  console.log("*** 고객채무 ***");
  console.log("***************");
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ex. 지역변수의 값을 변경할 때 -> 코드 슬라이드
function printOwing(invoice) {
  printBanner();
  
  // 함수를 추출하여, 추출한 함수가 반환한 값을 원래 변수에 저장
  const outstanding = calculateOutStanding(invoice);
  
  recordDueDate(invoice);
  printDetails(invoice, outstanding);
  
}

function calculateOutStanding(invoice) {
  let result = 0;
  for(const o of invoice.orders) {
    result += o.amount;
  }
  return result;
}

function printDetails(invoice, outstanding) {
  console.log(`고객명: ${invoice.customer}`);
  console.log(`채무액: ${outstanding}`);
  console.log(`마감일: ${invoice.dueDate.toLocaleDateString()}`);
}

function recordDueDate(invoice) {
  const today = Clock.today;
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(),
      today.getDate() + 30);
}

function printBanner() {
  console.log("***************");
  console.log("*** 고객채무 ***");
  console.log("***************");
}

// if 값을 반환할 변수가 여러 개라면?
// 제일 간단한 방법은 반환하는 변수마다 함수를 만들어서 결과값을 반환하는 방법이다.
//