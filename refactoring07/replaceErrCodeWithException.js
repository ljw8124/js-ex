// 오류코드를 예외로 바꾸기
// 예외를 사용하면 일일히 코드를 검사하거나 오류를 식별하는 작업이 필요하지 않게 된다.
// 예외는 정교한 메커니즘에서 정확하게 사용할 때 최고의 효과를 낸다.
// 즉 예외는 정확하게 예상 밖의 동작일 때에만 쓰여야 한다. 다른 말로 프로그램의 정상 동작 범주에 들지 않는 경우에 써야 한다.
// 그러므로 프로그램이 정상으로 도앚ㄱ하지 않을 것 같다면 예외를 사용해서는 안된다.

// 절차
// 1. 콜스택 상위에 해당 예외를 처리할 예외 핸들러를 작성한다.
// 2. 테스트한다.
// 3. 해당 오류 코드를 대체할 예외와 그 밖의 예외를 구분할 식별 방법을 찾는다.
// 4. 정적 검사를 수행한다.
// 5. catch 절을 수정하여 직접 처리할 수 있는 예외는 적절히 대처하고 그렇지 않은 예외는 다시 던진다.
// 6. 테스트한다.
// 7. 오류 코드를 반환하는 곳 모두에서 예외를 던지도록 수정한다. 하나씩 수정할 때마다 테스트한다.
// 8. 모두 수정했다면 그 오류 코드를 콜스택 위로 전달하는 코드를 모두 제거한다. 하나씩 수정할 때마다 테스트한다.

// ex.
const status = calculateShippingCosts(orderData);
if(status < 0) errorList.push({order: orderData, errorCode: status});

function localShippingRules(country) {
  const data = countryData.shippingRules[country];
  if(data) return new ShippingRules(data);
  else return -23;
}

function calculateShippingCosts(anOrder) {
  // 관련 없는 코드
  const shippingRules = localShippingRules(anOrder.country);
  if(shippingRules < 0) return shippingRules; // 오류 전파
  // 더 관련 없는 코드
}

// 위 부분에서 예외 핸들러를 갖춰야 하는데, status 자체를 try catch 로 묶는 경우 유효범위가 국한되기 때문에 조건문을 검사할 수 없다.
let statusRefac;
statusRefac = calculateShippingCosts(orderData);
if(status < 0) errorList.push({order: orderData, errCode: statusRefac});

// 위 함수를 아래와 같이 수정
try {
  statusRefac = calculateShippingCosts(orderData);
} catch (e) {
  throw e;
}
if(status < 0) errorList.push({order: orderData, errCode: statusRefac});

// 이제 오류를 잡으면 다시 처리하도록 던져야 한다.
// 이를 위한 서브클래스를 따로 작성
class OrderProcessingError extends Error {
  constructor(errorCode) {
    super(`주문 처리 오류: ${errorCode}`);
    this.code = errorCode;
  }
  get name() { return "OrderProcessingError"; }
}

// 위 클래스 추가로 예외 발생을 처리하는 로직을 추가할 수 있다.
try {
  calculateShippingCosts(anOrder);
} catch (e) {
  if(e instanceof OrderProcessingError) {
    errorList.push({order: orderData, errorCode: e.code});
  } else {
    throw e;
  }
}
// if(status < 0) errorList.push({order: orderData, errCode: statusRefac});

// 이제 statusRefac 가 필요없어짐.