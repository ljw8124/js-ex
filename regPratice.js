//특수문자 점검 정규식
const checkSpecialChar = (checkChar) => {
  let reg = /[^\w\sㄱ-힣()0-9 ]/g;
  reg.test(checkChar);
}

// 3자리마다 comma 정규식
const addCommaReg = (regText/*숫자문자열*/) => {
  const str = '숫자문자열'
  str.replace(/[^\d]+/g, '').replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
};

