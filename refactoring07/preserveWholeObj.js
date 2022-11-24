// 객체 통째로 넘기기
// 레코드를 통째로 넘기면 변화에 대응하기 쉽다.
// 또한 레코드를 통째로 넘기면 로직이 중복되는 것을 방지할 수 있다.
// 하지만 함수가 레코드 자체에 의존하는 것을 원치 않을 때나, 레코드와 함수가 서로 다른 모듈에 속한 경우에는 이 작업을 수행하지 않는다.
// 한편 한 객체가 제공하는 기능 중 항상 똑같은 일부만을 사용하는 코드가 많다면, 그 기능만 따로 묶어서 클래스로 추출하라는 신호일 수도 있다.

// 절차
// 1. 매개변수들을 원하는 형태로 받는 빈 함수를 만든다.
// 2. 새 함수의 본문에서는 원래 함수를 호출하도록 하며, 새 매개변수와 원래 함수의 매개변수를 매핑한다.
// 3. 정적 검사를 수행한다.
// 4. 모든 호출자가 새 함수를 사용하게 수정한다. 하나씩 수정하며 테스트한다.
// 5. 호출자를 모두 수정했다면 원래 함수를 인라인한다.
// 6. 새 함수의 이름을 적절하게 수정하고 모든 호출자에 반영한다.

// ex
function temp(aRoom, aPlan) {
  const low = aRoom.daysTempRange.low;
  const high = aRoom.daysTempRange.high;
  if(!aPlan.withinRange(low, high)) alerts.push("방 온도가 지정 범위를 벗어났습니다.");
}

// 위 호출자를 '변수 추출하기'를 통해서 해방시켜보자
function temp(aRoom, aPlan) {
  const low = aRoom.daysTempRange.low;
  const high = aRoom.daysTempRange.high;
  const isWithinRange = aPlan.withinRange(low, high);
  if(!isWithinRange) alerts.push("방 온도가 지정 범위를 벗어났습니다.");
}

// 그 다음 입력 매개변수를 추출한다
function temp(aRoom, aPlan) {
  const tempRange = aRoom.daysTempRange;
  const low = tempRange.low;
  const high = tempRange.high;
  const isWithinRange = aPlan.withinRange(low, high);
  if(!isWithinRange) {
    alerts.push("방 온도가 지정 범위를 벗어났습니다.");
  }
}

// 위 작업이 끝난 후 함수 추출하기를 이용하여 새 메서드 생성
function temp(aRoom, aPlan) {
  const tempRange = aRoom.daysTempRange;
  const isWithinRange = xxNEWwithRange(aPlan, tempRange);
  if(!isWithinRange) alerts.push("방 온도가 지정 범위를 벗어났습니다.");
}

function xxNEWwithRange(aPlan, tempRange) {
  const low = tempRange.low;
  const high = tempRange.high;
  const isWithinRange = aPlan.withinRange(low, high);
  return isWithinRange;
}




