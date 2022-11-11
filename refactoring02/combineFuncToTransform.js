// 여러 함수를 변환 함수로 묶기
function base(aReading) { }
function taxableCharge(aReading) { }

// 위 코드를 아래 코드로 변환 함수로 묶기
function enrichReading(argReading) {
    const aReading = _.cloneDeep(argReading);
    aReading.baseCharge = base(aReading);
    aReading.taxableCharge = taxableCharge(aReading);
    return aReading;
}

// 도출 로직이 반복되는 경우 한데로 모와두면, 검색과 갱신을 일관된 장소에서 처리할 수 있고, 로직 중복도 막을 수 있다.
// 이렇게 변환함수를 만들면 도출 과정을 검토할 일이 생겼을 때, 변환 함수만 살펴보면 된다.

// 여러 함수를 한데 묶는 이유는 도출 로직이 중복되는 것을 피하기 위해서이다.

// 절차
// 1. 변환한 레코드를 입력받아서 값을 그대로 반환하는 변환 함수를 만든다.
// 2. 묶을 함수 중 함수 하나를 골라서 본문 코드를 변환 함수로 옮기고, 처리 결과를 레코드에 새 필드로 기록한다.
//    그런 다음 클라이언트 코드가 이 필드를 사용하도록 수정한다.
// 3. 테스트한다.
// 4. 나머지 관련 함수도 위 과정에 따라 처리한다.

// 중복 코드는 나중에 로직을 수정할 때 골치를 썩인다.

// 하지만 변환 함수로 묶으면, 가공한 데이터를 새로운 레코드에 저장하고 원본 데이터가 수정되면 일관성이 깨질 수 있기 때문에,
// 원본 데이터가 코드안에서 갱신될 때 클래스로 묶는 편이 훨씬 낫다.
