// 제어 플래그를 탈출문으로 바꾸기
// 제어 플래그란 코드의 동작을 변경하는데 사용되는 변수이다.

// 절차
// 1. 제어 플래그를 사용하는 코드를 함수로 추출할지 고려한다.
// 2. 제어 플래그를 갱신하는 코드 각각을 적절한 제어문으로 바꾼다. 하나 바꿀 때마다 테스트한다.
// 3. 모두 수정했다면 제어 플래그를 제거한다.

let found = false;
for(const p of people) {
  if(!found) {
    if(p === "조커") {
      sendAlert();
      found = true;
    }
    if(p === "사루만") {
      sendAlert();
      found = true;
    }
  }
}

// 위 코드에서 제어 플래그는 found 이다.
// 이제 함수 추출하기를 이용하여 관련된 코드를 따로 떼어 사

// checkForMiscreants(people);

function checkForMiscreants(people) {
  let found = false;
  for(const p of people) {
    if(!found) {
      if(p === "조커") {
        sendAlert();
        found = true;
      }
      if(p === "사루만") {
        sendAlert();
        found = true;
      }
    }
  }
}

// 그 후에 found 재할당 부분을 return 으로 변경
// 그 후 제어 플래그 참조 코드 모두 수정

function checkForMiscreants(people) {
  // let found = false;
  for(const p of people) {
    // if(!found) {
      if(p === "조커") {
        sendAlert();
        return;
      }
      if(p === "사루만") {
        sendAlert();
        return;
      }
    }
  // }
}
