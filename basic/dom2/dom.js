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

// 게시글 제목
const $postTitle = document.createElement('h2');
$postTitle.textContent = mockPost.post.title;
$postDetail.appendChild($postTitle);
// 게시글 내용
const $postCont = document.createElement('p');
$postCont.textContent = mockPost.post.content;
$postDetail.appendChild($postCont);
// 작성자
const $postUser = document.createElement('p');
$postUser.textContent = mockPost.post.User.nickName;
$postDetail.appendChild($postUser);

console.log(Object.entries(mockPost.post.Replies))
// 댓글 목록
const $replies = document.querySelector('#replies-list');
const replyAll = Object.values(mockPost.post.Replies)
console.log(replyAll)
for(let reply in replyAll){
    const $repList = document.createElement('li');
    $repList.textContent = replyAll[reply].content;
    // console.log(reply)
    // console.log(replyAll)
    console.log(replyAll[reply])
    $replies.appendChild($repList)
    
}

const $inputTxt = document.querySelector('input');
const $btn = document.querySelector('button');
function replyAdd(){
    const $repList2 = document.createElement('li');
    if($inputTxt.value !== ''){
        $repList2.textContent = $inputTxt.value;
        $replies.appendChild($repList2);
        $inputTxt.value = ''
    }
}

$inputTxt.addEventListener('keydown', function(e){
    if(e.keyCode === 13) {
        e.preventDefault();
        replyAdd();
    }
});

$btn.addEventListener('click', (e)=>{
    e.preventDefault();
    replyAdd();
})