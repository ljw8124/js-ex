// 여러 함수를 클래스로 묶기

function base(aReading) { }
function taxableCharge(aReading) { }
function calculateBaseCharge(aReading) { }

// 위 함수들을 클래스로 묶음

class Reading {
    constructor() { }

    base() { }
    taxableCharge() { }
    calculateBaseCharge() { }
}

// 이 리팩터링은 이미 만들어진 함수들을 재구성하는 것과, 새로 만든 클래스와 관련된 기능들을 찾아서
// 새 클래스의 메서드로 뽑아내기 좋다.

// 여러 함수를 묶는 '변환 함수로 묶기' 방식도 있지만, 프로그램 문맥에 따라 선택하여 사용하면 된다.

// 절차
// 1. 함수들이 공유하는 공통 데이터 레코드를 캡슐화 한다.
// 2. 공통 레코드를 사용하는 함수 각각을 새 클래스로 옮긴다(함수 옮기기)
// 3. 데이터를 조작하는 로직들은 함수로 추출해서 새 클래스로 옮긴다.

// 프로그램의 다른 부분에서 데이터를 갱신할 가능성이 꽤 있을 때는 클래스로 묶어두면 큰 도움이 된다.
