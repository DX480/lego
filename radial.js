
function getResponsiveValues() {
let screenWidth = window.innerWidth;
if (screenWidth < 320) screenWidth = 320;
if (screenWidth > 1920) screenWidth = 1920;

  const scale = screenWidth / 1920;
  
 
     if(screenWidth > 319 && screenWidth < 799){
    return {
      radius: 1200 * scale ,  
      bottomOffset: 1200 * scale * 0.2,  
      angleRange: 90 
    };
  } else {
    return {
      radius: 1200 * scale,  
      bottomOffset: 1200 * scale * 0.3,  
      angleRange: 60 
    };
  }
  
  
}

var values = getResponsiveValues();
var radius = values.radius;
var start = -values.angleRange;
var end = values.angleRange;
var itemCount = $(".card").length - 1;
let increment = diff(start, end) / itemCount;
let isAnimating = false;
// 화면 크기에 따라 초기 offset 설정
let screenWidth = window.innerWidth;
let offset = (screenWidth <= 500) ? 4 : 2;  // 500px 이하: 1번 카드(offset=4), 초과: 3번 카드(offset=2)


const items = [
    { url: "https://picsum.photos/300/400?1" },
    { url: "https://picsum.photos/300/400?2" },
    { url: "https://picsum.photos/300/400?3" },
    { url: "https://picsum.photos/300/400?4" },
    { url: "https://picsum.photos/300/400?5" },
    { url: "https://picsum.photos/300/400?6" },
    { url: "https://picsum.photos/300/400?7" },
    { url: "https://picsum.photos/300/400?8" },
    { url: "https://picsum.photos/300/400?9" },
];

function diff(num1, num2) {
  return num1 > num2 ? (num1 - num2) : (num2 - num1);
}

const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// 캐러셀 초기화 및 재설정 함수
function initializeCarousel() {
  values = getResponsiveValues();
  radius = values.radius;
  start = -values.angleRange;
  end = values.angleRange;
  increment = diff(start, end) / itemCount;
  
  $(".slide").css("bottom", radius);
  $(".container").css("bottom", -radius + values.bottomOffset);
  
  // 각 카드의 각도 재설정
  $(".card").each(function(i, o) {
    let angle = start + increment * i;
    $(o).css("transform", "rotate(" + angle + "deg)");
  });
}

// 초기 설정
initializeCarousel();

$(".slide").each(function(i, o) {
  let url = items[i % items.length].url;
  let image = $("<img/>", {src: url});
  $(o).append(image);
});

// 초기 애니메이션
let tl = anime.timeline({});
tl.add({
  targets: '.container',
  rotate: [90, increment * offset ],
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
  
  // 화면 크기에 따라 보이는 카드 개수 조정
  let screenWidth = window.innerWidth;
  let visibleDistance;
  if(screenWidth >0 && screenWidth < 501){visibleDistance = 0;}
  else if (screenWidth > 500 && screenWidth < 799) {
    visibleDistance = 1;  // 양옆 1개씩 (총 3개 카드)
  } else {
    visibleDistance = 2;  // 양옆 2개씩 (총 5개 카드)
  }
  
  $(".card").each(function(i) {
    let distance = Math.abs(i - currentCenterCard);
    
    // 중앙 카드 z-index 처리
    if (i === currentCenterCard) {
      $(this).addClass("center");
    } else {
      $(this).removeClass("center");
    }
    
    // 가시성 처리
    if (distance > visibleDistance) {
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
  let maxOffset = centerIndex - 1;
  
  let newOffset = offset + direction;
  
  if (newOffset < minOffset || newOffset > maxOffset) return;
  
  offset = newOffset;
  isAnimating = true;
  
  anime({
    targets: '.container',
    easing: "easeOutQuart", 
    rotate: increment * offset,
    duration: 300,
    complete: function() {
      isAnimating = false;
    }
  });
  
  updateCardVisibility();
}

// 마우스 휠 
let lastWheelTime = 0;
let wheelCooldown = 200;

$(".slider").on("wheel", function(e) {
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

// 드래그 이벤트 
let isDragging = false;
let startX = 0;
let dragThreshold = 30; 

$(".container").on("mousedown touchstart", function(e) {
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

// 초기 가시성 설정
updateCardVisibility();

let resizeTimeout;
$(window).on("resize", function() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(function() {
    let newScreenWidth = window.innerWidth;
    
    // 화면 크기에 따라 offset 재설정
    if (newScreenWidth <= 500) {
      offset = 4;  // 1번 카드 중앙
    } else {
      offset = 2;  // 3번 카드 중앙
    }
    
    // 캐러셀 재초기화
    initializeCarousel();
    
    // 현재 offset 상태 유지하면서 위치 재조정
    anime({
      targets: '.container',
      rotate: increment * offset,
      duration: 300,  // 부드러운 전환
      easing: "easeOutQuart"
    });
    
    // 가시성도 다시 업데이트
    updateCardVisibility();
  }, 100);  // 100ms 디바운싱
});