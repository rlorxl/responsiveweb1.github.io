$(function () {
  //scroll ani plugin
  $('.animate').scrolla({
    mobile: true,
    once: true,
  });

  // mobile menu
  const $hamburger = document.querySelector('.menu-mobile');
  const $menu = document.querySelector('.menu');
  const $backdrop = document.querySelector('.backdrop');

  const menuclick = (e) => {
    const parentNode = e.target.closest('.menu-mobile');
    const isOpen = parentNode.classList.contains('open');

    if (isOpen) {
      parentNode.classList.remove('open');
      parentNode.classList.add('close');
      $menu.classList.remove('open');
      $backdrop.classList.remove('on');
    } else {
      parentNode.classList.remove('close');
      parentNode.classList.add('open');
      $backdrop.classList.add('on');
      $menu.classList.add('open');
    }
  };

  $hamburger.addEventListener('click', menuclick);
});
