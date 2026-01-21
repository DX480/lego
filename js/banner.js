window.addEventListener('load', () => {
  document
    .querySelectorAll('.banner_text > *')
    .forEach((el, idx) => {
      setTimeout(() => {
        el.classList.add('ani');
      }, idx * 200);
    });
});