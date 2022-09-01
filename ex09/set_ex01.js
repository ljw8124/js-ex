// Set은 중복된 값을 저장하지 않음 -> 활용하여 배열에서 중복요소 제거 가능
const set1 = new Set([1, 2, 3, 3]);

console.log(set1);  // Set(3) { 1, 2, 3 }

const set2 = new Set('hello');

console.log(set2);  // Set(4) { 'h', 'e', 'l', 'o' }

// 배열의 중복요소 제거
const uniq = array => array.filter((v, i, self) => self.indexOf(v) === i);
console.log(uniq([2, 1, 2, 3, 4, 3, 4])); // [ 2, 1, 3, 4 ]

const uniq2 = array => [...new Set(array)];
console.log(uniq2([2, 1, 2, 3, 4, 3, 4]));  // [ 2, 1, 3, 4 ]

// 요소 개수 확인은 Set.prototype.size 사용
const {size} = new Set([1, 2, 3, 3]);
console.log(size);

// 더하기 add(), 존재여부 확인 has(), 삭제 delete(), 일괄삭제 clear()
// 응용하여 집합연산 구현
Set.prototype.intersection = function(set) {
  const result = new Set();
  
  for(const value of set) {
    if(this.has(value)) result.add(value);
  }
  return result;
}

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);

console.log(setA.intersection(setB)); //교집합