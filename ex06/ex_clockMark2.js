//함수형 프로그램을 이용한 시계 만들기
//콘솔관리, 시간관리 하는 함수
const oneSecond = () => 1000;
const getCurrentTime = () => new Date();
const clear = () => console.clear();
const log = message => console.log(message);

//데이터 변환 함수
const abstractClockTime = date => ({
  hours: date.getHours(),
  minutes: date.getMinutes(),
  seconds: date.getSeconds()
});

const civilianHours = clockTime => ({
  ...clockTime,
  hours: clockTime.hours > 12 ? clockTime.hours -12 : clockTime.hours
});

const appendAMPM = clockTime => ({
  ...clockTime,
  ampm: clockTime.hours > 12 ? "PM" : "AM"
});

const display = target => time => console.log(time);

const formatClock = format => time =>
    format.replace("hh", time.hours)
      .replace("mm", time.minutes)
      .replace("ss", time.seconds)
      .replace("tt", time.ampm)

const prependZero = key => clockTime => ({
  ...clockTime,
  [key]: (clockTime[key] < 10) ? "0" + clockTime[key] : clockTime[key]
});

const compose = (...fns) => (arg) =>
    fns.reduce((compose, f) => f(compose), arg);

const convertToCivilianTime = clockTime =>
    compose(
        appendAMPM,
        civilianHours
    )(clockTime);

const doubleDigits = civilianTime =>
    compose(
        prependZero("hours"),
        prependZero("minutes"),
        prependZero("seconds")
    )(civilianTime);

const startTicking = () =>
    setInterval(
        compose(
            clear,
            getCurrentTime,
            abstractClockTime,
            convertToCivilianTime,
            doubleDigits,
            formatClock("hh:mm:ss tt"),
            display(log)
        ),
        oneSecond()
    );

startTicking();

//이런 방식은 쉽게 단위테스트가 가능하고 버그가 나더라도 전역변수가 없기 때문에 해당 함수에서
//디버깅 할 수가 있다.