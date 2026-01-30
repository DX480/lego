
var swiperA = new Swiper(".mySwiperA", {
  direction: "vertical",
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  centeredSlidesBounds: true,
  slidesPerView: "3",
  autoHeight: true,

  speed: 1200,
  a11y: false,

  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 0,
    modifier: 0.7,
    slideShadows: true,
  },
  pagination: false,
  mousewheel: {
    invert: false,
  },

  on: {
    slideChange: function () {},
  },
});

var swiperB = new Swiper(".mySwiperB", {
  direction: "vertical",
   effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "1",
  
  speed: 1500,
  a11y: false,

  pagination: false,
  mousewheel: {
    invert: false,
  },

  on: {
    slideChange: function () {},
  },
});

const $contents = document.querySelector(".contents");

let locked = false;

function moveBoth(dir) {
  if (locked) return;
  locked = true;

  if (dir > 0) {
    swiperA.slideNext();
    swiperB.slideNext();
  } else {
    swiperA.slidePrev();
    swiperB.slidePrev();
  }

  window.setTimeout(
    () => {
      locked = false;
    },
    Math.max(swiperA.params.speed, swiperB.params.speed) + 50,
  );
}

//
$contents.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();
    e.stopPropagation();

    const dir = e.deltaY > 0 ? 1 : -1;
    moveBoth(dir);
  },
  { passive: false },
);

let startY = 0;
$contents.addEventListener(
  "touchstart",
  (e) => {
    startY = e.touches[0].clientY;
  },
  { passive: true },
);

$contents.addEventListener(
  "touchmove",
  (e) => {
    e.preventDefault();

    const currentY = e.touches[0].clientY;
    const diff = startY - currentY;

    if (Math.abs(diff) > 12) {
      moveBoth(diff > 0 ? 1 : -1);
      startY = currentY;
    }
  },
  { passive: false },
);
