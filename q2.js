const users = [
  {
    id: 1,
    name: '김성용',
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

/* 
CRUD 구현하기
배열의 고차함수

문제1. 유저 추가하기
  내가 추가하고자 하는 유저를 추가해야합니다
  단 id는 고유 번호로 반드시 순서대로일 필요는 없지만, 어떠한 경우에도 겹쳐서 안됩니다

문제2. 유저 삭제하기
  내가 원하는 유저를 삭제할 수 있어야합니다.
  단, 동일한 유저의 이름이 있더라도 정확히 원하는 유저여야합니다.

문제3. 유저 수정하기
  내가 수정하고자 하는 유저의 개인정보를 수정해야합니다.

문제4. 유저 조회하기
  위의 모든 상황이 적용된 결과를을 콘솔창에 띄울 것
  단 위의 수정 내용은 모두 적용된 상태여야 한다.

문제5. 조회한 유저를 height별 오름 차순으로 정렬하여 조회하기
*/

// 문제1
let user = {
  id:5,
  name:"윤도은",
  age:19,
  height:175,
}

users.push(user);
console.log(users)

// 문제2

// 25세 이하인 사람만 반환

const Filter = users.filter((el)=> {
  return el.age <= 25;
})
console.log(Filter);

// 문제3
// id가 4인 유저 이름을 윤승빈으로 변경

Filter.forEach((el)=>{
  if(el.id===3){
    return el.name = "윤승빈";
  }
})

// 문제4
for(let n of Filter){
  console.log(`유저 조회 : ${n.name}`);
}

// 문제5
let UserHeight = [];
Filter.forEach((el)=>{
   UserHeight.push(el.height);
})
UserHeight.sort((a,b)=>a-b);
