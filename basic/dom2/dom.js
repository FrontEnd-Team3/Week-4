import mockPost from './mock.json' assert { type: 'json' };
console.log(mockPost);

const $postDetail = document.querySelector('#post-detail');
const $repliesList = document.querySelector('#replies-list');

/* 
    import(참조)한 json data를
    게시글 상세와 댓글창에 나타내고 게시글 객체의 상세 내용은 console.log로 출력해두었습니다

    댓글 추가 버튼을 누르면 댓글이 추가되도록 해보세요 :)

    삭제 및 수정기능은 본인의 자유로 구현하시면 됩니다 :)
*/

$postDetail.innerHTML = `
<h3>제목 : ${mockPost.post.title}</h3>
<div>내용 : ${mockPost.post.content}</div>
<p>작성자 : ${mockPost.post.User.nickName}</p>
`;

// 댓글 목록
const $replies = document.querySelector('#replies-list');
const replyAll = Object.values(mockPost.post.Replies)

for(let reply in replyAll){
    const $repList = document.createElement('li');
    $repList.textContent = `${replyAll[reply].User.nickName} : ${replyAll[reply].content}`;
    // console.log(reply)
    // console.log(replyAll)
    console.log(replyAll[reply])
    $replies.appendChild($repList)
    
}

const $inputTxt = document.querySelector('input');
const $btn = document.querySelector('button');
function replyAdd(){
    const $btnDel = document.createElement('button');
    const $repList2 = document.createElement('li');
    if($inputTxt.value !== ''){
        $repList2.textContent = `latte : ${$inputTxt.value}`;   // 작성자 라떼 + 댓글 내용
        $btnDel.textContent = '삭제'
        $replies.appendChild($repList2).appendChild($btnDel);
        $inputTxt.value = ''
    }
    $btnDel.addEventListener('click', (e)=> {
        e.preventDefault();
        e.target.parentElement.remove()
        replyAdd();
    })
}

$inputTxt.addEventListener('keydown', function(e){ // 엔터키
    if(e.keyCode === 13) {
        e.preventDefault();
        replyAdd();
    }
});

$btn.addEventListener('click', (e)=>{
    e.preventDefault();
    replyAdd();
})

