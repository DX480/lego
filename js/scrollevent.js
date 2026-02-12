class Scrooth {
  constructor({
    element = window,
    strength = 10,
    acceleration = 1.2,
    deceleration = 0.975,
  } = {}) {
    this.element = element;
    this.distance = strength;
    this.acceleration = acceleration;
    this.deceleration = deceleration;
    this.running = false;

    this.element.addEventListener("wheel", this.scrollHandler.bind(this), {
      passive: false,
    });
    this.element.addEventListener("mousewheel", this.scrollHandler.bind(this), {
      passive: false,
    });
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
      this.currentDistance *=
        this.isDistanceAsc === true ? this.acceleration : this.deceleration;
      Math.abs(this.currentDistance) < 0.1 && this.isDistanceAsc === false
        ? (this.running = false)
        : 1;
      Math.abs(this.currentDistance) >= Math.abs(this.distance)
        ? (this.isDistanceAsc = false)
        : 1;

      this.top += this.currentDistance;
      this.element.scrollTo(0, this.top);

      if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.update();
      }

      requestAnimationFrame(this.scroll);
    }
  }
}

const scroll = new Scrooth({
  element: window,
  strength: 40 , 
  acceleration: 1.75,
  deceleration: 0.875,
});

$(document).ready(function () {

  gsap.registerPlugin(ScrollTrigger);


  ScrollTrigger.create({
    trigger: ".section_new",
    start: "bottom bottom",
    end: "+=150%", 
    pin: true,
    pinSpacing: true,
    scrub: 3,
  });

  ScrollTrigger.create({
    trigger: ".section_news",
    start: "bottom bottom",
    end: "+=100%", 
    pin: true,
    pinSpacing: true,
    scrub: 3,
  });



/*   $("section").each(function (index) {
    var section = this;
    var sectionId = $(this).attr("id");


      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=40%",
        pin: true,
        pinSpacing: true,
        scrub: 5,
        anticipatePin: false,
        onEnter: function () {
          console.log("Section entered: " + sectionId);
        },
        onLeave: function () {
          console.log("Section left: " + sectionId);
        },
      });
  }); */
});





/* header 숨김 */

var didScroll;

var lastScrollTop = 0;
var delta = 5; 
var navbatHeight = $('header').outerHeight(); 

$(window).scroll(function(evnet){ 
  didScroll  = true;
});

setInterval(function(){ 
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