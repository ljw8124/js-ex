// 조건부 로직을 다형성으로 바꾸기
// 복잡한 조건부 로직은 프로그래밍에서 해석하기 가장 난해한 대상이다.
// 그렇기 때문에 이 로직을 직관적으로 구조화할 방법이 필요하다.
// 조건문 구조를 그대로 둔 채 해결되면 가장 좋겠지만, 클래스와 다형성을 이용하면 더 확실하게 분리할 수 있다.
// 다형성은 객체 지향 프로그래밍의 핵심이다. 하지만 그렇다고 해서 남용하는 것을 지양하지는 않는다.

// 절차
// 1. 다형적 동작을 표현하는 클래스들이 아직 없다면 만들어준다. 이왕이면 적합한 인스턴스를 알아서 만들어
//    반환하는 함수도 함께 만든다.
// 2. 호출하는 코드에서 팩터리 함수를 사용하게 한다.
// 3. 조건부 로직 함수를 슈퍼클래스로 옮긴다.
// 4. 서브클래스 중 하나를 선택한다. 서브클래스에서 슈퍼클래스의 조건부 로직 메서드를 오버라이드한다.
//    조건부 문장 중 선택된 서브클래스에 해당하는 조건절을 메서드로 복사한 다음 적절히 수정한다.
// 5. 같은 방식으로 각 조건절을 해당 서브클래스에서 메서드로 구현한다.
// 6. 슈퍼클래스 메서드에는 기본 동작 부분만 남긴다. 혹은 슈퍼클래스가 추상클래스여야 한다면, 이 메서드를 추상으로
//    선언하거라 서브클래스에서 처리해야 함을 알리는 에러를 던진다.

// ex
// function plumages(birds) {
//   return new Map(birds.map(bird => [bird.name, plumage(bird)]));
// }
//
// function speeds(birds) {
//   return new Map(birds.map(bird => [bird.name, airSpeedVelocity(bird)]));
// }
//
// function plumage(bird) {
//   switch(bird.type) {
//     case '유럽 제비':
//       return "보통이다";
//     case '아프리카 제비':
//       return (bird.numberOfCoconuts > 2) ? "지쳤다" : "보통이다";
//     case '노르웨이 파랑 앵무':
//       return (bird.voltage > 100) ? "그을렸다" : "예쁘다";
//     default:
//       return "알 수 없다";
//   }
// }
// function airSpeedVelocity(bird) {
//   switch(bird.type) {
//     case '유럽 제비':
//       return 35;
//     case '아프리카 제비':
//       return 40 - 2 * bird.numberOfCoconuts;
//     case '노르웨이 파랑 앵무':
//       return (bird.isNailed) ? 0 : 10 + bird.voltage / 10;
//     default:
//       return null;
//   }
// }


// 우선 plumge()와 airSpeedVelocity()를 Bird 클래스로 묶는다
class Bird {
  constructor(birdObject) {
    Object.assign(this, birdObject);
  }
  get plumage() {
    switch(this.type) {
      default:
        return "알 수 없다";
    }
  }

  get airSpeedVelocity() {
    switch(this.type) {
      default:
        return null;
    }
  }
}

// 그 후 서브클래스를 만들고, 적합한 서브클래스의 인스턴스를 만들어줄 팩터리 함수도 생성한다.
// function plumageRefactoring(bird) {
//   return createBird(bird).plumage;
// }
//
// function airSpeedVelocityRefactoring(bird) {
//   return createBird(bird).airSpeedVelocity;
// }

function createBird(bird) {
  switch(bird.type) {
    case '유럽 제비':
      return new EuropeanSwallow(bird);
    case '아프리카 제비':
      return new AfricanSwallow(bird);
    case '노르웨이 파랑 앵무':
      return new NorwegianBlueParrot(bird);
    default:
      return new Bird(bird);
  }
}

class EuropeanSwallow extends Bird {
  constructor() {
    super();
  }
  get plumage() { return "보통이다"; }
  get airSpeedVelocity() { return 35; }
}

class AfricanSwallow extends Bird {
  constructor() {
    super();
  }
  get plumage() { return (this.numberOfCoconuts > 2) ? "지쳤다" : "보통이다"; }
  get airSpeedVelocity() { return 40 - 2 * this.numberOfCoconuts; }
}

class NorwegianBlueParrot extends Bird {
  constructor() {
    super();
  }
  get plumage()  { return (this.voltage > 100) ? "그을렸다" : "예쁘다"; }
  get airSpeedVelocity() { return (this.isNailed) ? 0 : 10 + this.voltage / 10; }
}

// 그 후 plumages 와 speeds 를 수정
function plumages(birds) {
  return new Map(birds
      .map(bird => createBird(bird))
      .map(bird => [bird.name, bird.plumage]));
}
function speeds(birds) {
  return new Map(birds
      .map(bird => create(bird))
      .map(bird => [bird.name, bird.airSpeedVelocity]));
}

// 실제 이 코드에서 슈퍼클래스인 Bird는 없어도 무방해 보이지만, 계층성의 인과관계를 확실히 하기 위해서 남기는 것이 좋아보인다.

