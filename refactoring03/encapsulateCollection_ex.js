// 컬렉션 캡슐화하기
// 가변데이터를 모두 캡슐화하는 방법은 데이터 구조가 언제 어떻게 수정되는지 파악하기 쉽다.
// 이 때 컬렉션 변수로의 접근을 캡슐화하면서 게터가 컬렉션 자체를 반환하도록 한다면,
// 그 컬렉션을 감싼 클래스가 눈치채지 못하게 컬렉션의 원소들을 변경시킬 수도 있다.

// 그렇기 때문에 따로 메서드를 추가하여 컬렉션을 소유한 클래스의 메서드를 통해서만 원소를 변경하도록 수정해야 한다.

// 절차
// 1. 아직 컬렉셜을 캡슐화하지 않았다면 변수 캡슐화하기를 한다
// 2. 컬렉션에 원소를 추가/제거하는 함수를 추가한다.
// 3. 정적 검사를 수행한다.
// 4. 컬렉션을 참조하는 부분을 찾고, 변경자를 호출하는 코드가 모두 앞에서 추가한 추가/제거 함수를 호출하도록 수정한다. 수정할 떄마다 테스트한다.
// 5. 컬렉션 게터를 수정해서 원본 내용을 수정 할 수 없는 읽기전용 프락시나 복제본을 반환하게 한다.
// 6. 테스트한다.

//
// class Person {
//   constructor(name) {
//     this._name = name;
//     this._courses = [];
//   }
//   get name() { return this._name; }
//   get courses() { return this._courses; }
//   set courses(aList) { this._courses = aList; }
// }

class Couser {
  constructor(name, isAdvanced) {
    this._name = name;
    this._isAdvanced = isAdvanced;
  }
  get name() { return this._name; }
  get isAdvanced() { return this._isAdvanced; }
}

// 위의 캡슐화는 캡슐화처럼 보이지만, 과정만 캡슐화했을 뿐 세터를 이용해 수업 컬렉션을 마음대로 수정할 수가 있게된다.
// 그렇게되면 클라이언트는 직접 수정하는 것이 더 용이하게 느껴질 수 있다.

// 제대로된 캡슐화를 위해서 클라이언트가 수업을 하나씩 추가하고 제거하는 메서드를 Person 에 추가한다.

// class Person {
//   constructor(name) {
//     this._name = name;
//     this._courses = [];
//   }
//   get name() { return this._name; }
//   get courses() { return this._courses; }
//   set courses(aList) { this._courses = aList; }
//
//   addCourses(aCourse) {
//     this._courses.push(aCourse);
//   }
//   removeCourse(aCourse, fnIfAbsent = () => {throw new RangeError(); }) {
//     const index = this._courses.indexOf(aCourse);
//     if(index === -1) fnIfAbsent();  // 예외처리 위해서 작성
//     else this._courses.splice(index, 1);
//   }
// }

// 이런식으로 작성하면 클라이언트에서 set 을 이용하여 값을 가져온다음에 재 수정하는 상황이 없어지고,
// 클래스 내의 메서드만 호출하고 수정 또는 삭제할 데이터를 넘김으로서 캡슐화할 수 있게된다.

// 그 후 set courses() 의 동작 방식을 수정하고 컬렉션의 복제본을 필드에 저장하도록 한다.
// 이 때 slice()는 얕은 복사를 하여 반환한다. 원본 배열은 바뀌지 않음.

class Person {
  constructor(name) {
    this._name = name;
    this._courses = [];
  }
  get name() { return this._name; }
  get courses() { return this._courses.slice(); }         // 원본 배열을 가져온 후 수정하여, 원본이 손상되는 것을 막기위해 slice 사용
  set courses(aList) { this._courses = aList.slice(); }   // 원본 배열을 가져온 후 수정하여, 원본이 손상되는 것을 막기위해 slice 사용

  addCourses(aCourse) {
    this._courses.push(aCourse);
  }
  removeCourse(aCourse, fnIfAbsent = () => {throw new RangeError(); }) {
    const index = this._courses.indexOf(aCourse);
    if(index === -1) fnIfAbsent();  // 예외처리 위해서 작성
    else this._courses.splice(index, 1);
  }
}