// 질의 함수와 변경 함수 분리하기
function getTotalOutstandingAndSendBill() {
  const result = customer.invoices.reduce((total, each) => each.amount + total, 0);
  sendBill();
  return result;
}

// 위 프로세스를 분기
function getTotalOutstnading() {
  return customer.invoices.reduce((total, each) => each.amount + total, 0);
}

function sendBill() {
  emailGateway.send(formatBill(customer));
}

// 겉보기 부수효과가 있는 함수와 없는 함수는 명확히 구분하는 것이 좋다.

// 절차
// 1. 대상 함수를 복제하고 질의 목적에 충실한 이름을 짓는다.
// 2. 새 질의 함수에서 부수효과를 모두 제거한다.
// 3. 정적 검사를 수행한다.
// 4. 원래 함수(변경 함수)를 호출하는 곳을 모두 찾아낸다. 호출하는 곳에서 반환 값을 사용한다면 질의 함수를 호출하도록 바꾸고,
//    원래 함수를 호출하는 코드를 바로 아래줄에 새로 추가한다. 하나 수정 시마다 테스트한다.
// 5. 원래 함수에서 질의 관련 코드를 제거한다.
// 6. 테스트한다.

// ex
function alertForMiscreant(people) {
  for(const p of people) {
    if(p === "조커") {
      setOffAlarms();
      return;
    }
    if(p === "사루만") {
      setOffAlarms();
      return;
    }
  }
  return;
}

// 함수를 복제하여 질의 목적에 맞는 이름짓고, 부수효과를 낳는 부분을 제거한다
function findMiscreant(people) {
  for(const p of people) {
    if(p === "조커") {
      // setOffAlarms();
      return "조커";
    }
    if(p === "사루만") {
      // setOffAlarms();
      return "사루만;"
    }
  }
  return "";
}

// 그 후 원래 함수 호출하는 곳을 모두 찾아 새로운 질의 함수를 호출하도록 수정
const found = findMiscreant(people);
alertForMiscreant(people)

