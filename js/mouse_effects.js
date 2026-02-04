/* const mask = document.querySelector('.dark-mask');
const cursor = document.querySelector('#cursor');
const seriesSection = document.querySelector('.section_series');

document.addEventListener('mousemove', (e) => {
  // 시리즈 섹션 기준 상대 좌표 계산
  const rect = seriesSection.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
 
  mask.style.setProperty('--mouse-x', x + 'px');
  mask.style.setProperty('--mouse-y', y + 'px');
  
  // 시리즈 섹션 안에 있는지 확인
  const isInSection = (
    e.clientX >= rect.left && 
    e.clientX <= rect.right && 
    e.clientY >= rect.top && 
    e.clientY <= rect.bottom
  );
  

}); */

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