const users = [
  {
    id: 1,
    name: "김성용",
    age: 20,
    height: 190,
  },
  {
    id: 2,
    name: "이수박",
    age: 32,
    height: 185,
  },
  {
    id: 3,
    name: "오렌지",
    age: 20,
    height: 180,
  },
  {
    id: 4,
    name: "이멜론",
    age: 28,
    height: 175,
  },
];

/* 
CRUD 구현하기
배열의 고차함수
*/

/*
문제1. 유저 추가하기
  내가 추가하고자 하는 유저를 추가해야합니다
  단 id는 고유 번호로 반드시 순서대로일 필요는 없지만, 어떠한 경우에도 겹쳐서 안됩니다
*/
function createUser(user) {
  const idArr = [];
  users.forEach((u) => {
    idArr.push(u["id"]);
  });
  console.log(idArr);
  if (idArr.includes(user["id"])) return console.log("이미 존재하는 id입니다.");
  return users.push(user);
}

const newUser1 = { id: 4, name: "박수박", age: 20, height: 165 };
const newUser2 = { id: 5, name: "이수박", age: 25, height: 170 };

createUser(newUser1);
createUser(newUser2);
console.log(users);

/*
문제2. 유저 삭제하기
  내가 원하는 유저를 삭제할 수 있어야합니다.
  단, 동일한 유저의 이름이 있더라도 정확히 원하는 유저여야합니다.
*/
let newUsers;
function deleteUser(userId) {
  // 원본으로 만들기
  console.log(userId);
  console.log(users.findIndex((el) => el["id"] === userId));
  const index = users.findIndex((el) => el["id"] === userId);
  users.splice(index, 1);
  console.log(users);

  // 새로 생성하기
  newUsers = users.filter((user) => user["id"] !== userId);
  console.log(newUsers);
}

deleteUser(5);

/*
문제3. 유저 수정하기
  내가 수정하고자 하는 유저의 개인정보를 수정해야합니다.
*/
function updateUser(userId, editKey, editValue) {
  const index = users.findIndex((el) => el["id"] === userId);
  users[index][editKey] = editValue;
  console.log(users);
}

updateUser(2, "name", "박수박");
updateUser(3, "age", 25);

/*
문제4. 유저 조회하기
  위의 모든 상황이 적용된 결과를을 콘솔창에 띄울 것
  단 위의 수정 내용은 모두 적용된 상태여야 한다.
*/
console.log(users);

/*
문제5. 조회한 유저를 height별 오름 차순으로 정렬하여 조회하기
*/
users.sort((a, b) => {
  if (a.height > b.height) return 1;
  if (a.height < b.height) return -1;
  return 0;
});

console.log(users);
