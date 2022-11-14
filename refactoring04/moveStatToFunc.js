// 문장을 함수로 옮기기
// 중복 제거는 코드를 건강하게 관리하는 방법 중 하나이다.
// 중복된 코드를 공통으로 만든 후, 다시 여러 변형들로 나눠야 하는 순간이 오면, '문장을 호출한 곳으로 옮기기'로 다시 뽑을 수 있다.

// 절차
// 1. 반복 코드가 함수 호출 부분과 멀리 덜어져 있다면 '문장 슬라이드하기'를 적용해 근처로 옮긴다.
// 2. 타깃 함수를 호출하는 곳이 한 곳뿐이라면, 단순히 소스 위치에서 해당 코드를 잘라내어 피호출 함수로 복사하고 테스트한다.
//    이 경우라면 나머지 단계는 무시한다.
// 3. 호출자가 둘 이상이면 호출자 중 하나에서 '타깃 함수 호출 부분과 그 함수로 옮기는 문장들을 함께' 다른 함수로 추출한다.
//    추출한 함수에 기억하기 쉬운 임시 이름을 지어준다.
// 4. 다른 호출자 모두가 방금 추출한 함수를 사용하도록 수정한다. 하나씩 수정할 때마다 테스트.
// 5. 모든 호출자가 새로운 함수를 사용하게 되면 원래 함수를 새로운 함수 안으로 인라인한 후 원래 함수를 제거한다.
// 6. 새로운 함수의 이름을 원래 함수의 이름으로 바꿔준다.(함수 이름 바꾸기) -> 더 나은 이름이 있다면 그 이름을 사용

// ex
// function renderPerson(outStream, person) {
//   const result = [];
//   result.push(`<p>${person.name}</p>`);
//   result.push(renderPhoto(person.photo));
//   result.push(`<p>제목: ${person.photo.title}</p>`);
//   result.push(emitPhotoData(person.photo));
//   return result.join("/n");
// }
//
// function photoDiv(p) {
//   return [
//       "<div>",
//       `<p>제목: ${p.title}</p>`,
//       emitPhotoData(p),
//       "</div",
//   ].join("/n");
// }
//
// function emitPhotoData(aPhoto) {
//   const result = [];
//   result.push(`<p>위치: ${aPhoto.location}</p>`);
//   result.push(`<p>날짜: ${aPhoto.date.toDateString()}</p>`);
//   return result.join("/n");
// }

// 위 코드 수정

function renderPerson(outStream, person) {
  const result = [];
  result.push(`<p>${person.name}</p>`);
  result.push(renderPhoto(person.photo));
  // result.push(zznew(person.photo));
  result.push(emitPhotoData(person.photo));
  return result.join("/n");
}

function photoDiv(p) {
  return [
    "<div>",
    emitPhotoData(p),
    "</div>",
  ].join("/n");
}

function emitPhotoData(aPhoto) {
  return [
      `<p>제목: ${aPhoto.title}</p>`,
      `<p>위치: ${aPhoto.location}</p>`,
      `<p>날짜: ${aPhoto.date.toDateString()}</p>`
  ].join("/n");
}

// function emitPhotoData(aPhoto) {
//   const result = [];
//   result.push(`<p>위치: ${aPhoto.location}</p>`);
//   result.push(`<p>날짜: ${aPhoto.date.toDateString()}</p>`);
//   return result.join("/n");
// }

// 위 과정처럼 중복되는 문장들을 줄이고, 한 함수에 넣어 그것만을 호출하는 것이 리팩터링에 용이하다.
// 또한 위 과정에서 매개변수 이름이 규약과 맞지 않다면 적절히 수정하면 된다.