import * as data from '../fake-data.js';

const $slider = document.querySelector('.slider-wrap');
const $collection = document.querySelector('.collection');

const selectionSelectors = {
  $slider: document.querySelector('.slider-wrap'),
  $innerSlide: $slider.querySelector('.inner-slide'),
  $prevBtn: document.querySelector('.prev'),
  $nextBtn: document.querySelector('.next'),
  $tabBtn: document.querySelectorAll('.selection-tab li a'),
};

const collectionSelectors = {
  $slider: document.querySelector('.collection'),
  $innerSlide: $collection.querySelector('.inner-slide'),
  $prevBtn: $collection.querySelector('.prev'),
  $nextBtn: $collection.querySelector('.next'),
};

export const carousel = (data, selectors) => {
  const { $slider, $innerSlide, $prevBtn, $nextBtn, $tabBtn } = selectors;

  const slideMargin = 20;
  let currentSlideId = 's1';
  let currentIdx = 0;
  let slideCount = data[currentSlideId].length;
  let size = 0;
  let isMoving = false;

  const render = (slideId = 's1') => {
    currentIdx = 0;
    // const $innerSlide = $slide;
    const carousels = data;
    $innerSlide.innerHTML = '';

    carousels[slideId].map((data) => {
      $innerSlide.insertAdjacentHTML(
        'beforeend',
        `
    <div class="item">
    <div class="selection-tmb">
        <div class="tmb-wrap" style="width:100%; height:100%;">
          <img src=${data.url} style="width:100%; height:100%; object-fit:cover;"/>
        </div>
        <div class="icons">
            <a>like</a>
            <a>bag</a>
            <a>search</a>
        </div>
    </div>
    <ul class="info">
        <li class="hash">#${data.hashTag}</li>
        <li class="tit">${data.title}</li>
        <li class="cost">${data.price}</li>
        <li><a href="#" class="btn-primary">ORDER</a></li>
    </ul>
  </div>
  `
      );
    });

    makeClone();
  };

  const makeClone = () => {
    const $slideItems = $innerSlide.querySelectorAll('.item');

    for (let i = 0; i < slideCount; i++) {
      let cloneSlide = $slideItems[i].cloneNode(true); // cloneNode(true) : a를 복사한다. true의 뜻 => 자식요소까지 있으면 모두 복사한다.
      cloneSlide.classList.add('clone');
      $innerSlide.append(cloneSlide);
    }
    for (let i = slideCount - 1; i >= 0; i--) {
      let cloneSlide = $slideItems[i].cloneNode(true);
      cloneSlide.classList.add('clone');
      $innerSlide.prepend(cloneSlide);
    }

    updateWidth();
    setPosition();
  };

  const updateWidth = () => {
    const $slideItems = $slider.querySelectorAll('.item');
    const newSlideCount = data[currentSlideId].length;
    size = $slideItems[0].clientWidth + slideMargin;
    const slideWidth = size * newSlideCount + 'px';
    $innerSlide.style.width = slideWidth;
  };

  const setPosition = () => {
    $innerSlide.style.transform = 'translateX(' + -size * slideCount + 'px)';
  };

  const moveSlide = (num) => {
    currentIdx = num;
    const moveWitdh = -size * slideCount + -num * size;
    $innerSlide.style.transform = 'translateX(' + moveWitdh + 'px)';
    $innerSlide.style.transition = '0.5s ease-out';
  };

  // EVENT
  $nextBtn.addEventListener('click', () => {
    if (isMoving) return;
    moveSlide(currentIdx + 1);
    isMoving = true;
  });

  $prevBtn.addEventListener('click', () => {
    if (isMoving) return;
    moveSlide(currentIdx - 1);
    isMoving = true;
  });

  $innerSlide.addEventListener('transitionend', () => {
    // loop
    if (currentIdx === slideCount || -currentIdx === slideCount) {
      $innerSlide.style.transition = 'none';
      $innerSlide.style.transform = 'translateX(' + -size * slideCount + 'px)';
      currentIdx = 0;
    }
    isMoving = false;
  });

  $tabBtn?.forEach((btn) =>
    btn.addEventListener('click', (e) => {
      e.preventDefault(); // prevent scroll top
      $innerSlide.style.transition = 'none'; // prevent first moving
      render(e.target.dataset.id);
    })
  );

  window.addEventListener('DOMContentLoaded', () => render());
};

// selection carousel
carousel(data.carouselData, selectionSelectors);
// collection carousel
carousel(data.collections, collectionSelectors);
