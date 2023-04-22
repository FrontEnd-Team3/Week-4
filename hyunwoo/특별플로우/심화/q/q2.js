import { MockPosts } from "./faker.js";

const posts = MockPosts(200); // 나중에 이걸 뒤로 보내기
const totalItemCount = posts.length;

const postsPerPage = 10;
const dividedPosts = (() => {
  let temp = [];
  while (posts.length) {
    temp.push(posts.splice(0, 10));
  }
  return temp;
})();
console.log(dividedPosts);

const searchParams = new URLSearchParams(location.search);

const userInfo = {
  imgSrc:
    "https://qph.cf2.quoracdn.net/main-qimg-3ef935dceb4d856105d281dbb73cf7c4-pjlq",
  userName: "zl존현우",
};

let page = Number(searchParams.get("page"));
if (!page || !(page >= 1 && page <= 20)) {
  // query string에 page가 없거나 정상적인 범위가 아닐 때
  page = 1;
  location.href = location.pathname + `?page=${page}`;
}
// let page = 1; // query string 구현 후 redirect 쓰기. window.location.href =
const $pagination = document.querySelector(".pagination");
const $postContainer = document.getElementById("post-container");
const $addPostsSection = document.getElementById("add-posts-section");

const setPagination = () => {
  let $lis = document.querySelectorAll(".pagination > li");
  const $currPageLi = Array.from($lis).filter(
    ($li) => $li.innerText === String(page)
  )[0];
  if (!$currPageLi) {
    // 만약 없다면 paint하기
    const lt = `<li>&lt;&lt;</li>
    <li>&lt;</li>`;
    const gt = `<li>&gt;</li>
    <li>&gt;&gt;</li>`;
    const between = Array.from({ length: 10 }, (_, i) => {
      const pageNum = postsPerPage * Math.floor((page - 1) / 10) + i + 1;
      return `<li ${
        pageNum === page ? "class='selected'" : ""
      }>${pageNum}</li>`;
    }).join("");
    $pagination.innerHTML = lt + between + gt;
    $lis = document.querySelectorAll(".pagination > li");
  }
  $lis.forEach(($li) => {
    $li.addEventListener("click", () => {
      movePage($li);
    });
  });
};

