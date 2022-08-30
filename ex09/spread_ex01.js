// spread 를 쓸 수 있는 것은 이터러블에 한한다. (for of 사용 가능 객체만)

// 기존의 배열을 합치는 방법
var arr = [1, 2].concat([3, 4]);

console.log(arr);

// spread 연산자를 이용하여 배열 합치기
const arr2 = [...[1, 2], ...[3, 4]];

console.log(arr2);

// 배열에 추가하거나 삭제할 때는 splice() 사용
var arr3 = [1, 4];
var arr4 = [2, 3];

// 이 때 arr4를 해체하여 전달하지 않으면 배열 자체가 추가됨.
arr3.splice(1, 0, arr4);

console.log(arr3);

// 스프레드 문법을 이용하여 가독성 좋게 표현하는 방법

arr3.splice(1, 0, ...arr4);

console.log(arr3);

// 배열 복사
// slice를 이용하여 배열을 복사함
// 구문: slice( [begin[end]] )
var origin = [1, 2];
var copy = origin.slice();

console.log(copy);
console.log(origin === copy); //slice를 이용한 복사는 얕은 복사

// spread 연산자를 이용하여 얕은 복사
const copy2 = [...origin];

console.log(copy2);
console.log(origin === copy2);  //spread 연산자를 이용한 복사는 얕은 복사

//-------------------------------------------------------------------
function sum() {
  var args = Array.prototype.slice.call(arguments);
  
  return args.reduce(function(pre, cur) {
    return pre + cur;
  }, 0);
}

console.log(sum(1, 2, 3));
