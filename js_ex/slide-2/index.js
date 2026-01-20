var swiper = new Swiper(".mySwiper", {
  // 세로 방향으로 설정
  direction: "vertical",

  // Coverflow 효과 적용
  effect: "coverflow",

  // 드래그 커서 활성화
  grabCursor: true,

  // 중앙 정렬
  centeredSlides: true,

  // 화면에 보이는 슬라이드 개수: 3개 (위 1개, 센터 1개, 아래 1개)
  slidesPerView: 3,

  // Coverflow 효과 설정
  coverflowEffect: {
    // X축 회전 각도 (세로 방향이므로 X축으로 회전)
    rotate: 50,

    // 슬라이드 간 간격
    stretch: 0,

    // 깊이 효과
    depth: 100,

    // 효과 강도
    modifier: 1,

    // 슬라이드 그림자 활성화
    slideShadows: true,
  },

  // 페이지네이션 설정
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  // 마우스 휠로 슬라이드 넘기기
  mousewheel: {
    invert: false,
  },

  // 키보드 제어
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },

  // 슬라이드 변경 시 이벤트
  on: {
    slideChange: function () {
      // 카운터 업데이트
      const counter = document.getElementById("counter");
      const current = this.activeIndex + 1;
      const total = this.slides.length;
      counter.textContent = `${String(current).padStart(2, "0")} / ${String(
        total
      ).padStart(2, "0")}`;
    },
  },
});
