//데이터의 변환을 위한 map, reduce
//함수형 자바스크립트를 유창하게 사용하기 위해서는 map 과 reduce가 핵심이다.

const schools = ["Youngil", "Daeil", "Shinjoung"];

//join을 이용한 문자열 구분
console.log(schools.join(", "));

//특정 문자열을 포함한 학교 리스트를 배열로 뽑고 싶을 때 -> filter
const YSchools = schools.filter(school => school[0] === 'Y');

console.log(YSchools.toString());

//filter 는 순수함수로 술어(true/false)를 인자로 받는다.
//배열에서 원소를 제거할 필요가 있을 떄 Array.pop() 이나 Array.splice()보다
//filter를 사용하는 것을 권장한다.

//filter를 이용하여 만든 cutSchool은 순수함수이다.
const cutSchool = (cutStirng, list) =>
    list.filter(school => school !== cutStirng);

console.log(cutSchool('Daeil', schools).join(", "));

console.log("--------------------------------");

//Array.map 은 술어(true/false)가 아니라 변환함수를 인자로 받는다.
const highSchool = schools.map(school => `${school} HighSchool`);
console.log(highSchool.join("\n"));
console.log(schools.join("\n"));

//이 때 highSchool은 schools 배열에 영향을 미치지 않는다.

//배열을 객체를 포함하는 배열로 변경하는 방식
const objSchools = schools.map(school => ({name: school}));

console.log(objSchools);

console.log("------------------------------------------");

let schoolArr = [
  {name: "Youngil"},
  {name: "Daeil"},
  {name: "Shinjoung"},
  {name: "Gangsea"},
]

//map을 이용하여 학교이름을 변경하는 함수
const editName = (oldName, changeName, arr) =>
    arr.map(item => (item.name === oldName ? {name: changeName} : item));

const updateSchool = editName("Youngil", "Hwagog", schoolArr);
console.log(schoolArr)
console.log(updateSchool);

console.log("-----------------------------------------------");

//reduce를 이용한 최대값 구하기
const ages = [21, 18, 42, 50, 72, 15];

const maxAge = ages.reduce((max, value) => (value > max ? value : max), 0);
console.log(maxAge);