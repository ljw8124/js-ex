// 반복문을 파이프라인으로 바꾸기
// 대부분의 프로그래머들이 객체 컬렉션을 순회할 때 반복문을 사용하려고 한다.
// 점점 더 나은 구조가 제공되면서 파이프라인이 등장했고, 일련의 연산으로 표현이 가능해졌다.
// 대표적인 메서드가 map 과 filter 이다.
// map 은 함수를 사용해 입력 컬렉션의 각 원소를 변환하고, filter 는 또 다른 함수를 사용해 입력 컬렉션을 필터링해 부분집합을 만든다.
// 논리를 파이프라인으로 표현하면 이해하기도 쉽고, 객체가 어떻게 처리되는지를 읽을 수 있게 된다.

// 절차
// 1. 반복문에서 사용하는 컬렉션을 가리키는 변수를 하나 만든다.(기존 변수를 단순히 복사해도 된다.)
// 2. 반복문의 첫 줄부터 시작해서, 각각의 단위 행위를 적절한 컬렉션 파이프라인 연산으로 대체한다. 이 때 컬렉션 파이프라인 연산은
//    1에서 만든 반복문 컬렉션 변수에서 시작하여, 이전 연산의 결과를 기초로 연쇄적으로 수행된다. 하나를 대체할 때마다 테스트한다.
// 3. 반복문의 모든 동작을 대체한다면 반복문 자체를 지운다. (반복문이 결과를 누적 변수에 대입했다면 파이프라인의 결과를 그 누적 변수에 대입한다.)

function acquireData(input) {
  const lines = input.split("\n");  // 컬렉션
  let firstLine = true;
  const result = [];
  for(const line of lines) {        // 반복문
    if(firstLine) {
      firstLine = false;
      continue;
    }
    if(line.trim() === "") continue;
    const record = line.split(",");
    if(record[1].trim() === "India") {
      result.push({city: record[0].trim(), phone: record[2].trim()});
    }
  }
  return result;
}

// 파이프라인으로 변경
function acquireData(input) {
  const lines = input.split("\n");  // 컬렉션
  // let firstLine = true;
  const result = [];
  const loopItems = lines.slice(1);
  for(const line of lines) {        // 반복문
    // if(firstLine) {              // 여기서 if 는 처음 라인을 실행시키지 않는 것이다.
    //   firstLine = false;
    //   continue;
    // }
    if(line.trim() === "") continue;
    const record = line.split(",");
    if(record[1].trim() === "India") {
      result.push({city: record[0].trim(), phone: record[2].trim()});
    }
  }
  return result;
}

// 위 코드를 깔끔하게 변경
function acquireDataPipe(input) {
  const lines = input.split("/n");
  // const result = [];
  const result = lines
      .slice(1)
      .filter(line => line.trim() !== "")
      .map(line => line.split(","))
      .filter(record => record[1].trim() === "India")
      .map(record => ({city: record[0].trim(), phone: record[2].trim()}));

  // for(const line of loopItems) {
  //   const record = line;
    // if(record[1].trim() === "india") {
    // result.push({city: record[0].trim(), phone: record[2].trim()});
    // }
  // }
  return result;
}
