/* 시리즈 마우스 */
const pointCursor = document.querySelector('.point_cursor');
const seriesSection = document.querySelector('.section_series');

window.addEventListener('pointermove', function(e){
    const rect = seriesSection.getBoundingClientRect();
    const isInSection = (
        e.clientX >= rect.left && 
        e.clientX <= rect.right && 
        e.clientY >= rect.top && 
        e.clientY <= rect.bottom
    );
    
    if (isInSection) {
        // 섹션 내부 상대 좌표로 변환
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        pointCursor.style.opacity = '1';
        pointCursor.animate({
            left: `${x}px`,
            top: `${y}px`
        }, {duration: 300, fill: 'forwards'});
    } else {
        pointCursor.style.opacity = '0';
    }
});


/* 출시예정 마우스 - 범위 제한 스팟라이트 */
const mask = document.querySelector(".dark-mask");
const comingSection = document.querySelector(".section_comingsoon");

if (mask && comingSection) {
  let currentX = 50;
  let currentY = 50;


  let targetX = 50;
  let targetY = 50;

  
  const MAX_RADIUS_PX = 150;

  const SMOOTH = 0.08;

  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  function updateTargetFromPointer(clientX, clientY) {
    const rect = comingSection.getBoundingClientRect();

    const inside =
      clientX >= rect.left &&
      clientX <= rect.right &&
      clientY >= rect.top &&
      clientY <= rect.bottom;

    if (!inside) {
      targetX = 50;
      targetY = 50;
      return;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const cx = rect.width / 2;
    const cy = rect.height / 2;

    let dx = x - cx;
    let dy = y - cy;

    const dist = Math.hypot(dx, dy);
    if (dist > MAX_RADIUS_PX) {
      const ratio = MAX_RADIUS_PX / dist;
      dx *= ratio;
      dy *= ratio;
    }

    const limitedX = cx + dx;
    const limitedY = cy + dy;

    targetX = clamp((limitedX / rect.width) * 100, 0, 100);
    targetY = clamp((limitedY / rect.height) * 100, 0, 100);
  }

  window.addEventListener("pointermove", (e) => {
    updateTargetFromPointer(e.clientX, e.clientY);
  });

  function animate() {
    currentX += (targetX - currentX) * SMOOTH;
    currentY += (targetY - currentY) * SMOOTH;

    mask.style.setProperty("--mouse-x", `${currentX}%`);
    mask.style.setProperty("--mouse-y", `${currentY}%`);

    requestAnimationFrame(animate);
  }
  animate();
}
