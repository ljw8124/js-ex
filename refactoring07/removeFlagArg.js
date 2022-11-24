// 플래그 인수 제거하기
// 플래그 인수란 호출되는 함수가 실행할 로직을 호출하는 쪽에서 선택하기 위해 전달하는 인수이다.

// 절차
// 1. 매개변수로 주어질 수 있는 값 각각에 대응하는 명시적 함수들을 생성한다.
// 2. 원래 함수를 호출하는 코드들을 모두 찾아서 각 리터럴 값에 대응되는 명시적 함수를 호출하도록 수정한다.

// ex
aShipment.deliveryDate = deliveryDate(anOrder, true);
aShipment.deliveryDate = deliveryDate(anOrder, false);

// 위와 같이 호출하고 있다면, 두번째 파라미터가 어떤 의미인지 모르게 된다.

// function deliveryDate(anOrder, isRush) {
//   if(isRush) {
//     let deliveryTime;
//     if(["MA", "CT"].includes(anOrder.deliveryState)) deliveryTime = 1;
//     else if(["NY", "NH"].includes(anOrder.deliveryState)) deliveryTime = 2;
//     else deliveryTime = 3;
//     return anOrder.placedOn.plusDays(1 + deliveryTime);
//   }
//   else {
//     let deliveryTime;
//     if(["MA", "CT"].includes(anOrder.deliveryState)) deliveryTime = 2;
//     else if(["NY", "NH"].includes(anOrder.deliveryState)) deliveryTime = 3;
//     else deliveryTime = 4;
//     return anOrder.placedOn.plusDays(2 + deliveryTime);
//   }
// }

// 위 함수는 '조건문 분해하기'를 적용할 수 있다.
function deliveryDate(anOrder, isRush) {
  if(isRush) return rushDeliveryDate(anOrder);
  else return regularDeliveryDate(anOrder);
}

function rushDeliveryDate(anOrder) {
  let deliveryTime;
  if(["MA", "CT"].includes(anOrder.deliveryState)) deliveryTime = 1;
  else if(["NY", "NH"].includes(anOrder.deliveryState)) deliveryTime = 2;
  else deliveryTime = 3;
  return anOrder.placedOn.plusDays(1 + deliveryTime);
}

function regularDeliveryDate(anOrder) {
  let deliveryTime;
  if(["MA", "CT"].includes(anOrder.deliveryState)) deliveryTime = 2;
  else if(["NY", "NH"].includes(anOrder.deliveryState)) deliveryTime = 3;
  else deliveryTime = 4;
  return anOrder.placedOn.plusDays(2 + deliveryTime);
}

// 마지막 호출부분도 다음과 같이 수정이 가능하다.
aShipment.deliveryDate = rushDeliveryDate(anOrder);
aShipment.deliveryDate = regularDeliveryDate(anOrder);

// ex. 매개변수를 까다로운 방식으로 사용할 때
function deliveryData(anOrder, isRush) {
  let result;
  let deliveryTime;
  if(anOrder.deliveryState === "MA" || anOrder.deliveryState === "CT") {
    deliveryTime = isRush ? 1: 2;
  } else if(anOrder.deliveryState === "NY" || anOrder.deliveryState === "NH") {
    deliveryTime = 2;
    if(anOrder.deliveryState === "NH" || !isRush) {
      deliveryTime = 3;
    }
  } else if(isRush) {
    deliveryTime = 3;
  } else if(anOrder.deliveryState === "ME") {
    deliveryTime = 3;
  } else {
    deliveryTime = 4;
  }

  result = anOrder.placedOn.plusDays(2 + deliveryTime);
  if(isRush) result = result.minusDays(1);
  return result;
}

// 이 경우에는 최상위 분배 조건문으로 뽑아내는 것보다는 래핑 함수를 생각해볼 수 있다.
function rushDeliveryDate(anOrder) { return deliveryData(anOrder, true); }
function regularDeliveryDate(anOrder) { return deliveryData(anOrder, false); }

// 래핑 함수들을 독립적으로 정의했지만, 새로운 기능을 추가한 게 아니라 각각이 deliveryDate() 의 기능 일부만을 제공한다.

// 이 두 함수를 추가했다면 호출하는 코드들을 앞에서 조건문을 쪼갰을 때와 똑같은 방식으로 대체할 수 있을 것이다.
