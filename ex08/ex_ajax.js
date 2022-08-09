//JSON 형식
const person = {
  "name": "Lee",
  "age": 20,
  "alive": true,
  "hobby": ["traveling", "reading"]
}

//객체 리터럴 형식
const obj = {
  name: "Lee",
  age: 20,
  alive: true,
  hobby: ["traveling", "reading"]
}

console.log("person", person);
console.log("obj", obj);

//객체리터럴을 JSON 형식으로 변환
const json = JSON.stringify(obj);
console.log("objToJson", typeof json, json);

console.log("------------------parsed")
//반대로 JSON 형식을 객체로 변환
const parsed = JSON.parse(json);
console.log(typeof parsed +'\n' + parsed);