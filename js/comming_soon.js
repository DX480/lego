let comingSoonSwiper;

function PlayRollingSwiper() {
  comingSoonSwiper = new Swiper(".section_comingsoon .mySwiper", {
    spaceBetween: 56,          // ✅ 간격은 여기서 처리
     autoplay: {
      delay: 0, //add
      disableOnInteraction: false,
    },
    speed: 5000,
    loop: true,
    loopAdditionalSlides: 3,
     slidesPerView: 'auto',
       allowTouchMove: false,
    disableOnInteraction: false,
  });
}

window.addEventListener("load", PlayRollingSwiper);
