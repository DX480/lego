var swiper = new Swiper(".mySwiper", {
      direction: "vertical",
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      speed: 1200,
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 0.5,
        slideShadows: true,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      mousewheel: {
        invert: false,
      },

      
    });