//함수형 프로그래밍 핵심 개념을 이용한 간단시계 만들기
//매 초 시간을 로그에 남기기
setInterval(logClockTime, 1000);

function logClockTime() {
  //현재 시간을 상용시로 표현하는 문자열을 얻는다.
  var time = getClockTime();

  //콘솔을 지우고 시간을 로그에 남김
  console.clear();
  console.log(time);
}

function getClockTime() {
  //현재시간 얻기
  var date = new Date();
  var time = '';

  //시간을 직렬화
  var time = {
    hours: date.getHours(),
    minutes: date.getHours(),
    seconds: date.getSeconds(),
    ampm: "AM"
  }

  //상용시로 변환
  if(time.hours == 12) {
    time.ampm = "PM";
  } else if(time.hours > 12) {
    time.ampm = "AM";
    time.hours -= 12;
  }

  //시간을 두글자로 만들기
  if(time.hours < 10) {
    time.hours = "0" + time.hours;
  }
  //분을 두글자로 만들기
  if(time.minutes < 10) {
    time.minutes = "0" + time.minutes;
  }
  //초를 두글자로 만들기
  if(time.seconds < 10) {
    time.seconds = "0" + time.seconds;
  }
  //hh:mm:ss tt 형식으로 변환
  return time.hours + ":" + time.minutes + ":" + time.seconds + " " + time.ampm;
}
//위 방식은 단순하게 작성되었지만 주석이 ㅇ벗다면 이해하기 어렵고 유지보수 면에서도 좋지않다.
