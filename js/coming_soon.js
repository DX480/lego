function PlayRollingSwiper(target){
  rollingSwiper = new Swiper('.coming_soon_slide', {
    spaceBetween: 56,
    centeredSlides: true,
    speed: 6000,
    autoplay: {
      delay: 1,
    },
    loop: true,
    slidesPerView: 'auto',
    allowTouchMove: false,
    disableOnInteraction: false,
  });
}

// 페이지 로드
window.addEventListener('load', function(){
  PlayRollingSwiper();
});