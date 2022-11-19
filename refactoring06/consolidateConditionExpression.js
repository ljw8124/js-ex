// 조건식 통합하기
// 비교하는 조건은 다르지만 그 결과로 수행하는 동작은 똑같은 경우가 있다.
// 어차피 같은 일을 할거라면 조건 검사도 하나로 통합하는 편이 좋다.
// 'or' 이나 'and' 를 사용하면 여러 개의 비교 로직을 하나로 합칠 수 있다.

// 조건부 통합의 중요한 이유는 두 가지인데, 첫째는 여러 개로 나눠진 조건들을 하나로 통합함으로써 의도가 명확해진다.
// 둘째는 이 작업이 '함수 추출하기' 로 이어질 가능성이 크기 때문이다.
// 복잡한 조건식을 함수로 추출하는 작업은 코드의 의도를 더 분명하게 드러내는 작용을 하기 때문이다.

// 절차
// 1. 해당 조건식들 모두에 부수효과가 없는지 확인한다.
// 2. 조건문 두 개를 선택하여 두 조건문의 조건식들을 논리 연산자로 결합한다.
// 3. 테스트한다.
// 4. 조건이 하나만 남을 때 까지 2-3 과정을 반복한다.
// 5. 하나로 합쳐진 조건식을 함수로 추출할지 결정한다.

// ex. or 사용
function disabilityAmount(anEmployee) {
  if(anEmployee.seniority < 2) return 0;
  if(anEmployee.monthsDisabled > 12) return 0;
  if(anEmployee.isPartTime) return 0;
  // 장애 수단 계산
}

// 위 코드는 조건식은 모두 다르지만 결과는 모두 0으로 반환하고 있다.
// 이럴 경우 or 연산자를 이용하여 합칠 수 있다.

function disabilityAmount(anEmployee) {
  if((anEmployee.seniority < 2) || (anEmployee.monthsDisabled > 12) || (anEmployee.isPartTime)) return 0;
}

// 그 후 함수로 따로 추출한다.
function disabilityAmonut(employee) {
  if(isNotEligibleForDisability()) return 0;

  function isNotEligibleForDisability() {
    return (anEmployee.seniority < 2) || (anEmployee.monthsDisabled > 12) || (anEmployee.isPartTime);
  }
}

// ex. and 사용
function temp() {
  if(anEmployee.onVacation) {
    if(anEmployee.seniority > 10) {
      return 1;
    }
  }
  return 0.5;
}

// 위 함수를 and 연산자를 이용하여 묶는다
function temp2() {
  if((anEmployee.onVacation) && (anEmployee.seniority > 10)) return 1;
  return 0.5;
}

// 두 경우가 복합된 상황에서는 and 와 or 를 적절하게 섞어 결합하는 것이 좋다.
// 그렇다고 너무 많이 섞이면 코드가 지저분해지기 때문에 '함수 추출하기'를 활용하여 더 이해하기 쉽게 만드는 것이 좋다.


