// 변수 캡슐화하기
// 함수는 호출만 하면 되는 것이므로 옮기거나, 전달하는 것으로 활용하기 쉽다.
// 하지만 데이터는 위의 방식으로 처리할 수 없고, 참조하는 모든 부분을 한 번에 바꿔야 코드가 제대로 작동한다.
// 유효범위가 넓은 데이터일수록(ex.전역변수) 다루기가 어려워진다.
// 그래서 데이터의 접근을 제한하는 캡슐화 방식을 이용하는 것이 좋다.

// 데이터의 유효범위가 넓을수록 캡슐화해야 한다.
// 캡슐화를 한다면 자주 사용하는 데이터에 대한 결합도가 높아지는 것을 막을 수 있다.
// 객체 지향에서 public 이 아닌 private 으로 개발해야하는 이유도 여기에 있다.
// 이 때 불변성 데이터는 따로 다시 값이 할당되지 않으므로 캡슐화가 불필요하다. 그저 복제하여 사용하면 된다.

// 절차
// 1. 변수로의 접근과 갱신을 전담하는 캡슐화 함수들을 만든다.
// 2. 정적 검사를 수행한다.
// 3. 변수를 직접 참조하던 부분을 모두 적절한 캡슐화 함수 호출로 바꾼다. 하나ㅣ씩 바꿀대마다 테스트한다.
// 4. 변수의 접근 범위를 제한한다. -> 변수로의 직접 접근을 막을 수 없을 때도 있는데, 그때에는 변수 이름을 바꿔서 테스트해보면 어디서 호출되는지 알 수 있다.
// 5. 테스트한다.
// 6. 변수 값이 레코드라면 '레코트 캡슐화하기'를 적용할지 고려한다.

// 예시
// let defaultOwner = {firstName: "마틴", lastName: "파울러"};
// spaceship.owner = defaultOwner; // 참조하는 코드는 당연히 존재한다.
// defaultOwner = {firstName: "레베카", lastName: "파슨스"}; // 갱신하는 코드 또한 당연히 존재한다.

// 기본적인 캡슐화를 위한 데이터를 읽고, 쓰는 함수 정의
// function getDefaultOwner() { return defaultOwner; }
// function setDefaultOwner(arg) { defaultOwner = arg; }

// getter 함수를 이용하여 값 할당
// spaceship.owner = getDefaultOwner();
// setDefaultOwner({firstName: "레베카", lastName: "파슨스"});

// 모든 참조를 수정한 후에 변수의 가시 범위를 제한한다.
import { createRequire } from "module";
const require = createRequire(import.meta.url); // node 에서 require 을 인식하지 못해서 import 필요
const assert = require('assert');

let defaultOwnerData = {firstName: "마틴", lastName: "파울러"};
// export function getDefaultOwner() { return defaultOwnerData; }
export function getDefaultOwner() { return Object.assign({}, defaultOwnerData); }
export function setDefaultOwner(arg) { defaultOwnerData = arg; }


// 값 캡슐화하기
// 이러한 형식으로 참조값을 캡슐화하는 것은 접근이나 구조를 대입하는 행위를 제어할 수 있지만, 필드 값을 변경하는 일은 제어할 수 없다.
describe('testFunc', () => {
    it('test1', () => {
        const owner1 = getDefaultOwner();
        assert.equal("파울러", owner1.lastName, "처음 값 확인");
        const owner2 = getDefaultOwner();
        owner2.lastName = "파슨스";
        assert.equal("파울러", owner1.lastName, "owner2를 변경한 후");
        // getDefaultOwner()를 주석코드로 실행하면, 위 equal 은 실패한다.
        // 캡슐화한 값이기 때문에, 접근하여 수정하는 것이 불가능하기 때문이다.
    });
});
