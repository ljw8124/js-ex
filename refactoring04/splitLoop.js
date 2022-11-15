// 반복문 쪼개기
// 종종 반복문 한 개에서 두 가지 일을 수행하는 경우가 있는데, 이 때 수정을 하게되면 두 일 모두 다 수정해야 한다.
// 반복문을 분리하면 사용면에서도 편리하다.

// 절차
// 1. 반복문을 복제해 두 개로 만든다.
// 2. 반복문이 중복되어 생기는 부수효과를 파악해서 제거한다.
// 3. 테스트한다.
// 4. 완료됐으면, 각 반복문을 함수로 추출할지 고민해본다.

function getSalary(people) {
  let youngest = people[0] ? people[0].age : Infinity;
  let totalSalary = 0;
  for (const p of people) {
    if (p.age < youngest) youngest = p.age;
    totalSalary += p.salary;
  }
  return `최연소: ${youngest}, 총 급여: ${totalSalary}`;
}

// 위 함수에서 간단한 반복문이지만 전혀 상관없는 두 가지 일을 하고있다.
// 따라서 같은 반복문으로 나누었다.
function getSalary(people) {
  let totalSalary = 0;
  for (const p of people) {
    // if (p.age < youngest) youngest = p.age;
    totalSalary += p.salary;
  }
  let youngest = people[0] ? people[0].age : Infinity;
  for (const p of people) {
    if (p.age < youngest) youngest = p.age;
    // totalSalary += p.salary;
  }
  return `최연소: ${youngest}, 총 급여: ${totalSalary}`;
}

// 그 다음 각 반복문을 함수로 추출한다.
function getSalaryAge(people) {

  function totalSalary() {
    let totalSalary = 0;
    for (const p of people) {
      totalSalary += p.salary;
    }
    return totalSalary;
  }
  function youngestAge() {
    let youngest = people[0] ? people[0].age : Infinity;
    for (const p of people) {
      if (p.age < youngest) youngest = p.age;
    }
    return youngest;
  }
  return `최연소: ${youngestAge()}, 총 급여: ${totalSalary()}`;
}

// 그 후 파이프라인으로 교체한다.
function getSalaryAge(people) {

  function totalSalary() {
    return people.reduce((total, p) => total + p.salary, 0);
  }
  function youngestAge() {
    return Math.min(...people.map(p => p.age));
  }
  return `최연소: ${youngestAge()}, 총 급여: ${totalSalary()}`;
}