const user = {
  name: '김성용',
  age: 20,
  height: 190,
};

// 문제1. 위의 객체를 아래의 메소드를 이용하여 반환 값을 출력 하고 각 메소드의 기능을 정의할 것

/* 
(1) user[”key”], user.key
(2) Object.keys()
(3) Object.values()
(4) Object.entries()
(5) for in
*/
console.log(user["name"], user.age)
// 결과값 : 김성용, 20
// 기능 : 객체의 key 제목에 접근하여 key의 값을 가져옴
console.log(Object.keys(user))
// 결과값 : ['name', 'age', 'height']
// 기능 : 객체를 배열로 변환해주는 메소드로 key 전체 제목을 불러옴 
console.log(Object.values(user))
// 결과값 : ['김성용', 20, 190]
// 기능 : 객체를 배열로 변환해주는 메소드로 key의 전체 값을 불러옴
console.log(Object.entries(user))
// 결과값 : [['name', '김성용'], ['age', 20], ['height', 190]]
// 기능 : 객체를 배열로 변환해주는 메소드로 각 각의 key를 배열로 가져옴 [[key제목, key값], [key제목, key값]...[]]
for(let arr in user){
  console.log(`${arr}은 ${user[arr]} 입니다`);
  // 결과값 : name은 김성용 입니다, age은 20입니다, height은 190입니다
  // 기능 : 객체를 전체 순회하며 변수에 key 제목에 접근한다. 또한, 객체[변수]로 동적으로 name에 접근해 index처럼 사용 가능하다.
}

// 문제2. 값이 “김성용”인 속성의 key 찾기
//let keyTarget;
for(let arrKey in user){
  if(user[arrKey] === '김성용') keyTarget = user[arrKey]
  console.log(arrKey)
  break;
}
console.log(keyTarget)

// 문제3. 깊은 복사를 통해 user 객체의 복사본을 만든 후 name을 본인의 이름으로 수정
let user2 = {...user}
user2.name = '라떼'
console.log(user2)