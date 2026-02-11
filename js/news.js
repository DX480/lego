var radius =800;
var start = -40;
var end = 60;
var itemCount = $(".section_news .card").length - 1;
let increment = diff(start, end) / itemCount;
let offset = 0;
let isAnimating = false;

const items = [
    { url: "https://picsum.photos/300/400?1" },
    { url: "https://picsum.photos/300/400?2" },
    { url: "https://picsum.photos/300/400?3" },
    { url: "https://picsum.photos/300/400?4" },
    { url: "https://picsum.photos/300/400?5" },
    { url: "https://picsum.photos/300/400?5" },
];

function diff(num1, num2) {
  return num1 > num2 ? (num1 - num2) : (num2 - num1);
}

const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// 초기 설정
$(".section_news .slide").css("bottom", radius);
$(".section_news .container").css("bottom", -radius + 350);


$(".slide").each(function(i, o) {
  let url = items[i % items.length].url;
  let image = $("<img/>", {src: url});
  $(o).append(image);
});

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

// 카드 가시성 업데이트 (중앙 기준 양옆 2개씩만 표시)
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

// 회전 함수 - 개선된 버전
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
    easing: "easeOutQuart", // 더 빠른 easing
    rotate: increment * offset,
    duration: 600, // 1200ms -> 600ms로 단축
    complete: function() {
      isAnimating = false;
    }
  });
  
  updateCardVisibility();
}

// 마우스 휠 이벤트 - 개선된 버전
let lastWheelTime = 0;
let wheelCooldown = 200; // 연속 휠 방지를 위한 쿨다운

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

// 드래그 이벤트 - 개선된 버전
let isDragging = false;
let startX = 0;
let dragThreshold = 30; // 50px -> 30px로 감소하여 더 빠른 반응

$(".section_news .container").on("mousedown touchstart", function(e) {
  if (isAnimating) return; // 애니메이션 중에는 드래그 시작 안 함
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

// 키보드 지원 추가 (추가 기능)
$(document).on("keydown", function(e) {
  if (e.key === "ArrowLeft") {
    rotateCarousel(1);
  } else if (e.key === "ArrowRight") {
    rotateCarousel(-1);
  }
});

// 초기 가시성 설정
updateCardVisibility();