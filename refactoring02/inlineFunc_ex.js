// 함수 인라인하기

 /*
function getRating(driver) {
  return moreThanFiveLateDeliveries(driver) ? 2: 1;
}

function moreThanFiveLateDeliveries(driver) {
  return (driver.numberOfLateDeliveries > 5) ? 2: 1;
}
 */
// 위 함수를 함수 인라인
function getRatine(driver) {
  return (driver.numberOfLateDeliveries > 5) ? 2 : 1;
}

// 목적이 분명히 드러나는 이름의 짤막한 함수를 이용하기를 권하지만, 때로는 함수 본문이 이름보다 명확한 경우가 생기게 된다
// 이럴 때 그 함수를 제거하고 인라인하여 작성한다 (위 예시 코드 참고)
// '함수 인라인하기'를 활용하면 유용한 것만 남기고 나머지는 제거할 수 있다

// 절차
// 1. 다형 메서드인지 확인한다(서브클래스에서 오버라이드하는 메서드는 인라인하면 안 된다)
// 2. 인라인할 함수를 호출하는 곳을 모두 찾는다
// 3. 각 호출문을 함수 본문으로 교체한다
// 4. 하나씩 교체할 때마다 테스트한다(인라인은 여유가 생길 때마다 틈틈이 처리한다)
// 5. 함수 정의(원래 함수)를 삭제한다

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 아래와 같이 앞의 코드와 뒤의 코드가 전달되는 인자가 다른 경우를 신경써서 함수를 작성해야한다
//ex
function rating(aDriver) {
  return moreThanFiveLateDeliveries(aDriver) ? 2 : 1;
}

function moreThanFiveLateDeliveries(dvr) {
  return dvr.numberOfLateDeliveries > 5;
}

// 위의 코드보다 더 심화되는 경우
function reportLine(aCustomer) {
  const lines = [];
  gaterCustomerData(lines, aCustomer);
  return lines;
}

function gaterCustomerData(out, aCustomer) {
  out.push(["name", aCustomer.name]);
  out.push(["location", aCustomer.location]);
}

// 한 라인씩 인라인 하는 것이 테스트에도 좋고, 한 번에 처리하기 좋다.
// 한 문장을 처리하는데도 얼마든지 복잡해질 수 있다.
// 잦은 테스트로 단계를 나누며 리팩터링 하는 것이 좋다.