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

// (1)
console.log(user["age"]); // user에 age에 접근 (20)
console.log(user.name); // user에 name에 접근 (김성용)

// (2)
console.log(Object.keys(user)); // Object.keys -> user의 키값에 접근해서 반환  출력 : [ 'name', 'age', 'height' ]

// (3)
console.log(Object.values(user)); // Object.values -> user의 프로포티 값에 접근해서 반환   출력 : [ '김성용', 20, 190 ] 

// (4)
console.log(Object.entries(user)) // Object.entries -> user의 프로포티 반환   출력 : [ [ 'name', '김성용' ], [ 'age', 20 ], [ 'height', 190 ] ]

// (5)
for(let key in user){ // for in  user의 모든 키값에 접근 Object.keys와 다른점은 배열로 반환안함
  console.log(key);
}


// 문제2. 값이 “김성용”인 속성의 key 찾기

for(let key in user){
  if(user[key]=== "김성용"){
    console.log(key);
  }
}

// 문제3. 깊은 복사를 통해 user 객체의 복사본을 만든 후 name을 본인의 이름으로 수정

let user1 = {...user};

user1.name = "승비니";

console.log(user1.name);
console.log(user.name);

