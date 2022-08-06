//ES2015 이후로 객체지향코딩이 더욱 가능해짐
//JS는 클래스 기반 상속이 아닌 프로토타입을 이용한 상속을 사용함 -> 객체지향으로 보임
function Vacation(destination, length) {
  this.destination = destination;
  this.length = length;
}

//prototype을 이용하여 Vacation에 print라는 함수를 상속시키고
Vacation.prototype.print = function() {
  console.log(this.destination + '은(는) ' + this.length + '일 걸립니다.');
}

//maui라는 Vacation 인스턴스를 생성
const maui = new Vacation("마우이", 7);
maui.print();

const trip = new Vacation("칠레", 10);
trip.print();

//추상클래스를 사용한 상속 관계에서 프로퍼티 추가
class Expedition extends Vacation {

  constructor(destination, length, gear) {
    super(destination, length);
    this.gear = gear;
  }
  //Vaction에서 상속했으므로 print 사용가능
  print() {
    super.print();
    console.log(`당신의 ${this.gear.join("와(과) 당신의 ")}를(을) 가져오십시오.`);
  }
}

const trip2 = new Expedition("한라산", 3, ["선글라스", "등산용 지팡이", "카메라"]);
trip2.print();