/*
refresh 를 위한 JS 이론 정리

가장 기본적인 데이터 타입은 숫자(number) 와 문자(text) 이다.
나머지는 다 이 두 가지 타입에서 파생된 타입이라고 할 수 있다.

const 는 constant 말그대로 변하지 않는 상수를 의미한다.

변수 네이밍 룰 -> JS 의 경우에는 myName 같은 식으로 작성한다.
              파이썬에서는 my_name 이런식으로 작성한다.

let 은 재할당해도 되는 변수를 사용할 때 정의한다.

즉, 코딩을 하다가 변수의 값을 변환해야할 때는 let 으로 선언하고,
값이 변하지 않기를 원한다면 const 를 이용하여 선언한다.

JS 에서는 const 를 사용하는 것이 일반적이고, 값을 바꿔야하는 특수한 경우에만 let 을 사용한다.
var 는 재할당, 재선언도 가능하나, ES6 전의 변수 선언 방식이다. -> 변수가 보호받지 못함

프로그래밍 언어상에서 true 는 1, false 는 0 으로 처리한다.
하지만 리눅스에서는 종료 상태 값을 0 이면 true, 1이면 false 로 처리한다.

null 은 값이 존재하지 않는다는 것을 의미한다. null !== false
undefined 는 데이터 타입과 비슷한데, 변수가 선언만 되고 값이 정의되지 않았을 때를 말한다.

Object 에 접근하는 방법.
=> Object.property & Object[property]
Object 를 const 로 선언하여도, Object 안에 값을 변경하는 것은 가능하다.

function 은 반복해서 사용하는 코드 조각이다. => 모듈화를 위해서는 필수라고 할 수 있.
argument 를 이용하여 function 안에 인자를 넘길 수 있다.

그리고 함수는 Object 에 property 로 넣을 수도 있다.

함수 표현식은 함수 선언과 매우 비슷하지만, 호이스팅이 되지 않아서 코드 내에 나타나기 전에 먼저 사용할 수 없다.

함수에서 연산한 값을 전달받고 싶을 때는 return 을 사용한다

특히 리액트에서 사용하는 JS 는 함수형 프로그래밍이다.
JS 에서는 함수가 1급 시민이기 때문에 JS 는 함수형 프로그래밍을 지원한다고 할 수 있다.
최근에는 이 기능을 더 풍부하게 해주는 화살표 함수, 프라미스, 스프레드 연산자 등이 추가되었다.

함수가 함수를 인자로 받는 경우와 함수가 함수를 반환하는 경우를 고차함수라고 부른다.
ex.
const createScream = logger => message => {
  logger(message.toUpperCase() + "!!!");
};

선언전 프로그래밍과 함수형 프로그래밍
1. 선언전 프로그래밍
  선언전 프로그래밍은 필요한 것을 달성하는 과정을 하나하나 기술하는 것보다 필요한 것이 어떤 것인지르 기술하는 것에
  더 방점을 두고 애플리케이션의 구조를 세워나가는 프로그래밍 구조이다.

  즉, 선언전 프로그래밍의 코드 구문은 어떤 일이 발생해야 하는지에 대해 기술하고,
  실제로 그 작업을 처리하는 방법은 추상화를 통해 아랫단에 감춰진다.

  그렇기 때문에 선언적 접근 방식이 더 읽기 쉽고, 추론하기도 쉽다.
  그리고, 리액트는 선언적이다.

2. 명령형 프로그래밍
  명령형 프로그래밍은 코드로 원하는 겨로가르 달성해 나가는 과정에만 관심을 두는 프로그래밍 스타일이다.

DOM 이란 문서 객체 모델(Document Object Model)이고, HTML, XML 문서의 프로그래밍 interface 이다.
DOM 은 문서의 구조화된 표현을 제공하며, 프로그래밍 언어가 DOM 구조에 접근할 수 있는 방법을 제공한다.

DOM 은 웹 페이지의 객체 지향 표현이며, JS 와 같은 스크립팅 언어를 이용해 DOM 을 수정할 수 있다.
DOM 을 표현하는 기준은 W3C, WHATWG 을 통해서 볼 수 있다.

JS 에서 DOM 은 문서와 문서의 요소를 JS 으로 접근하기 위해서 사용되었다.

함수형 프로그래밍의 개념
1. 불변성(immutable)
  애플리케이션에서 불변성 데이터가 작동하는 방식은, 원본 데이터 구조를 변경하는 하는 것이 아니라
  그 데이터 구조의 복사본을 만들되 그 중 일부를 변경하는 것이다.
  그리고 원본 대신 변경한 복사본을 사용해 필요한 작업을 진행한다.
  -> 보통 이 상황에서는 Object.assign() 을 이용하여 복사하여 복사한 객체를 변경한다.

2. 순수성/순수함수(Pure Function)
  순수 함수는 파라미터에 의해서만 반환값이 결정되는 함수를 말한다.
  순수 함수는 최소한 하나 이상의 인수를 받고, 인자가 같으면 항상 같은 값이나 함수를 반환한다.
  순수 함수는 부수 효과가 없다. 부수 효과란 전역 변수를 설정하거나, 함수 내부나 애플리케이션에 있는 다른 상태를 변경하는 것을 말한다.
  순수 함수는 인수를 변경 불가능한 데이터로 취급한다.

  순수 함수의 활용은 애플리케이션의 상태에 영향을 미치지 않기 때문에 코딩이 편해진다.
  함수를 사용할 때 다음 세 가지 규칙을 따르면 순수 함수를 만들 수 있다.
    * 순수 함수는 파라미터를 최소 하나 이상 받아야한다.
    * 순수 함수는 값이나 다른 함수를 반환해야 한다.
    * 순수 함수는 인자나 함수 밖에 있는 다른 변수를 변경하거나, 입출력을 수행해서는 안된다.

3. 데이터 변환
  함수형 프로그래밍은 한 데이터를 다른 데이터로 변환하는 것이 전부이다.
  함수형 프로그래밍은 함수를 사용하여 원본을 변경한 복사본을 만들고, 순수 함수를 이용하여 코드를 더 간소화시킨다.

  함수형 프로그래밍을 유창하게 사용하기 위한 핵심 함수는 Array.map() 과 Array.reduce() 이다.

4. 고차 함수
  고차 함수는 다른 함수를 조작할 수 있는 함수이다. 즉, 고차 함수는 다른 함수를 인자로 받거나, 함수를 반환하고
  때로는 위 두 가지를 모두 수행한다.(ex. Array.map(), Array.filter(), Array.reduce())
  다른 함수를 반환하는 고차 함수는 JS 에서 비동기적인 실행 맥락을 처리할 때 유용하다.
  함수를 반환하는 고차 함수를 쓰면 필요시에 재활용이 가능해지기 때문이다.

  그 중 '커링' 이라는 기법이 있는데, 이는 어떤 연산을 수행할 때 필요한 값 중 일부를 저장하고,
  나중에 나머지 값을 전달받는 기법이다. 이를 위해 다른 함수를 반환하는 함수를 사용하며, 이를 커링된 함수라고 한다.

5. 재귀
  재귀는 자기 자신을 호출하는 함수를 만드는 기법이다. 루프를 모두 재귀로 바꿀수도 있다.
  일부 루프는 재귀로 표현하는 쪽이 쉽다.
  재귀는 비동기 프로세스에서도 잘 작동하는 또 다른 함수형 기법이다. 함수는 필요할 때 자기 자신을 호출할 수 있다. -> 즉 자기 자신을 호출함으로써 재귀로 구현(반복문처럼 사용가능)

  데이터 구조를 검색할 때도 재귀가 유용하다.

6. 합성
  함수형 프로그램은 로직을 구체적인 작업을 담당하는 여러 작은 순수 함수로 나눈다.
  그 과정에서 언젠가는 모든 작은 함수를 합쳐야 할 필요가 있다.
  자세히 말하자면, 각 함수를 서로 연쇄적으로 또는 병렬로 호출하거나 여러작은 함수를 조합해서
  더 큰 함수로 만드는 과정을 반복해서 전체 애플리케이션을 구축해야 한다.

  가장 흔한 기법은 연쇄 체이닝 기법이다. JS 에서는 점을 사용하면 이전 함수의 반환 값에 대해 다음 함수(메서드)를 적용할 수 있다.


 */
