
window.addEventListener("DOMContentLoaded", function(){
  const heart = document.querySelector(".heart_btn");
  const heaer = document.querySelector("#header");
  const sidebox = document.querySelector(".side_box");

    heart.addEventListener('click', function(){
      heart.classList.toggle('on');
    });

  function resizeFunc(){
    if(pageYOffset >= 10){
      let calcWidth = (window.innerWidth * 0.5) + 167;
      sidebox.style.left = calcWidth + 'px';
    }
  }

  function scrollFunc(){
    if(pageYOffset >= 10){
      header.classList.add('on');
      sidebox.classList.add('on');

      resizeFunc();
    }else{
      header.classList.remove('on');
      sidebox.classList.remove('on');
      sidebox.removeAttribute('style');
    }
  }

  window.addEventListener('scroll', scrollFunc);

});
