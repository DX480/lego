var radius =800;
var start = -40;
var end = 60;
var itemCount = $(".section_news .card").length - 1;
let increment = diff(start, end) / itemCount;
let offset = 0;
let isAnimating = false;


function diff(num1, num2) {
  return num1 > num2 ? (num1 - num2) : (num2 - num1);
}

const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// 초기 설정
$(".section_news .slide").css("bottom", radius);
$(".section_news .container").css("bottom", -radius + 250);


$(".section_news .card").each(function(i, o) {
  let angle = start + increment * i;
  $(o).css("transform", "rotate(" + angle + "deg)");
});

// 초기 애니메이션
let tl = anime.timeline({});
tl.add({
  targets: '.section_news .container',
  rotate: [90, 0],
  duration: 1500,
  easing: "easeOutExpo",
});
tl.add({
  targets: '.slide',
  opacity: [0, 1],
  easing: "easeInOutQuad",
  duration: 800,
  delay: anime.stagger(120)
}, 0);


function updateCardVisibility() {
  let centerIndex = Math.floor(itemCount / 2);
  let currentCenterCard = centerIndex - offset;
  
  $(".section_news .card").each(function(i) {
    let distance = Math.abs(i - currentCenterCard);
    
    if (distance > 2) {
      $(this).addClass("hidden");
    } else {
      $(this).removeClass("hidden");
    }
  });
}

// 회전 함수 
function rotateCarousel(direction) {
  if (isAnimating) return;
  
  let centerIndex = Math.floor(itemCount / 2);
  let minOffset = -(centerIndex - 1);
  let maxOffset = centerIndex - 2;
  
  let newOffset = offset + direction;
  
  if (newOffset < minOffset || newOffset > maxOffset) return;
  
  offset = newOffset;
  isAnimating = true;
  
  anime({
    targets: '.section_news .container',
    easing: "easeOutQuart", 
    rotate: increment * offset,
    duration: 600,
    complete: function() {
      isAnimating = false;
    }
  });
  
  updateCardVisibility();
}

// 마우스 휠 
let lastWheelTime = 0;
let wheelCooldown = 200;

$(".section_news .slider").on("wheel", function(e) {
  e.preventDefault();
  
  let now = Date.now();
  if (now - lastWheelTime < wheelCooldown) return;
  
  lastWheelTime = now;
  
  if (e.originalEvent.deltaY > 0) {
    rotateCarousel(-1);
  } else if (e.originalEvent.deltaY < 0) {
    rotateCarousel(1);
  }
});

// 드래그 
let isDragging = false;
let startX = 0;
let dragThreshold = 30; 

$(".section_news .container").on("mousedown touchstart", function(e) {
  if (isAnimating) return; 
  isDragging = true;
  startX = e.type === "mousedown" ? e.pageX : e.originalEvent.touches[0].pageX;
});

$(document).on("mousemove touchmove", function(e) {
  if (!isDragging) return;
  
  let currentX = e.type === "mousemove" ? e.pageX : e.originalEvent.touches[0].pageX;
  let diffX = currentX - startX;
  
  if (Math.abs(diffX) > dragThreshold) {
    if (diffX > 0) {
      rotateCarousel(1);
    } else {
      rotateCarousel(-1);
    }
    isDragging = false;
  }
});

$(document).on("mouseup touchend", function() {
  isDragging = false;
});


updateCardVisibility();