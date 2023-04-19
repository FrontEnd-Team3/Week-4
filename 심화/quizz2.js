/* 
문제 2

1. 
당신은 3가지 비동기 요청에 대하여 이 3가지 요청이 모두 실행되고 나서
console.log로 (정상적으로 실행되었습니다)라는 콘솔로그를 보여주려고 한다.



각각의 비동기 요청은
console.log("비동기 요청 1")
console.log("비동기 요청 2")
console.log("비동기 요청 3")
를 결과값으로 출력한다
*/

/*
2. 결과
[콘솔창]
      ... 비동기 요청

      1. case: success(fullfield)
      "비동기 요청 1"
      "비동기 요청 2"
      "비동기 요청 3"
      "정상적으로 실행되었습니다"

      2. case errer(rejected)
      "결과값을 가지고 오는데 실패하였습니다"


3. 조건
기초. 반복문 (for)을 사용하지말 것, resolve, reject의 반환 값으로 전달하는 데이터의 제한은 없다.
기초. 모든 요청 중 단 하나의 요청이라도 실패하면 "결과값을 가지고 오는데 실패하였습니다"를 출력 할 것 >> promise.all
*/

// ⭐ async/await 사용하기
const asyncTimer = (num) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (num) return resolve(console.log(`비동기 요청 ${num}`));
      reject("결과값을 가지고 오는데 실패하였습니다.");
    }, 1500);
  });

async function run() {
  try {
    await asyncTimer(1);
    await asyncTimer(2);
    await asyncTimer(3);
    console.log("정상적으로 실행되었습니다.");
  } catch (errMessage) {
    console.log(errMessage);
  }
}

// run();

/*
심화. 
      모든 요청 중 일부가 실패했다면 나머지 비동기 요청에 대해서는 정상적으로 console.log를 실행할 것
      만약 실패하였다면 어느 요청이 실패하였는지 consoe.log로 출력할 것
      (실패하더라도 바로 끝나지 않고 이어지게 하기) then catch then catch ...

            ex) "비동기 요청 2 호출 실패"

      모든 요청에 대하여 일부요청이 실패하고 나머지는 정상적으로 작동되었기 때문에
      결과 값으로는 반드시 "정상적으로 실행되었습니다"가 출력되어야한다
      그러나, 3가지 요청이 모두 실패했을 때는 "결과값을 가지고 오는데 실패하였습니다"가 출력되어야한다.
*/

let count = 0;

const asyncTimer_심화 = (num) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (num) {
        count++;
        return resolve(console.log(`비동기 요청 ${num}`));
      }
      reject("호출 실패");
    }, 1500);
  });

async function run_심화() {
  // 하나라도 성공했을 경우

  // 비동기 요청 1
  try {
    await asyncTimer_심화(1);
  } catch (err) {
    console.log("비동기 요청 1", err);
  }
  try {
    await asyncTimer_심화();
  } catch (err) {
    console.log("비동기 요청 2", err);
  }
  try {
    await asyncTimer_심화();
  } catch (err) {
    console.log("비동기 요청 3", err);
  }

  if (count === 0) return console.log("결과값을 가지고 오는데 실패하였습니다.");
  return console.log("정상적으로 실행되었습니다.");
}

run_심화();
// 3가지 요청이 모두 실패했을 경우
