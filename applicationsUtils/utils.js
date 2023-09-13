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
