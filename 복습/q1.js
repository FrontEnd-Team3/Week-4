const user = {
  name: "김성용",
  age: 20,
  height: 190,
};

// 문제1. 위의 객체를 아래의 메소드를 이용하여 반환 값을 출력 하고 각 메소드의 기능을 정의할 것

//(1) user[”key”], user.key
console.log(user["name"]);
console.log(user.age);

//(2) Object.keys()
// 주어진 객체의 속성 이름들을 일반적인 반복문과 동일한 순서로 순회되는 열거할 수 있는 배열로 반환
console.log(Object.keys(user));

//(3) Object.values()
// 전달된 파라미터 객체가 가지는 (열거 가능한) 속성의 값들로 이루어진 배열을 리턴
console.log(Object.values(user));

//(4) Object.entries()
// 같은 순서로 주어진 객체 자체의 enumerable 속성 [key, value] 쌍의 배열을 반환
console.log(Object.entries(user));

//(5) for in
// 상속된 열거 가능한 속성들을 포함하여 객체에서 문자열로 키가 지정된 모든 열거 가능한 속성에 대해 반복
for (let val in user) {
  console.log(val);
}

// 문제2. 값이 “김성용”인 속성의 key 찾기
const keyArr = Object.keys(user);
const result = keyArr.find((el) => user[`${el}`] === "김성용");
console.log(result);

// 문제3. 깊은 복사를 통해 user 객체의 복사본을 만든 후 name을 본인의 이름으로 수정
const newUser = { ...user };
console.log(newUser);

newUser["name"] = "함정우";
console.log(newUser);
console.log(user);
