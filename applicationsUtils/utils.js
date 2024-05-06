const rollingView = () => {
    
    const targetView = this.rollingView;
    
    const itemHeight = targetView.getFirstItem().scrollHeight;	// 높이가 일괄적이라고 가정할 때
    const items = targetView.getItems();
    const itemCount = items.length;
    
    const itemParentEle = items[0].parentElement;
    
    let idx = 0;
    const rollingSpeed = 400;
    
    // 스파이더젠 내장함수 포함코드
    const interval = setInterval(function() {
        
        itemParentEle.style.transitionDuration = rollingSpeed + 'ms';
        itemParentEle.style.marginTop = -1 * itemHeight + 'px';
        
        setTimeout(function() {
            itemParentEle.removeAttribute('style');
            itemParentEle.appendChild(itemParentEle.firstElementChild);
            
        }, rollingSpeed);
        
        idx++;
        
        idx %= itemCount;
        
    }, 1000);
}

// 숫자 3자리 수마다 콤마추가 정규식(금액 input)
Utils.onlyNumberWithComma = function(str) {

	if(!str) {
		console.log('onlyNumberWithComma error => 전달된 값이 존재하지 않습니다.');
		return 0;
	}
	
	if(typeof str !== 'string') str += '';
	
	return str.replace(/[^\d]+/g, '').replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
};

// 오른쪽 클릭 인식 이벤트
function addRightClickEvt() {
	this.startBtn.element.addEventListener('mousedown', (e) => {
		e = e || window.event;
		console.log('default', e.which);	// 3
		console.log('opera, IE',e.button);	// 2
		
	});

	// 오른쪽 클릭시 디폴트 이벤트 중지
	this.startBtn.element.addEventListener('contextmenu', function(e) {
		e.preventDefault();
	});
	
}


// duck typing
// 동적 타이핑의 한 종류로, 객체의 변수 및 메소드의 집합이 객체의 타입을 결정하는 것을 말함.
// 클래스 상속이나 인터페이스 구현으로 타입을 구분하는 대신,
// 덕 타이핑은 객체가 어떤 타입에 걸 맞은 변수와 메소드를 지니면 객체를 해당 타입에 속하는 것으로 간주
// 아래는 덕 타이핑 의사코드
const calculate = (a, b, c) => { return (a + b) * c };

const a = calculate(1, 2, 3);
const b = calculate([1, 2, 3], [4, 5, 6], 2);
const c = calculate('apples', 'and oranged ', 3);

// 주로 파이썬에서 사용함
