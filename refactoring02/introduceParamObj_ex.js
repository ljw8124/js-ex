// 매개변수 객체 만들기

function amountInvoiced(aDateRange /* startDate, endDate */) { }

function amountReceived(aDateRange /* startDate, endDate */) { }

function amonutOverdue(aDateRange /* startDate, endDate */) { }

// 데이터 뭉치를 데이터 구조로 묶으면, 데이터 사이의 관계가 명확해진다는 이점이 있다.
// 그리고 이를 통해서 매개변수 수가 줄어든다. 이는 항상 똑같은 이름이 사용되므로, 코드의 일관성도 높아지게 된다.

// 데이터 구조에 담길 데이터에 공통으로 적용되는 동작을 추출해서 함수를 만드는 것은 훨씬 간결하게 표현할 수 있다.

// 절차
// 1. 적당한 데이터 구조가 아직 마련되어 있지 않다면 새로 만든다.
// 2. 테스트한다.
// 3. '함수 선언 바꾸기'로 새 데이터 구조를 매개변수로 추가한다.
// 4. 테스트한다.
// 5. 함수 호출 시 새로운 데이터 구조 인스턴스를 넘기도록 수정한다. 하나씩 수정할 때마다 테스트한다.
// 6. 기존 매개변수를 사용하던 코드를 새 데이터 구조의 원소를 사용하도록 바꾼다.
// 7. 다 바꿨다면 기존 매개변수를 제거하고 테스트한다.

// ex. 온도 측정값 배열에서 작동 범위를 검사하는 코드
class NumberRange {
    constructor(min, max) {
        this._data = { min: min, max: max };
    }
    get min() { return this._data.min; }
    get max() { return this._data.max; }
}

const station = {
    name: "ZB1",
    readings: [
        {temp: 47, time: "2016-11-10 09:10"},
        {temp: 53, time: "2016-11-10 09:20"},
        {temp: 58, time: "2016-11-10 09:30"},
        {temp: 53, time: "2016-11-10 09:40"},
        {temp: 51, time: "2016-11-10 09:50"},
    ]
};

function readingsOutsideRange(station, range) {
    return station.readings
        .filter(r => r.temp < range.min || r.temp > range.max);
}

describe('testTemp', () => {
    it('test', () => {
        const range = new NumberRange(50, 55)   // 임시 max, min
        console.log(readingsOutsideRange(station, range));
    });
});

// 진정한 값 객체로 거듭나기




