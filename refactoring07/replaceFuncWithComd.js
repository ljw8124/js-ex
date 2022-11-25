// 함수를 명령으로 바꾸기
// 함수를 객체 안으로 캡슐화하면 더 유용해지는 상황이 있는데, 이런 객체를 '명령 객체' 또는 '명령' 이라고 한다.
// 명령 객체는 대부분 메서드 하나로 구성되어 있고, 이 메서드를 요청해 실행하는 것이 이 객체의 목표이다.

// 절차
// 1. 대상 함수의 기능을 옮길 빈 클래스를 만든다. 클래스 이름은 함수 이름에 기초하여 만든다.
// 2. 방금 생성한 빈 클래스로 함수를 옮긴다.
// 3. 함수의 인수들 각각은 명령의 필드로 만들어 생성자를 통해 설정할지 고민한다.

// ex
function score(candidate, medicalExam, scoringGuide) {
  let result = 0;
  let healthLevel = 0;
  let highMedicalRiskFlag = false;

  if(medicalExam.iSmoker) {
    healthLevel += 10;
    highMedicalRiskFlag = true;
  }
  let certificationGrade = "regular";
  if(scoringGuide.stateWithLowCertification(candidate.originState)) {
    certificationGrade = "low";
    result -= 5;
  }

  // 비슷한 코드들...

  result -= Math.max(healthLevel - 5, 0);
  return result;
}

// 예시 함수는 더복잡해야하지만 간략한 예시를 듦.
// 우선 빈 클래스를 만들고 함수를 클래스 내부로 옮기는 것으로 시작한다.
// 더 가다듬기 위해서는 모든 지역변수를 필드로 바꾸어서 사용하는 것이다.

function score(candidate, medicalExam, scoringGuide) {
  return new Score(candidate, medicalExam, scoringGuide).execute();
}

class Score {
  constructor(candidate, medicalExam, scoringGuide) {
    this._candidate = candidate;
    this._medicalExam = medicalExam;
    this._scoringGuide = scoringGuide;
  }
  execute() {
    this._result = 0;
    this._healthLevel = 0;
    this._highMedicalRiskFlag = false;

    // if(this._medicalExam.iSmoker) {
    //   this._healthLevel += 10;
    //   this._highMedicalRiskFlag = true;
    // }
    this.scoreSmoking();

    this._certificationGrade = "regular";
    if(this._scoringGuide.stateWithLowCertification(this._candidate.originState)) {
      this._certificationGrade = "low";
      this._result -= 5;
    }
    // 비슷한 코드들...

    this._result -= Math.max(this._healthLevel - 5, 0);
    return this._result;
  }

  // 그 후 함수 추출하기를 사용
  scoreSmoking() {
    if(this._medicalExam.iSmoker) {
      this._healthLevel += 10;
      this._highMedicalRiskFlag = true;
    }
  }
}

// 이렇게 작성하면 명령을 중첩 함수처럼 다룰 수가 있다.