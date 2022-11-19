// 중첩 조건문을 보호 구문으로 바꾸기
// 조건문은 보통 두가지 형태로 쓰이는데, 참인 경로와 거짓인 경로 모두 정상 동작으로 이어지는 형태와, 한쪽만 정상인 형태이다
// 두 형태 모두 의도가는 바가 서로 다르므로 그 의도가 코드에 드러나야 한다.
// 두 경로 모두 정상 동작하는 경우에는 if/ else 를 사용하여 코드를 작성하고, 한쪽만 사용하는 경우에는
// if 에서 비정상 조건을 검사한 후 함수에서 빠져나오는 식으로 사용한다. 두 번째 검사 형태를 흔히 보호구문이라고 한다.

// 절차
// 1. 교체해야 할 조건 중 가장 바깥 것을 선택하여 보호구문으로 바꾼다.
// 2. 테스트한다.
// 3. 1-2 과정을 필요한 만큼 반복한다.
// 4. 모든 보호 구문이 같은 결과를 반환한다면 보후 구문들의 조건식을 통합한다.

// ex. 직원 급여 계산 코드
function payAmount(employee) {
  let result = null;
  if(employee.isSeparated) {  // 퇴사했는지 여부
    result = {amount: 0, reasonCode: "SEP"};
  } else {
    if(employee.isRetired) {  // 은퇴했는지 여부
      result = {amount:0, reasonCode: "RET"};
    } else {
      // 급여 계산 로직
      lorem.ipsum(dolor.sitAmet);
      consectetur(adipiscing).elit();
      sed.do.eiumod = tempor.incididunt.ut(labore) && dolore(magna.aliqua);
      ut.enim.ad(minim.veniam);
      result = someFinalComputation();
    }
  }
  return result;
}

// 위 코드에서 중첩된 조건으로 인해서 실제로 작동하는 방식을 잘 알지 못하고 있다.
// 이럴 때 보호 구문을 사용하면 코드의 의도를 더 잘 드러낼 수 있다.

function payAmountRefactoring(employee) {
  // let result = null;   // 가변 변수 제거는 할 수 있으면 하는 것이 좋다.
  if(employee.isSeparated) return {amount: 0, reasonCode: "SEP"};
  if(employee.isRetired) return {amount:0, reasonCode: "RET"};

  // 급여 계산 로직
  lorem.ipsum(dolor.sitAmet);
  consectetur(adipiscing).elit();
  sed.do.eiumod = tempor.incididunt.ut(labore) && dolore(magna.aliqua);
  ut.enim.ad(minim.veniam);
  return someFinalComputation();
}

// ex2. 조건 반대로 만들기
function adjustedCapital(anInstrument) {
  let result = 0;
  if(anInstrument.capital > 0) {
    if(anInstrument.interestRate > 0 && anInstrument.duration > 0) {
      result = (anInstrument.income / anInstrument.duration) * anInstrument.adjustmentFactor;
    }
  }
  return result;
}

// 위 함수에서 조건을 반대로 생각하면 영보다 작거나 같은 경우 바로 리턴하면 된다.
// 이 원리로 조건식을 반대로 생각할 수 있다.
function adjustedCapitalRefactoring(anInstrument) {
  let result = 0;
  if(anInstrument.capital <= 0) return result;
  if(anInstrument.interestRate <= 0 || anInstrument.duration <= 0) return result;
  result = (anInstrument.income / anInstrument.duration) * anInstrument.adjustmentFactor;
  return result;
}

// 여기에서 조건문 세개가 같은 값을 반환하므로 합칠 수 있게 된다.
function adjustedCapitalRefactoring2(anInstrument) {
  let result = 0;
  if(anInstrument.capital <= 0 || anInstrument.interestRate <= 0 || anInstrument.duration <= 0) {
    return result;
  }
  result = (anInstrument.income / anInstrument.duration) * anInstrument.adjustmentFactor;
  return result;
}

// 더 나아가 앞서 했던 방식대로 조건문을 따로 함수로 추출
function validate(anInstrument) {
  return anInstrument.capital <= 0 || anInstrument.interestRate <= 0 || anInstrument.duration <= 0
}

function adjustedCapitalRefactoringFinal(anInstrument) {
  if(validate(anInstrument)) return 0;
  return (anInstrument.income / anInstrument.duration) * anInstrument.adjustmentFactor;

}

