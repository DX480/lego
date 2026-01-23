class Scrooth {
  constructor({element = window, strength=10, acceleration = 1.2,deceleration = 0.975}={}) {
    this.element = element;
    this.distance = strength;
    this.acceleration = acceleration;
    this.deceleration = deceleration;
    this.running = false;

    this.element.addEventListener('wheel', this.scrollHandler.bind(this), {passive: false});
    this.element.addEventListener('mousewheel', this.scrollHandler.bind(this), {passive: false});
    this.scroll = this.scroll.bind(this);
  }

  scrollHandler(e) {
    e.preventDefault();

    if (!this.running) {
      this.top = this.element.pageYOffset || this.element.scrollTop || 0;
      this.running = true;
      this.currentDistance = e.deltaY > 0 ? 0.1 : -0.1;
      this.isDistanceAsc = true;
      this.scroll();
    } else {
      this.isDistanceAsc = false;
      this.currentDistance = e.deltaY > 0 ? this.distance : -this.distance;
    }
  }

  scroll() {
    if (this.running) {
      this.currentDistance *= this.isDistanceAsc === true ? this.acceleration : this.deceleration;
      Math.abs(this.currentDistance) < 0.1 && this.isDistanceAsc === false ? this.running = false : 1;
      Math.abs(this.currentDistance) >= Math.abs(this.distance) ? this.isDistanceAsc = false : 1;

      this.top += this.currentDistance;
      this.element.scrollTo(0, this.top);
      
      requestAnimationFrame(this.scroll);
    }
  }
}

const scroll = new Scrooth({
  element: window,
  strength: 27, //스크롤 한번에 이동하는 거리
  acceleration: 1.75,
  deceleration: .875,
});



var didScroll;

var lastScrollTop = 0;
var delta = 5; //동작의 구현이 시작되는 위치
var navbatHeight = $('header').outerHeight(); //영향을 받을 요소를 선택

$(window).scroll(function(evnet){ //스크롤 시 사용자가 스크롤했다는 것을 알림
  didScroll  = true;
});

setInterval(function(){ //hasScrolled()를 실행하고 didScroll 상태를 재설정
  if (didScroll) {
    hasScrolled();
    didScroll = true;
  }
}, 200);

function hasScrolled(){
  const st = $(this).scrollTop();

  if(Math.abs(lastScrollTop - st) <= delta)
    return;

  if(st > lastScrollTop && st > navbatHeight){
    // Scroll Down
    $('header').addClass('nav-up');
    //$('header').removeClass('nav-down').addClass('nav-up');
  } else {
    if(st + $(window).height() < $(document).height()) {
      // Scroll Up
      $('header').removeClass('nav-up');
      //$('header').removeClass('nav-up').addClass('nav-down');
    }
  }
  lastScrollTop = st
}