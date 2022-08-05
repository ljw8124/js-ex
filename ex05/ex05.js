//컴마를 이용하여 리스트매칭이 가능하다.
//즉 컴마를 사용함으로서 대치하는 역할이라고 보면 됨.
const [firstAnimal] = ["캥거루", "웜뱃", "코알라"];
console.log(firstAnimal);

const [,,thirdAnimal] = ["캥거루", "웜뱃", "코알라"];
console.log(thirdAnimal);

//ES2016 부터는 객체 메서드에 function을 작성하지 않아도 된다.
//옛날 방식
var skier = {
  name: name,
  sound: sound,
  powderYellL: function() {
    var yell = this.sound.toUpperCase();
    console.log(`${yell} ${yell} ${yell}!!!`);
  },
  speed: function(mph) {
    this.speed = mph;
    console.log('속력: ',mph);
  }
}

//새로운 방식
const skier2 = {
  name,
  sound,
  powderYellL() {
    let yell = this.sound.toUpperCase();
    console.log(`${yell} ${yell} ${yell}!!!`);
  },
  speed(mph) {
    this.speed = mph;
    console.log('속력: ', mph);
  }
}
// 객체 리터럴 개선을 통해 function을 직접 입력하지 않아도 되어서
//타이핑 양이 줄어들게 되었다

//스프레드 연산자
const lake = ["경포호", "화진포", "송지호", "청초호"];
const[first, ...rest] = lake; //나머지 표현을 ... 을 통해 가능

console.log(lake);
console.log(first);
console.log(rest.join(','));