const setPosts = () => {
  // data-toggle은 dataset property를 준 것임. 딥다이브 39장 참고!
  $postContainer.innerHTML = Array.from(
    { length: postsPerPage },
    (_, i) => `<div class="post-card" data-toggle="false">
  <h4 class="post-title">${dividedPosts[page - 1][i].title}</h4>
  <div class="post-content">${dividedPosts[page - 1][i].content}</div>
  <button type="button">댓글 보기</button>
  <div class="reply-section hidden">
    <button type="button">댓글 추가하기</button>
    <button type="button" class="hidden">취소</button>
    <input type="text" class="hidden" />
    <ul class="post-replies">
    </ul>
  </div>
</div>`
  ).join("");
  Array.from($postContainer.children).forEach(paintPostEventListener);
};
const paintPostEventListener = ($el) => {
  {
    // $el.children[2] : 댓글 보기/숨기기 버튼
    // $el.children[3] : 댓글 관리 div
    // $el.children[3].children[0] : 댓글 추가 버튼
    // $el.children[3].children[1] : 댓글 취소 버튼
    // $el.children[3].children[2] : 댓글 입력
    // $el.children[3].children[3] : 댓글 목록
    $el.children[2].addEventListener("click", () => {
      if ($el.children[3].classList.contains("hidden")) {
        $el.children[2].innerText = "댓글 숨기기";
        $el.children[3].classList.remove("hidden");
      } else {
        $el.children[2].innerText = "댓글 보기";
        $el.children[3].classList.add("hidden");
      }
    });
    $el.children[3].children[0].addEventListener("click", () => {
      if ($el.children[3].children[1].classList.contains("hidden")) {
        $el.children[3].children[0].innerText = "댓글 등록";
        $el.children[3].children[1].classList.remove("hidden");
        $el.children[3].children[2].classList.remove("hidden");
      } else {
        // 댓글 등록
        $el.children[3].children[0].innerText = "댓글 추가하기";
        $el.children[3].children[1].classList.add("hidden");
        $el.children[3].children[2].classList.add("hidden");
        // 딥다이브 39장 참고
        $el.children[3].children[3].insertAdjacentHTML(
          "beforeend",
          `<li class="reply-item" data-toggle="true">
        <div class="reply-user-info">
          <img src="${userInfo.imgSrc}" width="150" height="150"/>
          <p>${userInfo.userName}</p>
        </div>
        <div class="reply-content">${$el.children[3].children[2].value}</div>
        <div class="reply-date">1945.08.15</div>
        <!-- 본인의 게시글에만 보임 -->
        <div>
          <button type="button">수정</button>
          <button type="button" class="hidden">취소</button>
          <input type="text" class="hidden" />
          <button type="button">삭제</button>
        </div>
      </li>`
        );
        // 새롭게 추가된 요소에 eventlistener 달기
        const $newElement = $el.children[3].children[3].lastElementChild;
        $newElement.children[3].children[0].addEventListener("click", () => {
          if (
            $newElement.children[3].children[1].classList.contains("hidden")
          ) {
            $newElement.children[3].children[1].classList.remove("hidden");
            $newElement.children[3].children[2].classList.remove("hidden");
          } else {
            $newElement.children[1].innerText =
              $newElement.children[3].children[2].value;
            $newElement.children[3].children[2].value = null;
            $newElement.children[3].children[1].classList.add("hidden");
            $newElement.children[3].children[2].classList.add("hidden");
          }
        });
        $newElement.children[3].children[1].addEventListener("click", () => {
          $newElement.children[3].children[2].value = null;
          $newElement.children[3].children[1].classList.add("hidden");
          $newElement.children[3].children[2].classList.add("hidden");
        });
        $newElement.children[3].children[3].addEventListener("click", () => {
          $newElement.remove();
        });
        $el.children[3].children[2].value = null;
      }
    });
    $el.children[3].children[1].addEventListener("click", () => {
      $el.children[3].children[0].innerText = "댓글 추가하기";
      $el.children[3].children[1].classList.add("hidden");
      $el.children[3].children[2].classList.add("hidden");
      $el.children[3].children[2].value = null;
    });
  }
};
const movePage = ($li) => {
  let targetPage = $li.innerText;
  if (!isNaN(targetPage)) {
    targetPage = Number(targetPage);
    location.href = location.pathname + `?page=${targetPage}`;
  }
  if (targetPage === ">") {
    if (page + 1 >= 1 && page + 1 <= 20)
      location.href = location.pathname + `?page=${page + 1}`;
  } else if (targetPage === "<") {
    if (page - 1 >= 1 && page - 1 <= 20)
      location.href = location.pathname + `?page=${page - 1}`;
  } else if (targetPage === ">>") {
    if (page + 10 >= 1 && page + 10 <= 20)
      location.href = location.pathname + `?page=${page + 10}`;
  } else if (targetPage === "<<") {
    if (page - 10 >= 1 && page - 10 <= 20)
      location.href = location.pathname + `?page=${page - 10}`;
  }
  setPagination();
  setPosts();
};
$addPostsSection.children[0].addEventListener("click", () => {
  if ($addPostsSection.children[1].classList.contains("hidden")) {
    $addPostsSection.children[0].innerText = "게시글 등록";
    $addPostsSection.children[1].classList.remove("hidden");
    $addPostsSection.children[2].classList.remove("hidden");
    $addPostsSection.children[3].classList.remove("hidden");
  } else {
    // 게시글 등록
    $addPostsSection.children[0].innerText = "게시글 추가하기";
    $addPostsSection.children[1].classList.add("hidden");
    $addPostsSection.children[2].classList.add("hidden");
    $addPostsSection.children[3].classList.add("hidden");

    $postContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="post-card" data-toggle="true">
      <h4 class="post-title">${$addPostsSection.children[2].value}</h4>
      <div class="post-content">${$addPostsSection.children[3].value}</div>
      <button type="button">댓글 보기</button>
      <div class="reply-section hidden">
        <button type="button">댓글 추가하기</button>
        <button type="button" class="hidden">취소</button>
        <input type="text" class="hidden" />
        <ul class="post-replies">
        </ul>
      </div>
      <div>
        <button type="button">수정</button>
        <button type="button" class="hidden">취소</button>
        <input type="text" placeholder="제목" class="hidden" />
        <input type="text" placeholder="내용" class="hidden" />
        <button>삭제</button>
      </div>
    </div>`
    );
    $addPostsSection.children[2].value = null;
    $addPostsSection.children[3].value = null;
    const $newPost = $postContainer.lastElementChild;
    $newPost.children[4].children[0].addEventListener("click", () => {
      /*
                if (
            $newElement.children[3].children[1].classList.contains("hidden")
          ) {
            $newElement.children[3].children[1].classList.remove("hidden");
            $newElement.children[3].children[2].classList.remove("hidden");
          } else {
            $newElement.children[1].innerText =
              $newElement.children[3].children[2].value;
            $newElement.children[3].children[2].value = null;
            $newElement.children[3].children[1].classList.add("hidden");
            $newElement.children[3].children[2].classList.add("hidden");
          }
      */
      if ($newPost.children[4].children[1].classList.contains("hidden")) {
        $newPost.children[4].children[1].classList.remove("hidden");
        $newPost.children[4].children[2].classList.remove("hidden");
        $newPost.children[4].children[3].classList.remove("hidden");
      } else {
        $newPost.children[0].innerText = $newPost.children[4].children[2].value;
        $newPost.children[1].innerText = $newPost.children[4].children[3].value;
        $newPost.children[4].children[1].classList.add("hidden");
        $newPost.children[4].children[2].classList.add("hidden");
        $newPost.children[4].children[3].classList.add("hidden");
        $newPost.children[4].children[2].value = null;
        $newPost.children[4].children[3].value = null;
      }
    });
    $newPost.children[4].children[1].addEventListener("click", () => {
      $newPost.children[4].children[1].classList.add("hidden");
      $newPost.children[4].children[2].classList.add("hidden");
      $newPost.children[4].children[3].classList.add("hidden");
      $newPost.children[4].children[2].value = null;
      $newPost.children[4].children[3].value = null;
    });
    $newPost.children[4].children[4].addEventListener("click", () => {
      $newPost.remove();
    });
    paintPostEventListener($postContainer.lastElementChild);
  }
});
$addPostsSection.children[1].addEventListener("click", () => {
  $addPostsSection.children[0].innerText = "게시글 추가하기";
  $addPostsSection.children[1].classList.add("hidden");
  $addPostsSection.children[2].classList.add("hidden");
  $addPostsSection.children[3].classList.add("hidden");
  $addPostsSection.children[2].value = null;
  $addPostsSection.children[3].value = null;
});
setPosts();
setPagination();

/* 
-----------------------------------------------------------------------------------------

백엔드 없이 게시판 만들기

-----------------------------------------------------------------------------------------

문제1. 페이지네이션 만들기
    총 아이템의 갯수는 totalItemCount개 입니다.
    해당 갯수를 토대로 한 페이지당 10개의 Post가 보이는 페이지네이션을 구현해주세요

    단, 현재 총 아이템의 갯수는 200개이며 10개씩 보여준다면 총 20개의 페이지가 나와야합니다.
    그러나 이 개수는 언제든 변화될 수 있으며 만약 해당 갯수가 변화된다면 페이지네이션도 변경되어야합니다.

요구사항
    1.
        1~20의 페이지를 한번에 보여주는 것이 아닌 10페이지 단위로 페이지를 보여주어야하며
        10페이지에서 마지막 페이지를 클릭한다면 11~20페이지가 보여야합니다

        ex)
        1~10 > 다음버튼 > 11~20

        각 버튼의 좌우의 끝에는 맨처음 페이지로 이동할 수 있는 버튼과
        맨끝으로 이동할 수 있는 버튼이 있어야합니다. O

    2. 
        페이지를 누르면 페이지에 맞는 번호가 하이라이트 되어야합니다. O
        또한, 새로고침 시에도 이 focus효과는 유지되어야합니다. O

        ex) 현재 페이지5
        <<(맨처음) <(이전) 1 2 3 4 [5] 6 7 8 9 10 (다음)> (마지막)>>
        
        5에 focus효과 새로고침 이후에도 5에는 focus효과가 유지되어야합니다. O
        

    3.  
        페이지를 눌러 이동 되었을 때 동일한 데이터를 불러올 수 있는 backend가 없으므로
        MockPosts를 함수를 활용하여 새로운 10개의 랜덤한 게시물을 보여주셔야 합니다. O

-----------------------------------------------------------------------------------------

문제2. 게시글 CRUD 구현하기
    게시글 구성에 필요한 가상 데이터를 생성하는 함수 MockPosts는 안에 넣은 인자의 갯수만큼 가상의 포스트 데이터를 생성하는 함수입니다.
    해당 함수의 상세 데이터는 제가 상단에 console.log를 통해 출력해두었으니 개발자 도구로 확인해보세요 :)

요구사항
    1.
        게시글은 페이스북 혹은 인스타그램의 형태로 한 페이지에 10개씩 보이게 됩니다.
        댓글은 토글 형태로 "댓글 보기"를 클릭해야만 해당 댓글을 확인할 수 있습니다.
        
    2. 
        각 게시물과 댓글에는 내가 작성한 글인지 알 수 있는 flag가 들어있으며
        현재 기존에 작성된 모든 가상 데이터의 해당 flag는 false입니다.
        그러나 만약 본인이 새로운 게시글과 댓글을 작성한다면 해당 flag는 true의 형태가 되어야합니다.

    3.
        페이지네이션과 함께 게시글의 CRUD 구현하기
        게시글을 작성할 수 있습니다. 댓글을 작성할 수 있습니다. 새로운 게시글은 내가 작성한 것이기에 flag는 true입니다.
    
        * 주의)
            백엔드가 존재하지 않기 때문에 파일 업로드 기능을 구현할 수 없기에 사진을 업로드 할 수 없습니다.
            따라서 게시글 추가 시 올라가는 이미지의 속성인 Post_img의 경우 빈배열로 두거나 빈 값으로 두시면 됩니다 :)

            게시글 작성과 댓글 작성 시 작성자의 프로필 이미지는 본인이 원하는 대체 이미지로 고정하여 대체 하시면 됩니다.
            
        본인이 작성한 게시글과 댓글에만 수정과 삭제 버튼이 보여야합니다.
        삭제, 수정 버튼의 기능은 모두 적상적으로 기능이 작동 되어야합니다.

-----------------------------------------------------------------------------------------
*/
