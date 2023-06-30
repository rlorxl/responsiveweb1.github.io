let slider2 = document.querySelector('.store .slider');
let innerSlider = document.querySelector('.store .slider-inner');
let scrollBar = document.querySelector('.bar');

let pressed = false;
let startx;
let x;

// 클릭 유지 시
slider2.addEventListener('mousedown', (e) => {
  pressed = true;
  startx = e.offsetX - innerSlider.offsetLeft;
  // console.log(e.offsetX)

  // console.log(innerSlider.offsetLeft);
  slider2.style.cursor = 'grabbing';
});

slider2.addEventListener('mouseenter', () => {
  slider2.style.cursor = 'grab';
});

slider2.addEventListener('mouseup', () => {
  slider2.style.cursor = 'grab';
});

window.addEventListener('mouseup', () => {
  pressed = false;
});

slider2.addEventListener('mousemove', (e) => {
  if (!pressed) return;
  e.preventDefault;

  x = e.offsetX;

  innerSlider.style.left = `${x - startx}px`;

  checkboundary();
});

function checkboundary() {
  let outer = slider2.getBoundingClientRect();
  let inner = innerSlider.getBoundingClientRect();

  // console.log(outer);
  // console.log(inner);

  if (parseInt(innerSlider.style.left) > 0) {
    innerSlider.style.left = '0px';
  } else if (inner.right < outer.right) {
    innerSlider.style.left = `-${inner.width - outer.width}px`;
  }
}
