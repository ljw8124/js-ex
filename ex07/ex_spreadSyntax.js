//스프레드 연산자는 하나로 뭉쳐있는 여러 값들의 집합을 펼쳐서 개별적인 값으로 반환한다.
//이 때 사용 가능한 대상은 이터러블에 한장됨
console.log(...[1, 2, 3]);

//객체 리터널 내부에서 사용하는 경우
const obj = {x: 1, y: 2};
const copy = {...obj};  //얕은 복사
console.log(copy);
console.log(obj === copy);

//객체병합
const merged = {...{x: 1, y: 2}, ...{a: 3, b: 4}};
console.log(merged);

//특정프로퍼티 변경
//프로퍼티가 중복되는 경우 뒤에 있는 프로퍼티가 우선권을 갖는다
const changed = {...{x: 1, y: 2}, y: 100};
console.log(changed);

//프로퍼티 추가
const added = {...{x: 1, y: 2}, z: 0};
console.log(added);
