// 변수 쪼개기
// 변수는 다양하게 사용되는데, 긴 코드의 결과를 저장했다가 나중에 쉽게 참조하려는 목적으로 흔히 쓰인다.
// 위 용도의 변수는 한 번만 대입해야 하고, 두 번 이상 이뤄지는 경우 여러가지 역할을 한다는 의미이다.
// 역할 하나당 변수 하나이다.

// 절차
// 1. 변수를 선언한 곳과 값을 처음 대입하는 곳에서 변수 이름을 바꾼다.
// 2. 가능하면 이 때 불변으로 선언한다.
// 3. 이 변수에 두 번째로 값을 대입하는 곳 앞까지의 모든 참조(이 변수가 쓰인 곳)를 새로운 변수 읾을 바꾼다.
// 4. 두 번째 대입 시 변수를 원래 이름으로 다시 선언한다.
// 5. 테스트한다.
// 6. 반복한다. 매 반복에서 변수를 새로운 이름으로 선언하고 다음번 대입 때까지의 모든 참조를 새 변수명으로 바꾼다.
//    이 과정을 마지막 대입까지 반복한다.

// ex
function distanceTravelled(scenario, time) {
  let result;
  let acc = scenario.primaryForce / scenario.mass;  // 가속도 = 힘 / 질량
  let primaryTime = Math.min(time, scenario.delay);
  result = 0.5 * acc * primaryTime * primaryTime;  // 전파된 거리
  let secondaryTime = time - scenario.delay;
  if(secondaryTime > 0) {  // 두 번째 힘을 반영해 다시 계산
    let primaryVelocity = acc * scenario.delay;
    acc = (scenario.primaryForce + scenario.secondaryForce) / scenario.mass;
    result += primaryVelocity * secondaryTime +
        0.5 * acc * secondaryTime * secondaryTime;
  }
  return result;
}

// 위 함수에서 흥미로운 점은 acc 변수에 값이 두 번 대입된다는 점이다. 이는 변수 두개를 이용하라는 시그널이다.

// 함수나 파일에서 특정 심벌이 쓰인 위치를 시각적으로 강조해주는 코드 편집기를 사용하면 변수의 쓰임을 분석하는 데 도움이 된다.

// 변수에 새로운 이름을 지어주고, 선언 시 const 로 선언하여 불변으로 선언한다.
// 그리고 모든 참조를 새로운 이름으로 바구고, 두번 쨰 대입시 다시 선언한다.

function distanceTravelled(scenario, time) {
  let result;
  const primaryAcceleration = scenario.primaryForce / scenario.mass;  // 가속도 = 힘 / 질량
  let primaryTime = Math.min(time, scenario.delay);
  result = 0.5 * primaryAcceleration * primaryTime * primaryTime;  // 전파된 거리
  let secondaryTime = time - scenario.delay;
  if(secondaryTime > 0) {  // 두 번째 힘을 반영해 다시 계산
    let primaryVelocity = primaryAcceleration * scenario.delay;
    let acc = (scenario.primaryForce + scenario.secondaryForce) / scenario.mass;
    result += primaryVelocity * secondaryTime +
        0.5 * acc * secondaryTime * secondaryTime;
  }
  return result;
}

// 테스트 후 정상 작동한다면, 다음 변수도 불변으로 선언한다.

function distanceTravelled(scenario, time) {
  let result;
  const primaryAcceleration = scenario.primaryForce / scenario.mass;  // 가속도 = 힘 / 질량
  let primaryTime = Math.min(time, scenario.delay);
  result = 0.5 * primaryAcceleration * primaryTime * primaryTime;  // 전파된 거리
  let secondaryTime = time - scenario.delay;
  if(secondaryTime > 0) {  // 두 번째 힘을 반영해 다시 계산
    let primaryVelocity = primaryAcceleration * scenario.delay;
    const secondaryAcceleration =
        (scenario.primaryForce + scenario.secondaryForce) / scenario.mass;
    result += primaryVelocity * secondaryTime +
        0.5 * secondaryAcceleration * secondaryTime * secondaryTime;
  }
  return result;
}

