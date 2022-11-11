// 변수 이름 바꾸기
// 명확한 프로그래밍의 핵심은 이름짓기 이다. 이름의 중요성은 그 사용 범위에 영향을 많이 받는다.

// 절차
// 1. 폭넓게 쓰이는 변수라면 '변수 캡슐화하기'를 고려한다
// 2. 이름을 바꿀 변수를 참조하는 곳은 모두 찾아서, 하나씩 변경한다. -> 단, 다른 코드베이스에서 참조하는 변수는 리팩터링 적용x
// 3. 테스트한다.

let tpHd = "untitled";
result += `<h1>${tpHd}</h1>`;   // 어떤 참조는 다음과 같이 변수를 읽기만 함

tpHd = obj['articleTitle']; // 값을 수정하는 곳

// 이럴 때 캡슐화를 사용하는 것이 좋다.
let _title = "untitled";
result += `<h1>${title()}</h1>`;

setTitle(obj['articleTitle']);

function title() {
    return _title;
}

function setTitle(arg) {
    _title = arg;
}

// 그 후 변수 이름 변경
// 이름을 바꾸기 위해 캡슐화부터 해야 할 정도로 널리 사용되는 변수라면, 나중을 위해서라도 함수 안에 캡슐화된 채로 두는 편이 좋다.

// ex. 상수 이름 바꾸기
// 상수는 캡슐화하지 않고도 복제 방식으로 점진적으로 바꿀 수 있다.
const companyName = "애크미 구스베리";
const cpyNm = companyName;

// 기존 이름을 참조하는 코드들은 새 이름으로 점진적으로 바꿀 수 있다.
// 다 바꿨다면, 복제본을 삭제한다.