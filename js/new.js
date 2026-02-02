const START_INDEX = 1;

var swiperB = new Swiper(".mySwiperB", {
  direction: "vertical",
  effect: "fade",
  fadeEffect: { crossFade: true },
  centeredSlides: true,
  slidesPerView: 1,
  speed: 1200,
  allowTouchMove: false,
  mousewheel: false,
});

var swiperA = new Swiper(".mySwiperA", {
  direction: "vertical",
  effect: "coverflow",
  centeredSlides: true,
  slidesPerView: 3,
  speed: 1200,
  mousewheel: false,

  allowTouchMove: true,
  simulateTouch: true,

  autoHeight: false,

  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 0,
    modifier: 0.7,
    slideShadows: true,
  },

  observer: true,
  observeParents: true,

  on: {
    init() {
      this.slideTo(START_INDEX, 0);
      this.update();

      swiperB.slideTo(START_INDEX, 0);
      swiperB.update();
    },
    slideChange() {
      swiperB.slideTo(this.activeIndex, 1200);
    },
  },
});

// ---- 입력 제어(휠/터치) ----
const $scope = document.querySelector(".section_new .contents"); // 커서 어디든 먹게

let locked = false;
function lock() { locked = true; }
function unlock() { locked = false; }

swiperA.on("transitionEnd", unlock);
swiperA.on("slideChangeTransitionEnd", unlock);
swiperA.on("touchEnd", unlock);

function moveBoth(dir) {
  if (locked) return;
  lock();

  if (dir > 0) swiperA.slideNext();
  else swiperA.slidePrev();
}

$scope.addEventListener("wheel", (e) => {
  e.preventDefault();
  const dir = e.deltaY > 0 ? 1 : -1;
  moveBoth(dir);
}, { passive: false });



function moveBoth(dir) {
  if (locked) return;

  // ✅ 1번에서 위로 스크롤해도 0번으로 못 가게
  if (dir < 0 && swiperA.activeIndex <= START_INDEX) return;

  locked = true;
  dir > 0 ? swiperA.slideNext() : swiperA.slidePrev();

  setTimeout(() => (locked = false), swiperA.params.speed + 50);
}