// 변형 동작을 다형성으로 표현하기
// 위 코드는 계층구조를 정확히 나누어서 리팩토링이 진행되었다

// function rating(voyage, history) {
//   const vpf = voyageProfitFactor(voyage, history);
//   const vr = voyageRisk(voyage);
//   const chr = captainHistoryRisk(voyage, history);
//   if(vpf * 3 > (vr + chr * 2)) return "A";
//   else return "B";
// }

function voyageRisk(voyage) {
  let result = 1;
  if(voyage.length > 4) result += 2;
  if(voyage.length > 8) result += voyage.length - 8;
  if(["중국", "동인도"].includes(voyage.zone)) result += 4;
  return Math.max(result, 0);
}

function captainHistoryRisk(voyage, history) {
  let result = 1;
  if(history.length < 5) result += 4;
  result += history.filter(v => v.profit < 0).length;
  if(voyage.zone === "중국" && hasChina(history)) result += 2;
  return Math.max(result, 0);
}

function hasChina(history) {
  return history.some(v => "중국" === v.zone);
}

function voyageProfitFactor(voyage, history) {
  let result = 2;
  if(voyage.zone === "중국") result += 1;
  if(voyage.zone === "동인도") result += 1;
  if(voyage.zone === "중국" && hasChina(history)) {
    result += 3;
    if(history.length > 10) result += 1;
    if(history.length > 12) result += 1;
    if(history.length > 18) result += 1;
  } else {
    if(history.length > 8) result += 1;
    if(voyage.length > 14) result -= 1;
  }
  return result;

}

// 호출하는 코드는 아래와 같다고 생각해보자
const voyage = {zone: "서인도", length: 10};
const history = [
  {zone: "동인도", profit: 5},
  {zone: "서인도", profit: 15},
  {zone: "중국", profit: -2},
  {zone: "서아프리카", profit: 7},
];

const myRating = rating(voyage, history);

// console.log("MY RATING:", myRating);


// 위 코드에서는 함수가 많은데, 다형성을 적용하기 위해서 클래스를 만들어 '클래스 묶기' 를 해보자

function ratingRefactoring(voyage, history) {
  return new Rating(voyage, history);
}

class Rating {
  constructor(voyage, history) {
    this.voyage = voyage;
    this.history = history;
  }

  get value() {
    const vpf = this.voyageProfitFactor;
    const vr = this.voyageRisk;
    const chr = this.captainHistoryRisk;
    if(vpf * 3 > (vr + chr * 2)) return "A";
    else return "B";
  }

  get voyageProfitFactor() {
    let result = 2;

    if(this.voyage.zone === "중국") result += 1;
    if(this.voyage.zone === "동인도") result += 1;
    result += this.voyageAndHistoryLengthFactor;
    return result;
  }

  // 위 에서 복잡했던 중국 여행 기록을 따로 함수로 추출
  get voyageAndHistoryLengthFactor() {
    let result = 0;
    if(this.voyage.zone === "중국" && this.hasChinaHistory)  {
      result += 3;
      if(history.length > 10) result += 1;
      if(history.length > 12) result += 1;
      if(history.length > 18) result += 1;
    } else {
      if(history.length > 8) result += 1;
      if(voyage.length > 14) result -= 1;
    }
    return result;
  }

  get hasChinaHistory() {
    return this.history.some(v => "중국" === v.zone);
  }

  get voyageRisk() {
    let result = 1;
    if(this.voyage.length > 4) result += 2;
    if(this.voyage.length > 8) result += this.voyage.length - 8;
    if(["중국", "동인도"].includes(this.voyage.zone)) result += 4;
    return Math.max(result, 0);
  }

  get captainHistoryRisk() {
    let result = 1;
    if(this.history.length < 5) result += 4;
    result += this.history.filter(v => v.profit < 0).length;
    // if(this.voyage.zone === "중국" && this.hasChinaHistory) result -= 2; // 아래에서 오버라이딩했으므로 주석처리
    return Math.max(result, 0);
  }
}

// 기본 동작을 담당할 클래스는 만들어졌다. 다음 차례에는 변형 동작을 담을 빈 서브클래스를 만든다.

// class ExperiencedChinaRating extends Rating {
//
// }

// 그 다음 적절한 변형 클래스를 반환해줄 팩터리 함수를 만든다
function createRating(voyage, history) {
  if(voyage.zone === "중국" && history.some(v => "중국" === v.zone)) {
    return new ExperiencedChinaRating(voyage, history);
  } else {
    return new Rating(voyage, history);
  }
}

// 그 후, rating() 함수에서 팩토리 함수를 호출하도록 수정
function rating(voyage, history) {
  return createRating(voyage, history).value;
}

// 위 단계를 거친 뒤, ExperiencedChinaRating 클래스에 오버라이딩한다
class ExperiencedChinaRating extends Rating {
  constructor() {
    super();
  }
  get captainHistoryRisk() {
    const result = super.captainHistoryRisk - 2;
    return Math.max(result, 0);
  }
}
