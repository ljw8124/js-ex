// 단계 쪼개기
// ex code
const orderData = orderSting.split(/\s+/);
const productPrice = priceList[orderData[0].split("-")[1]];
const orderPrice = parseInt(orderData[1]) * productPrice;

// 위 과정을 아래와 같이 리팩토링
const orderRecord = parseOrder(order);
const orderPrice = price(orderRecord, priceList);

function parseOrder(aString) {
    const values = aString.split(/\s+/);
    return({
        productID: values[0].split("-")[1],
        quantity: parseInt(values[1])
    });
}

function price(order, priceList) {
    return order.quantity * priceList[order.productID];
}

// 서로 다른 두 대상을 한꺼번에 다루는 코드는 각각 별개 모듈로 나누는 것이 좋다.
// 가장 간편한 분리 방법은 하나의 동작을 연이은 두 단계로 쪼개는 것이다.

// 코드 영역들을 별도 모듈로 분리하면 그 차이를 코드에서 훨씬 명확하게 드러낼 수 있다.

// 절차
// 1. 두 번째 단계에 해당하는 코드를 독립 함수로 추출한다.
// 2. 테스트한다.
// 3. 중간 데이터 구조를 만들어서 앞에서 추출한 함수의 인수로 추가한다.
// 4. 테스트한다.
// 5. 추출한 두 번째 단계 함수의 매개변수를 하나씩 검토한다. 그중 첫 번째 단계에서 사용되는 것은 중간 데이터 구조로 옮긴다.
//    하나씩 옮길 때 마다 테스트
// 6. 첫 번째 단계 코드를 함수로 추출하면서 중간 데이터 구조를 반환하도록 만든다.

function priceOrder(product, quantity, shippingMethod) {
    const basePrice = product.basePrice * quantity;
    const discount = Math.max(quantity - product.discountThreshold, 0)
        * product.basePrice * product.discountRate;
    const shippingPerCase = (basePrice > shippingMethod.discountThreshold) ?
        shippingMethod.discountedFee : shippingMethod.feePerCase;
    const shippingCost = quantity * shippingPerCase;
    const price = basePrice - discount + shippingCost;

    return price;
}
// 간단한 예지만, 계산이 두 단계로 이루어져서 복잡해 보인다.
// 독립적인 계산을 위해서 이 코드를 두 단계로 나누는 것이 좋다.

function priceOrder(product, quantity, shippingMethod) {
    const basePrice = product.basePrice * quantity;
    const discount = Math.max(quantity - product.discountThreshold, 0)
        * product.basePrice * product.discountRate;
    const price = applyShipping(basePrice, shippingMethod, quantity, discount);

    return price;
}

function applyShipping(basePrice, shippingMethod, quantity, discount) {
    const shippingPerCase = (baesPrice > shippingMethod.discountThreshold) ?
        shippingMethod.discountedFee : shippingMethod.feePerCase;
    const shippingCost = quantity * shippingPerCase;
    const price = basePrice - discount + shippingCost;

    return price;
}

///////////////////////////////////////////////////////////////////////////////////////////
// 그 다음 단계로는, 두 함수 사이에 주고받을 중간 데이터 구조를 만든다.

function priceOrder(product, quantity, shippingMethod) {
    const basePrice = product.basePrice * quantity;
    const discount = Math.max(quantity - product.discountThreshold, 0)
        * product.basePrice * product.discountRate;
    const priceData = {};
    const price = applyShipping(priceData, basePrice, shippingMethod, quantity, discount);

    return price;
}

function applyShipping(priceData, basePrice, shippingMethod, quantity, discount) {
    const shippingPerCase = (basePrice > shippingMethod.discountThreshold) ?
        shippingMethod.discountedFee : shippingMethod.feePerCase;
    const shippingCost = quantity * shippingPerCase;
    const price = basePrice - discount + shippingCost;

    return price;
}

///////////////////////////////////////////////////////////////////////////////////////////
// 그 다음으로 두 번째 단계에서 전달하는 매개변수를 priceData 객체 안에 속성 값으로 넣는다.


function priceOrder(product, quantity, shippingMethod) {
    const basePrice = product.basePrice * quantity;
    const discount = Math.max(quantity - product.discountThreshold, 0)
        * product.basePrice * product.discountRate;
    const priceData = {
        basePrice: basePrice,
        quantity: quantity,
        discount: discount
    };
    const price = applyShipping(priceData, shippingMethod);

    return price;
}

function applyShipping(priceData, shippingMethod) {
    const shippingPerCase = (priceData.basePrice > shippingMethod.discountThreshold) ?
        shippingMethod.discountedFee : shippingMethod.feePerCase;
    const shippingCost = priceData.quantity * shippingPerCase;
    const price = priceData.basePrice - priceData.discount + shippingCost;

    return price;
}

///////////////////////////////////////////////////////////////////////////////////////////
// 그 다음 첫 번째 단계 코드를 함수로 추출하고 이 데이터 구조를 반환하도록 한다.

function priceOrder(product, quantity, shippingMethod) {

    const priceData = calculatePricingData(product, quantity);
    return applyShipping(priceData, shippingMethod);

}

function calculatePricingData(product, quantity) {
    const basePrice = product.basePrice * quantity;
    const discount = Math.max(quantity - product.discountThreshold, 0)
        * product.basePrice * product.discountRate;
    return {
        basePrice: basePrice,
        quantity: quantity,
        discount: discount
    };
}

function applyShipping(priceData, shippingMethod) {
    const shippingPerCase = (priceData.basePrice > shippingMethod.discountThreshold) ?
        shippingMethod.discountedFee : shippingMethod.feePerCase;
    const shippingCost = priceData.quantity * shippingPerCase;
    return priceData.basePrice - priceData.discount + shippingCost;
}
