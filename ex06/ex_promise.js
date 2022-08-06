//프라미스 만들기
const getPeople = count =>
    new Promise((resolves, rejects) => {
      const api = `https://api.randomuse.me/?nat=US&results=${count}`;
      const request = new XMLHttpRequest();
      request.open("GET", api);
      request.onload = () =>
          request.status === 200
              ? resolves(JSON.parse(request.response).result)
              :rejects(Error(request.statusText));
      request.onerror = err => rejects(err);
      request.send();
    });

//회원수 전달 then을 이용하여 멤버가 정상적이라면 다음 호출할 console을 정의
//catch를 이용하여 예외상황 발생시 출력할 메시지를 console로 정의
getPeople(5).then(members => console.log(members))
  .catch(error => console.error(error.message));