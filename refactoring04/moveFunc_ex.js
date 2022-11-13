// 함수 옮기기
// 좋은 소프트웨어 설계의 핵심은 '얼마나 잘 모듈화 되어 있는가'이다.
// 모듈성을 높이려면 서로 연관된 요소들을 함께 묶고, 요소 사이의 연결 관계를 쉽게 찾고 이해할 수 있도록 해야한다.
// 객체 지향 프로그래밍에서 핵심은 모듈화 컨텍스트이고, 그것은 클래스이다.

// 절차
// 1. 선택한 함수가 현재 컨텍스트에서 사용 중인 모든 프로그램 요소를 살펴본다. 이 요소들 중에도 함께 옮겨야 할 게 있는지 고민해본다.
// 2. 선택한 함수가 다형 함수인지 확인해본다
// 3. 선택한 함수를 타깃 컨텍스트로 복사한다.(이 때 원래의 함수를 소스 함수라 하고 복사해서, 만든 새로운 함수를 타깃함수라 한다.)
//    타깃함수가 새로운 터전에 잘 자리 잡도록 다듬는다.
// 4. 정적 분석을 수행한다.
// 5. 소스 컨텍스트에서 타깃 함수를 참조할 방법을 찾아 반영한다.
// 6. 소스 함수를 타깃 함수의 위임 함수가 되도록 수정한다.
// 7. 테스트한다.
// 8. 소스 함수를 인라인 할지 고민해본다.

// ex 중첩함수를 최상위 로 옮기기
function trackSummary(points) {
  const totalTime = calculateTime();
  const pace = totalTime / 60 / totalDistance(points);
  return {
    time: totalTime,
    distance: totalDistance(points),
    pace: pace
  };

  function calculateTime() {
    // 총 시간 계산
  }
}

// 최상위 함수 추가
function totalDistance(points) {
  let result = 0;
  for(let i = 0; i < points.length; i++) {
    result += distance(points[i-1], points[i]);
  }
  return result;
}

function distance(p1, p2) {
  // 두 지점의 거리 계산
  const EARTH_RADIUS = 3959;  // 단위: 마일(mile)
  const dLat = radians(p2.lat) - radians(p1.lat);
  const dLon = radians(p2.lon) - radians(p1.lon);
  const a = Math.pow(Math.sin(dLat / 2), 2) +
      Math.cos(radians(p2.lat)) +
      Math.cos(radians(p2.lat)) +
      Math.pow(Math.sin(dLon / 2), 2);
  const c = Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return EARTH_RADIUS * c;
}

function radians(degrees) {
  // 라디안 값으로 변환
  return degrees * Math.PI / 180;
}


