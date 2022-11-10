// 변수 인라인 하기

function temp(anOrder) {
  // let basePrice = anOrder.basePrice;
  // return(basePrice > 1000);
  return anOrder.basePrice > 1000;
}

// 변수가 주변 코드를 리팩터링 하는데 방해가 된다면 그 변수를 인라인하는 것이 좋다

// 절차
// 1. 대입문의 우변(표현식)에서 부작용이 생기지는 않는지 확인한다.
// 2. 변수가 불변으로 선언되지 않았다면 불변으로 만든 후 테스트한다.
// 3. 이 변수를 가장 처음 사용하는 코드를 찾아서 대입문 우변 코드로 바꾼다.
// 4. 테스트한다.
// 5. 변수를 사용하는 부분을 모두 교체할 때까지 이 과정을 반복한다.
// 6. 변수 선언문과 대입문을 지운다.
// 7. 테스트한다.
