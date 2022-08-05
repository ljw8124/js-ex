//함수의 인수를 받아 동적으로 값 제공하기
console.error('fn1');
const fn1 = function(firstName, masseage) {
  console.log(`${firstName}: ${masseage}`);
};

fn1('홍길동', '잘했어요');

//값 반환하기
console.error('fn2');
const fn2 = function(name, masseage) {
  return `${name}: ${masseage}`;
};

console.log(fn2('김철수', '정말 잘했어요'));

//디폴트 파라미터
console.error('fn3');
const fn3 = function(name = '디폴트', message = '디폴트메시지') {
  console.log(`${name}은 ${message}를 가지고 있어.`);
};
fn3();
fn3('김철수', '수정메시지');

//디폴트 파라미터의 경우 문자열이 아닌 어떤 타입의 값이 들어가더라도 사용할 수 있다.
console.error('fn4');
const defaultPerson = {
  name: {
    first: '성원',
    last: '오',
  },
  activity: '테니스'
};

const changePerson = {
  name: {
    first: '철수',
    last: '김'
  },
  activity: '축구'
};
const fn4 = function(defaultParam = defaultPerson) {
  console.log(`${defaultParam.name.first}은 ${defaultParam.activity}를 좋아한다`);
}
fn4();
fn4(changePerson);

//화살표 함수의 등장
console.error("fn5")
const fn5 = (name, message) => `${name}이 말하기를.. ${message}`;

console.log(fn5('철수', '똑바로살아!'));