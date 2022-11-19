// 조건문 분해하기
// 조건문에서 문제가 되는 점은 조건을 검사하고 그 결과에 따른 동작을 표현한 코드가 무슨 일이 일어나는지는 설명하지만,
// 왜 일어나는지에 대해서는 설명하지 않기 때문이다.
// 장황한 코드를 분해하여 해체된 코드 덩어리들을 각 덩어리의 의도를 살린 함수 이름으로 바꾸자.
// 그러면 전체적인 코드 작성 의도가 드러나게 된다.

// 절차
// 1. 조건식과 그 조건식에 딸린 조건절 각각을 함수로 호출한다.

// ex
if(!aDate.isBefore(plan.summberStart) && !aDate.isAfter(paln.summerEnd)) {
  charge = quantity * plan.summberRate;
} else {
  charge = quantity * plan.regularRate + regularServiceCharge;
}

// 위 조건 부분(조건식)을 별도로 추출
function summer() {
  return !aDate.isBefore(plan.summberStart) && !aDate.isAfter(paln.summerEnd);
}

if(summer()) charge = quantity * plan.summberRate;
else charge = quantity * plan.regularRate + plan.regularServiceCharge;

// 그 후 계산식들도 따로 함수로 추춣한다.

function summerCharge() {
  return quantity * plan.summberRate;
}

function regularCharge() {
  return quantity * plan.regularRate + plan.regularServiceCharge;
}

if(summer()) charge = summerCharge();
else charge = regularCharge();

// 그 흐 삼항연산자로 변환 가능성도 있음
charge = summer() ? summerCharge() : regularCharge();