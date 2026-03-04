function PlayRollingSwiper(target){
   rollingSwiperBtm = new Swiper('.profile_card_list ', {
    spaceBetween: 56,
    init:true,
   loop: true,
    slidesPerView: 'auto',
    loop:true,
    mousewheel:false,
    allowTouchMove: false,
    observer: true,
    observeParents: true,
    autoplay: {
      delay:0,
      disableOnInteraction:false,
    },
    speed: 5000,
    loopedSlides: 1,
  });
}

// 페이지 로드
window.addEventListener('load', function(){
  PlayRollingSwiper();
});