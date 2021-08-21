
window.addEventListener("DOMContentLoaded", function(){
  const header = document.querySelector("#header");
  const sidebox = document.querySelector(".side_box");
  const variableWidth = document.querySelectorAll(".contents_box .contents");
  const delegation = document.querySelector(".contents_box");

  function delegationFunc(e){
    let elem = e.target;

    while(!elem.getAttribute('data-name')){
      elem = elem.parentNode;

      if(elem.nodeName === 'BODY'){
        elem = null;
        return;
      }
    }

    if(elem.matches('[data-name="heartbeat"]')){
      console.log("하트");

      var pk = elem.getAttribute('name');

        $.ajax({
            type: "POST",
            url: "../../Front/data/like.json",
            data: {pk},
            dataType: "json",
            success: function (response) {

                // 서버와 통신할때 var likeCount = document.querySelector('#like-count-' + pk);
                var likeCount = document.querySelector('#like-count-37');
                likeCount.innerHTML = '좋아요' + response.like_count + '개';

            },

            error: function (request, status, error) {
                alert("로그인이 필요합니다.");
                window.location.replace("/accounts/login/");
            },
        });

    } else if (elem.matches('[data-name="bookmark"]')) {

        console.log('북마크!');

        var pk = elem.getAttribute('name');

        $.ajax({
            type: "POST",
            url: "../../Front/data/bookmark.json",
            data: {pk},
            dataType: "json",
            success: function (response) {


                // 서버와 통신할때 var bookmarkCount = document.querySelector('#bookmark-count-' + pk);
                var bookmarkCount = document.querySelector('#bookmark-count-37');
                bookmarkCount.innerHTML = '북마크' + response.bookmark_count + '개';

            },
            error: function (request, status, error) {
                // alert("실패");
                alert("로그인이 필요합니다.");
                window.location.replace("/accounts/login/");
            },
        });
    } else if (elem.matches('[data-name="comment"]')) {

        console.log('댓글!');

        var content = document.querySelector('#add-comment-post37>input[type=text]').value;
        //.contents .comment_field .upload_btn 속성 pointer-event 끄기


        console.log(content);

        if (content.length > 140) {
            alert("댓글은 최대 140자 입력 가능합니다. 현재 글자수 :" + content.length);
            return;
        }

        $.ajax({
            type: "POST",
            url: "./comment.html",
            data: {
                'pk': 37,
                'content': content,
            },
            dataType: 'html',
            success:function(data){
                document.querySelector('#comment-list-ajax-post37').insertAdjacentHTML('afterbegin', data);
            },
            error: function (request, status, error) {
                alert("문제가 발생했습니다..");
                window.location.replace("/accounts/login/");
            },
        });

        document.querySelector('#add-comment-post37>input[type=text]').value = '';
    } else if (elem.matches('[data-name="comment_delete"]')) {

        console.log('삭제!');

        $.ajax({
            type: "POST",
            url: "../data/delete.json",
            data: {
                'pk': 37,
            },
            dataType: "json",
            success: function (response) {
                if (response.status) {
                    let comt = document.querySelector('.comment-detail');
                    comt.remove();
                }
            },
            error: function(request, status, error) {
                alert("문제가 발생했습니다..");
                window.location.replace("/account/login/");
            },
        });
    } else if (elem.matches('[data-name="follow"]')) {

        $.ajax({
            type: "POST",
            url: "../data/follow.json",
            data: {
                'pk': 37,
            },
            dataType: "json",
            success: function (response) {
                if(response.status){
                    document.querySelector('input.follow').value="팔로잉";
                }else{
                    document.querySelector('input.follow').value="팔로워";
                }
            },
            error: function(request, status, error) {
                alert("문제가 발생했습니다..");
                window.location.replace("/account/login/");
            },
        });
    }

    elem.classList.toggle('on');
  
  }

  function resizeFunc(){
    if(pageYOffset >= 10){
      let calcWidth = (window.innerWidth * 0.5) + 167;
      sidebox.style.left = calcWidth + 'px';
    }
    

    if(matchMedia('screen and (max-width : 800px)').matches){
      for(let i=0; i<variableWidth.length; i++){
        variableWidth[i].style.width = window.innerWidth -20 + 'px';
      }
    }else{
      for(let i=0; i<variableWidth.length; i++){
        if(window.innerWidth > 600){
          variableWidth[i].removeAttribute('style');   
        }
      }
    }
  }

  function scrollFunc(){
    let scrollHeight = pageYOffset + window.innerHeight;
    let documentHeight = document.body.scrollHeight;

    if(pageYOffset >= 10){
      header.classList.add('on');

      if(sidebox){
      sidebox.classList.add('on');
      }

      resizeFunc();

    }else{
      header.classList.remove('on');

      if(sidebox){
        sidebox.classList.remove('on');
        sidebox.removeAttribute('style');
      }
    }

    if(scrollHeight >= documentHeight){
        let page = document.querySelector('#page').value;
        document.querySelector('#page').value = parseInt(page)+1
        if(page > 4){
            return;
        }

        callMorePostAjax(page);
    }
  }

  function callMorePostAjax(page){
    if(page > 4){
        return;
    }
    $.ajax({
        type: 'POST',
        url: './post.html',
        data: {
            'page': page,
        },
        dataType: 'html',
        success: addMorePostAjax,
        error: function(request, status, error) {
            alert("문제가 발생했습니다..");
            window.location.replace("/account/login/");
        },
    })
  }

  function addMorePostAjax(data){
    delegation.insertAdjacentHTML('beforeend', data);
  }

  setTimeout(function(){
    scrollTo(0,0);
  }, 100);

  if(delegation){
  delegation.addEventListener('click', delegationFunc);
  }

  window.addEventListener('resize', resizeFunc);
  window.addEventListener('scroll', scrollFunc);

});
