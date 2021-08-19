
window.addEventListener("DOMContentLoaded", function(){
  const header = document.querySelector("#header");
  const sidebox = document.querySelector(".side_box");
  const variableWidth = document.querySelectorAll(".contents_box .contents");
  const delegration = document.querySelector(".contents_box");

  function delegrationFunc(e){
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
    }else if(elem.matches('[data-name="bookmark"]')){
      console.log("북마크");
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
  }

  setTimeout(function(){
    scrollTo(0,0);
  }, 100);

  if(delegration){
  delegration.addEventListener('click', delegrationFunc);
  }

  window.addEventListener('resize', resizeFunc);
  window.addEventListener('scroll', scrollFunc);

});
