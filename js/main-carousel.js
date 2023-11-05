(() => {
  const $innerSlide = document.querySelector(".carousel-list");
  const $slideItems = document.querySelectorAll(".carousel-item");
  const $cursorLeft = document.querySelector(".cursor-left");
  const $cursorRight = document.querySelector(".cursor-right");
  // const $cursor = document.querySelector(".cursor-default");
  // const $cursor_s = document.querySelector(".cursor-small");

  const currentMargin = 100;
  const slideCount = $slideItems.length;
  let totalWidth = 0;
  let totalMoveWidth = 0;
  let currentIdx = 0;
  let isMoving = false;

  // * init -------------------------------------------------------------------------- * //
  // total width
  for (let i = 0; i < $slideItems.length; i++) {
    const itemWidth = $slideItems[i].clientWidth + currentMargin;
    totalWidth += itemWidth;
    $innerSlide.style.width = totalWidth * 3 + "px";
  }

  // make cloneNode(A)
  for (let i = 0; i < $slideItems.length; i++) {
    let clone = $slideItems[i].cloneNode(true);
    clone.classList.add("clone");
    $innerSlide.append(clone);
  }

  // make cloneNode(B)
  for (let i = $slideItems.length - 1; i >= 0; i--) {
    let clone = $slideItems[i].cloneNode(true);
    clone.classList.add("clone");
    $innerSlide.prepend(clone);
  }

  // * Functions -------------------------------------------------------------------------- * //
  const nextSlide = idx => {
    const $slideItems = document.querySelectorAll(".carousel-item");

    currentIdx = idx;

    const moveWidth = $slideItems[slideCount + currentIdx - 1].clientWidth + currentMargin; // 이전 아이템 너비만큼 움직여야 함.

    /*
      - currentIdx = 1
      - slideCount + currentIdx - 1 => 3 ($slideItems[3])
     */

    totalMoveWidth += moveWidth;

    $innerSlide.style.transform = `translateX(-${totalMoveWidth}px)`; // (전체너비 + 움직일 너비)로 값을 지정해야 현재 위치에서 움직일 너비를 더하는게 된다.
    $slideItems.forEach(item => item.classList.remove("active"));
    $slideItems[slideCount + currentIdx].classList.add("active");
    $innerSlide.style.transition = "0.1s ease-in-out"; // transitionend이벤트 때문에 0.1초 트랜지션을 준다.
  };

  const prevSlide = idx => {
    const $slideItems = document.querySelectorAll(".carousel-item");

    currentIdx = idx;

    const moveWidth = $slideItems[slideCount + currentIdx].clientWidth + currentMargin;

    totalMoveWidth -= moveWidth;

    $innerSlide.style.transform = `translateX(-${totalMoveWidth}px)`;
    $slideItems.forEach(item => item.classList.remove("active"));
    $slideItems[slideCount + currentIdx].classList.add("active");
    $innerSlide.style.transition = "0.1s ease-in-out";
  };

  const reset = () => {
    currentIdx = 0;
    $slideItems[currentIdx].classList.add("active");
    $innerSlide.style.transform = `translateX(-${totalWidth}px)`; // start position
    totalMoveWidth = totalWidth;
  };

  // * Event -------------------------------------------------------------------------- * //
  $innerSlide.addEventListener("transitionend", () => {
    // loop
    if (currentIdx === slideCount || -currentIdx === slideCount) {
      $innerSlide.style.transition = "none";
      reset();
    }

    isMoving = false;
  });

  $cursorLeft?.addEventListener("click", () => {
    if (isMoving) returrn;
    nextSlide(currentIdx + 1);
    isMoving = true;
  });

  $cursorRight?.addEventListener("click", () => {
    if (isMoving) return;
    prevSlide(currentIdx - 1);
    isMoving = false;
  });

  window.addEventListener("DOMContentLoaded", reset);
})();
