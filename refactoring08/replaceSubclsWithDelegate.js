// 서브클래스를 위임으로 바꾸기
// 흔히 객체 지향에서는 공통되는 일은 슈퍼 클래스에 두고 서브클래스에서 각자 용도에 맞게 기능을 추가하거나 오버라이드하는 것이 일반적이다.
// 상속은 한번만 쓸 수 있고, 클래스들의 관계를 아주 긴밀하게 결합하여 수정시 주의가 필요하다는 단점이 있다.
// 이 둘을 한번에 해결하는 것이 위임이다.
// 상속을 위임으로 바꿀 때 상태나 전략에 계층구조를 적용하면 유용할 때가 많다

// 절차
// 1. 생성자를 호출하는 곳이 많다면 생성자를 팩터리 함수로 바꾼다.
// 2. 위임으로 활용할 빈 클래스를 만든다. 이 클래스의 생성자는 서브클래스에 특화된 데이터를 전부 받아야하며, 보통은 슈퍼클래스를 가리키는 역참조도 필요하다
// 3. 위임을 저장할 필드를 슈퍼클래스에 추가한다.
// 4. 서브클래스 생성 코드를 수정하여 위임 인스턴스를 생성하고 위임 필드에 대입해 초기화한다.(이 작업은 팩터리함수가 담당)
// 5. 서브클래스의 메서드 중 위임 클래스로 이동할 것을 고른다.
// 6. '함수 옮기기'를 적용해 위임 클래스로 옮긴다. 원래 메서드에서 위임하는 코드는 지우지 않는다.
// 7. 서브클래스 외부에도 원래 메서드를 호출하는 코드가 있다면 서브클래스의 위임 코드를 슈퍼클래스로 옮긴다.
//    이때 위임이 존재하는지를 검사하는 보호 코드로 감싸야 한다. 호출하는 외부 코드가 없다면 원래 메서드는 죽은 코드가 되므로 제거한다.
// 8. 테스트한다.
// 9. 서브클래스의 모든 메서드가 옮겨질 때까지 5-8 과정을 반복한다.
// 10. 서브클랫드ㅡㄹ의 생성자를 호출하는 코드를 찾아서 슈퍼클래스의 생성자를 사용하도록 수정한다.
// 11. 테스트한다.
// 12. 서브클래스를 삭제한다.(죽은 코드 제거하기)

// ex.서브클래스가 하나일 때
class Booking {
  constructor(show, date, extras) {
    this._show = show;
    this._date = date;
    this._extras = extras;
  }
  get hasTalkback() {
    return (this._premumDelegate)
      ? this._premumDelegate.hasTalkback
      : this._show.hasOwnProperty('talkback') && !this.isPeakDay;
  }
  get _privateBasePrice() {
    let result = this._show.price;
    if(this.isPeakDay) result += Math.round(result * 0.15);
    return (this._premumDelegate)
      ? this._premumDelegate.extendBasePrice(result)
      :result;
  }
  _bePremium() {
    this._premumDelegate = new PremiumBookingDelegate(this, this._extras);
  }

  get baseDinner() {
    return (this._premumDelegate)
      ? this._premumDelegate.hasDinner
      : undefined;
  }
}

// class PremiumBooking extends Booking {
//   constructor(show, date, extras) {
//     super(show, date);
//     this._extras = extras;
//   }
//   // get hasTalkback() {
//   //   return this._show.hasOwnProperty('talkback');
//   // }
//   get basePrice() {
//     return Math.round(super.basePrice + this._extras.premiumFee);
//   }
//   get hasDinner() {
//     return this._extras.hasOwnProperty('dinner') && !this.isPeakDay;
//   }
// }

// 위 예에서는 위임보다 상속이 더 맞다. 서브클래스에 대한 지식이 없어도 정보가 충분히 제공되고 있고, 슈퍼클래스와 서브클래스의 차이를 명확하게 알 수 있다.
// 하지만 위임으로 변경하는 이유는 상속은 한 번 밖에 사용하지 못하고, 나중에 다른 기능으로 전환시에 더 유용할 수 있기 때문이다.

// 팩터리 함수로 생성
function createBooking(show, date) {
  return new Booking(show, date);
}

function createPremiumBooking(show, date, extras) {
  const result = new Booking(show, date, extras)
  result._bePremium(extras);
  return result;
}

// 위임 클래스를 생성
class PremiumBookingDelegate {
  constructor(hostBooking, extras) {
    this._host = hostBooking;
    this._extras = extras;
  }
  get hasTalkback() {
    return this._host._show.hasOwnProperty('talkback');
  }
  get basePrice() {
    return Math.round(this._host._privateBasePrice + this._extras.premiumFee);
  }
  extendBasePrice(base) {
    return Math.round(base + this._extras.premiumFee);
  }
  get hasDinner() {
    return this._extras.hasOwnProperty('dinner') && !this.isPeakDay;
  }
}

// 위 예시처럼 서브클래스가 하나만 있을 때는 코드가 개선되었다고 크게 느껴지지 않는다.
// 상속은 상황을 잘 다루고 있는데에 반해 위임은 분배 로직과 양방향 참조가 더해지는 등 복잡도가 높아지기 때문이다.


