var swiper = new Swiper(".mySwiper", {
      direction: "vertical",
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: '3',
      autoHeight:true,
      spaceBetween: 10,
      touchRatio: 0,
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

      on: {

        init: function() {

     

        }
      },
    });


$('.section_new').on('scroll touchmove mousewheel', function(e){
e.preventDefault();
e.stopPropagation(); 
return false;
})
