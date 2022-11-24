// 질의함수를 매개변수로 바꾸기
// 이 단계는 대상 함수가 더 이상 특정 원소에 의존하길 원치 않을 때 일어난다.
// 똑같은 값을 건네면 매번 똑같은 결과를 내는 함수를 다루기 쉽다. 이 성질을 '참조 투명성'이라고 한다.
// 참조 투명하지 않은 원소에 접근하는 모든 함수는 참조 투명성을 잃게 된다. 이 때는 해당 원소를 매개변수로 바꾸면 해결된다.
// 그래서 모듈을 개발할 때 순수 함수들을 따로 구분하고, 프로그램의 입출력과 기타 가변 원소들을 다루는 로직으로 순수 함수들의 겉을 감싸는 패턴을 많이 활용한다.
// 이 단계에서의 문제점은 결국 책임 소재를 프로그램의 어디에 배정하느냐의 문제로 귀결된다.

// 절차
// 1. '변수 추출하기'로 질의 코드를 함수 본문의 나머지 코드와 분리한다.
// 2. 함수 본문 중 해당 질의를 호출하지 않는 코드들을 별도 함수로 추출한다.
// 3. 방금 만든 변수를 인라인하여 제거한다.
// 4. 원래 함수도 인라인한다.
// 5. 새 함수의 이름을 원래 함수의 이름으로 고쳐준다.

const thermostat = {
  selectedTemperature: null, // 미정
  currentTemperature: 12     // 현재온도
};

function setToHeat() {
  console.log("온도 올림");
}

function setToCool() {
  console.log("온도 내림");
}

function setOff() {
  console.log("기타 설정");
}

// ex
class HeatingPlan {
  constructor(max, min) {
    this._max = max;
    this._min = min;
  }

  get targetTemperature() {
    if(thermostat.selectedTemperature > this._max) return this._max;
    else if(thermostat.selectedTemperature < this._min) return this._min;
    else return thermostat.selectedTemperature;
  }
}

// const thePlan = new HeatingPlan(27, 8);

// 호출부
// if(thePlan.targetTemperature > thermostat.currentTemperature) setToHeat();
// else if(thePlan.targetTemperature < thermostat.currentTemperature) setToCool();
// else setOff();

// 위 함수에서 신경쓰이는 점은 targetTemperature() 메서드가 전역객체에 의존하고 있다는 점이다.
// 그러니 이 전역객체를 건네는 질의 메서드를 매개변수로 옮겨서 의존성을 없애보자

class HeatingPlanRefactorPrev {
  constructor(max, min) {
    this._max = max;
    this._min = min;
  }

  get targetTemperature() {
    // const selectedTemperature = thermostat.selectedTemperature;    // 방금 추출한 변수를 인라인하므로, 단순 호출만 남긴다.
    return this.xxNEWtargetTemperature(thermostat.selectedTemperature);
  }

    // 그 후 메서드로 추출
    xxNEWtargetTemperature(selectedTemperature) {
      if(selectedTemperature > this._max) return this._max;
      else if(selectedTemperature < this._min) return this._min;
      else return selectedTemperature;
    }
}

const thePlan = new HeatingPlanRefactor(27, 8);

// 그 후 호출부 수정과 임시작성 메서드 제거

class HeatingPlanRefactor {
  constructor(max, min) {
    this._max = max;
    this._min = min;
  }

  targetTemperature(selectedTemperature) {
    if(selectedTemperature > this._max) return this._max;
    else if(selectedTemperature < this._min) return this._min;
    else return selectedTemperature;
  }

}

// 호출자
if(thePlan.targetTemperature(thermostat.selectedTemperature) > thermostat.currentTemperature) {
  setToHeat();
} else if(thePlan.targetTemperature(thermostat.selectedTemperature) < thermostat.currentTemperature) {
  setToCool();
} else {
  setOff();
}

// 이 리팩터링을 거치면 호출하는 쪽 코드는 전보다 다루기가 어려워진다.
// '의존성을 모듈 바깥으로 밀어낸다'라고 함은 의존성을 처리하는 책임을 호출자에게 지운다는 뜻이기 때문이다.