// ex. 서브클래스가 여러 개일 때
// function createBird(data) {
//   switch(data.type) {
//     case '유럽 제비':
//       return new EuropeanSwallow(data);
//     case '아프리카 제비':
//       return new AfricanSwallow(data);
//     case '노르웨이 파랑 앵무':
//       return new NorwegianBlueParrot(data);
//     default:
//       return new Bird(data);
//   }
// }
//
// class Bird {
//   constructor(data) {
//     this._name = data.name;
//     this._plumage = data.plumage;
//   }
//   get name() { return this._name; }
//   get plumage() { return this._plumage || "보통이다"; }
//   get airSpeedVelocity() { return null; }
// }
//
// class EuropeanSwallow extends Bird {
//   get airSpeedVelocity() { return 35; }
// }
//
// class AfricanSwallow extends Bird {
//   constructor(data) {
//     super(data);
//     this._numberOfCoconuts = data._numberOfCoconuts;
//   }
//
//   get airSpeedVelocity() { return 40 - 2 * this._numberOfCoconuts; }
// }
//
// class NorwegianBlueParrot extends Bird {
//   constructor(data) {
//     super(data);
//     this._voltage = data._voltage;
//     this._isNailed = data._isNailed;
//   }
//   get plumage() {
//     if(this._voltage > 100) return "그을렸다";
//     else return this._plumage || "예쁘다";
//   }
//   get airSpeedVelocity() { return (this._isNailed) ? 0 : 10 + this._voltage / 10; }
// }

// 위 코드를 야생 조류와 사육 조류로 나눈다고 가정해보자.
// 이 차이는 두 종류의 서브클래스로 나눌수도 있겠지만, 상속은 한번만 쓸수 있어서 사용하지 못한다.
// 이 처럼 서브클래스가 여러개인 경우에는 하나씩 간단한 것부터 시작한다.

// 우선 빈 위임클래스를 만든다.
class SpeciesDelegate {
  constructor(data, bird) {
    this._bird = bird;
  }
  get plumage() {
    return this._bird._plumage || "보통이다";
  }
  get airSpeedVelocity() {
    return null;
  }
}


class EuropeanSwallowDelegate extends SpeciesDelegate {
  get airSpeedVelocity() { return 35; }
}

class AfricanSwallowDelegate extends SpeciesDelegate {
  constructor(data, bird) {
    super(data, bird)
    this._numberOfCoconuts = data.numberOfCoconuts;
  }
  get airSpeedVelocity() {
    return 40 - 2 * this._numberOfCoconuts;
  }
}

class NorwegianBlueParrotDelegate extends SpeciesDelegate {
  constructor(data, bird) {
    super(data, bird);
    this._voltage = data.voltage;
    this._isNailed = data.isNailed;
    this._bird = bird;
  }
  get plumage() {
    if(this._voltage > 100) return "그을렸다";
    else return this._bird._plumage || "예쁘다";
  }
  get airSpeedVelocity() {
    return (this._isNailed) ? 0 : 10 + this._voltage / 10;
  }
}

class Bird {
  constructor(data) {
    this._name = data.name;
    this._plumage = data.plumage;
    this._speciesDelegate = this.selectSpecialDelegate(data);
  }
  get name() { return this._name; }
  get plumage() {
    // if(this._speciesDelegate instanceof NorwegianBlueParrotDelegate) return this._speciesDelegate.plumage;  // 정교하게 검사하는 방법이지만 권하지않음
    // if(this._speciesDelegate) return this._speciesDelegate.plumage;
    // else return this._plumage || "보통이다";
    return this._speciesDelegate.plumage;
  }

  get airSpeedVelocity() {
    // this._speciesDelegate ? this._speciesDelegate.airSpeedVelocity :  null;
    return this._speciesDelegate.airSpeedVelocity;
  }

  selectSpecialDelegate(data) {
    switch(data.type) {
      case '유럽 제비':
        return new EuropeanSwallowDelegate(data, this);
      case '아프리카 제비':
        return new AfricanSwallowDelegate(data, this);
      case '노르웨이 파랑 앵무':
        return new NorwegianBlueParrotDelegate(data, this);
      default:
        return new SpeciesDelegate(data, this);
    }
  }
}

function createBird(data) {
  return new Bird(data);
}

// class EuropeanSwallow extends Bird {
//   get airSpeedVelocity() { return this._speciesDelegate.airSpeedVelocity; }
// }
//
// class AfricanSwallow extends Bird {
//   constructor(data) {
//     super(data);
//     this._numberOfCoconuts = data.numberOfCoconuts;
//   }
//
//   get airSpeedVelocity() { return this._speciesDelegate.airSpeedVelocity; }
// }
//
// class NorwegianBlueParrot extends Bird {
//   constructor(data) {
//     super(data);
//     this._voltage = data.voltage;
//     this._isNailed = data.isNailed;
//   }
//   get plumage() {
//     if(this._voltage > 100) return "그을렸다";
//     else return this._plumage || "예쁘다";
//   }
//   get airSpeedVelocity() { return this._speciesDelegate.airSpeedVelocity; }
// }


// 이 처럼 서브클래스(상속)와 위임을 적절하게 사용하면 처음 구조와 비슷해보이지만, 더 엄격하게 기준을 가지고 나눌 수 있게 된다.