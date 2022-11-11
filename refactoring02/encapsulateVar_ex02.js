// 변수에 담긴 값을 변경하고 싶을 때는 변수에 담긴 내용을 변경하는 행위까지 제어할 수 있도록 캡슐화하면 된다.

let defaultOwnerData = {firstName: "마틴", lastName: "파울러"};
export function defaultOwner() { return new Person(defaultOwnerData); }
export function setDefaultOwner(arg) { defaultOwnerData = arg; }

class Person {
    constructor(data) {
        this._firstName = data.firstName;
        this._lastName = data.lastName;
    }
    get firstName() { return this._firstName; }
    get lastName() { return this._lastName; }
    // 다른 속성도 이렇게 처리한다.
}

// 이런 식으로 구현한다면, defaultDataOwner 의 속성을 다시 대입하는 연산은 모두 무시된다.
// 이런 변경 방식은 각 언어에 맞게 구현하면 된다.
// 데이터 캡슐화는 유용하지만 그 과정이 순탄치 않은 경우가 크다.
// 캡슐화의 구체적인 대상과 방법은 데이터를 사용하는 방식과 어떻게 변경하려는 지에 따라 달라진다.
// 하지만 데이터의 사용 범위가 점점 넓어질수록 적절히 캡슐화하는 것이 좋다는 것은 명백하다.