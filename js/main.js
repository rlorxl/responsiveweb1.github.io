$(function () {
  //scroll ani plugin
  $(".animate").scrolla({
    mobile: true,
    once: true,
  });

  // mobile menu
  const $hamburger = document.querySelector(".menu-mobile");
  const $menu = document.querySelector(".menu");
  const $backdrop = document.querySelector(".backdrop");

  const menuclick = e => {
    const parentNode = e.target.closest(".menu-mobile");
    const isOpen = parentNode.classList.contains("open");

    if (isOpen) {
      parentNode.classList.remove("open");
      parentNode.classList.add("close");
      $menu.classList.remove("open");
      $backdrop.classList.remove("on");
    } else {
      parentNode.classList.remove("close");
      parentNode.classList.add("open");
      $backdrop.classList.add("on");
      $menu.classList.add("open");
    }
  };

  $hamburger.addEventListener("click", menuclick);

  // default cursor
  const $cursor = document.querySelector(".cursor-default");
  const $cursor_s = document.querySelector(".cursor-small");
  const $cursorLeft = document.querySelector(".cursor-left");
  const $cursorRight = document.querySelector(".cursor-right");

  window.addEventListener("mousemove", e => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // 기본커서에 적용
    $cursor_s.style.top = mouseY + "px";
    $cursor_s.style.left = mouseX + "px";

    setTimeout(() => {
      $cursor.style.top = mouseY + "px";
      $cursor.style.left = mouseX + "px";
    }, 200);

    const currentSlide = document.querySelector(".active");
    if (!currentSlide) return;

    const rect = currentSlide.getBoundingClientRect();
    const leftSide = rect.left + rect.width / 2;

    // 메인슬라이드 커서에 적용
    // prettier-ignore
    if (
      mouseY >= rect.top && 
      mouseY <= rect.bottom && 
      mouseX >= rect.left && 
      mouseX <= leftSide) {
      $cursor_s.style.display = "none";
      $cursor.style.display = "none";
      $cursorRight.classList.remove("active");
      $cursorLeft.classList.add("active");
      $cursorLeft.style.top = mouseY + "px";
      $cursorLeft.style.left = mouseX + "px";
    } else if (
      mouseY >= rect.top &&
      mouseY <= rect.bottom &&
      mouseX >= leftSide &&
      mouseX <= rect.right
    ) {
      $cursor_s.style.display = "none";
      $cursor.style.display = "none";
      $cursorLeft.classList.remove("active");
      $cursorRight.classList.add("active");
      $cursorRight.style.top = mouseY + "px";
      $cursorRight.style.left = mouseX + "px";
    } else {
      document.querySelectorAll(".cursor").forEach(item => item.classList.remove("active"));
      $cursor_s.style.display = "block";
      $cursor.style.display = "block";
    }
  });

  // 버튼 호버시 커서스타일
  $button = document.querySelectorAll(".btn-primary");
  $button.forEach(btn =>
    btn.addEventListener("mouseenter", () => {
      $cursor.style.transition = "transform 0.4s ease";
      $cursor.style.transform = "scale(230%)";
    }),
  );
  $button.forEach(btn =>
    btn.addEventListener("mouseleave", () => {
      $cursor.style.transition = "none";
      $cursor.style.transform = "scale(100%)";
    }),
  );
});
