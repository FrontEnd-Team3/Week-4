/* 
유저 목록 순서대로 보여주기
다음 버튼을 누르면 다음 유저가 보여져야합니다. 단, 마지막 유저일 시 다음은 다시 첫번째 유저가 되어야합니다.
이전 버튼을 누르면 이전 유저가 보여져야합니다. 단, 첫번째 유저일 시 이전은 마지막 유저가 되어야합니다.

또한 DOM API와 배열을 다뤄야할 때 인덱스가 필요한 시점이나 상황이 언제일지 고민해보세요 :)

1. users 배열의 index를 담기 위해 전역변수 index = 0 선언 (초기값 설정)
2. users[0]을 users[index]로 변경
3. next버튼 클릭 시, users 인덱스 +1 해주고
  prev 버튼 클릭 시, 인덱스 -1
4. 마지막 유저 인덱스가 인덱스의 length와 같거나 크다면, next 버튼 클릭 시 0번째 인덱스로 이동
5. 첫번째 유저 인덱스가 0보다 작다면, prev 버튼 클릭 시 length-1번째 인덱스로 이동

*/


const users = [
  {
    id: 1,
    name: '김사과',
    age: 20,
    height: 190,
  },
  {
    id: 2,
    name: '이수박',
    age: 32,
    height: 185,
  },
  {
    id: 3,
    name: '오렌지',
    age: 20,
    height: 180,
  },
  {
    id: 4,
    name: '이멜론',
    age: 28,
    height: 175,
  },
];

const $info = document.querySelector('#info');
const $prevBtn = document.querySelectorAll('button')[0];
const $nextBtn = document.querySelectorAll('button')[1];
let infoIdx = 0;

function infoList(){
  $info.innerHTML = `
    <div>${users[infoIdx].name}</div>
    <div>${users[infoIdx].age}</div>
    <div>${users[infoIdx].height}</div>
  `;
  console.log(infoIdx)
}
infoList()


$prevBtn.addEventListener('click', ()=>{
  infoIdx--;
  if(infoIdx < 0){
    infoIdx = users.length-1;
  } 
  infoList()
})

$nextBtn.addEventListener('click', ()=>{
  infoIdx++;
  if(infoIdx >= users.length){
    infoIdx = 0;
  } 
  infoList()
})