// 문장 슬라이드하기
// 관련 코드끼리 모으는 작업은 다른 리팩터링의 준비단계라고 할 수 있다.

// 절차
// 1. 코드 조각(문장들)을 이동할 목표 위치를 찾는다. 코드 조각의 원래 위치와 목표 위치 사이의 코드들을 훑어보면서,
//    조각을 모으고 나면 동작이 달라지는 코드가 있는지 살핀다. 다음과 같은 간섭이 있다면 이 단계를 포기한다.
// -> 코드 조각에서 참조하는 요소를 선언하는 문장앞으로 이동할 수 없다.
// -> 코드 조각을 참조하는 요소의 뒤로는 이동할 수 없다.
// -> 코드 조각에서 참조하는 요소를 수정하는 문장을 건너뛰어 이동할 수 없다.
// -> 코드 조각이 수정하는 요소를 참조하는 요소를 건너뛰어 이동할 수 없다.
// 2. 코드 조각을 원래 위치에서 잘라내어 목표 위치에 붙여 넣는다.
// 3. 테스트한다.

// 테스트에 실패한다면 더 작게 나누어서 시도해보는 것도 방법이다.

// 코드 조각 슬라이드 하기는 무엇을 슬라이드 할지와 슬라이드할 수 있는지 여부가 중요하다.

// 슬라이드가 안전한 지를 판단하려면 관련된 연산이 무엇이고 어떻게 구성되는지를 완벽히 이해해야 한다.