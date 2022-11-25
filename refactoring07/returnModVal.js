// 수정된 값 반환하기
// 데이터 블록을 읽고 수정하는 코드가 여러 곳이라면 데이터가 수정되는 흐름과 코드의 흐름을 일치시키기가 상당히 어렵다
// 그래서 명확히 그 사실을 알려주는 일이 중요하다.
// 변수를 갱신하는 함수라면, 수정된 값을 반환하여 호출자가 그 값을 변수에 담아두도록 하는 것도 좋은 방법이다.
// 이 리팩터링은 값 하나를 계산한다는 분명한 목적이 있는 경우에는 유용하지만, 여러개의 값을 갱신하는 함수에는 효과적이지 않다.

// 절차
// 1. 함수가 수정된 값을 반환하게 하여 호출자가 그값을 자신의 변수에 저장하게 한다.
// 2. 테스트한다.
// 3. 피호출 함수 안에 반환할 값을 가리키는 새로운 변수를 선언한다.
// 4. 테스트한다.
// 5. 계산이 선언과 동시에 이뤄지도록 통합한다.(즉, 선언 시점에 계산 로직을 바로 실행해 대입한다.)
// 6. 테스트한다.
// 7. 피호출 함수의 변수 이름을 새 역할에 어울리도록 바꿔준다.
// 8. 테스트한다.

// ex. GPS 위치 목록 예시코드
// let totalAscent = 0;
// let totalTime = 0;
// let totalDistance = 0;
// calculateAscent();
// calculateTime();
// calculateDistance();
//
// const pace = totalTime / 60 / totalDistance;
//
// // totalAscent 갱신하는 코드
// function calculateAscent() {
//   for(let i = 1; i < points.length; i++) {
//     const verticalChange = points[i].elevation - points[i-1].elevation;
//     totalAscent += (verticalChange > 0) ? verticalChange : 0;
//   }
// }

function calculateTime() { }
function calculateDistance() { }

// 위 코드에서 calculateAscent() 는 totalAscent 를 갱신하지만 그 사실이 드러나지 않고 있음
// let 으로 선언했던 totalAscent 를 const 로 변경하고, 선언위치를 바꾼다.
const totalAscent = calculateAscent();
let totalTime = 0;
let totalDistance = 0;

calculateTime()();
calculateDistance();
const pace = totalTime / 60 / totalDistance;

function calculateAscent() {
  let result = 0;
  for(let i = 1; i < points.length; i ++) {
    const verticalChange = points[i].elevation - points[i-1].elevation;
    result += (verticalChange > 0) ? verticalChange : 0;
  }
  return result;
}

// 나머지 변수들도 함수 리턴값으로 변경가능