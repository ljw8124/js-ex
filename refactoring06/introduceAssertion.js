// 어서션 추가하기
// 특정 조건이 참 일때만 작동하는 코드 영역이 있다.
// 이 때 어서션을 이용하면 코드에 주석을 추가하지 않아도 직관적으로 알 수 있다.

// 절차
// 1. 참이라고 가정하는 조건이 보이면 그 조건을 명시하는 어서션을 추가한다.
// 어서션은 시스템 운영에 영향을 주면 안되므로, 추가한다고 해서 동작이 달라지지 않는다.

if(this.discountRate) {
  base = base - (this.discountRate * base);
}

// 아래로 변경
assert(this.discountRate >= 0);
if(this.discountRate) {
  base = base - (this.discountRate * base);
}

// 어서션은 오류의 출처를 특정하기 어려울 떄 특히 제값을 한다.
// 어서션을 남발하는 것 역시 좋지 않다. 어서션은 '반드시 참이어야 하는' 것만 검사하는 것이 좋다.
