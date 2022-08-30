// 이터러블이 아닌 유사 배열 객체
const arrayLike = {
  0: 1,
  1: 2,
  2: 3,
  length: 3
};

const arr = Array.prototype.slice.call(arrayLike);
console.log(Array.isArray(arr));

// ES6에서 도입된 유사 배열 객체 또는 이터러블을 배열로 변환하는 메서드
const arr2 = Array.from(arrayLike);
console.log(Array.isArray(arr2));

// 배열 병합하기
const merged = Object.assign({}, {x: 1, y: 2}, {y: 10, z: 3});
console.log('merged :', merged);

// 특정 프로퍼티 변경
const changed = Object.assign({}, {x: 1, y: 2}, {y: 100});
console.log('changed :', changed);

// 특정 프로퍼티 추가
const added = Object.assign({}, {x: 1, y: 2}, {z: 3});
console.log('added :', added);

// 스프레드 연산자 병합
const merged2 = {...{x: 1, y: 2}, ...{y: 10, z: 3}};
console.log('spread merged :', merged2);

// 스프레드 연산자로 특정 프로퍼티 변경
const changed2 = {...{x: 1, y: 2}, y :100};
// const changed2 = {...{x: 1, y:2}, ...{y: 100}};
console.log('spread changed :', changed2);

//스프레드 연산자로 프로퍼티 추가
const added2 = {...{x: 1,  y: 2}, z: 3};
// const added2 = {...{x: 1, y: 2}, ...{z: 3}};
console.log('spread added :', added2);