const carousel = document.querySelector('.film-carousel');
const itemContainer = document.querySelector('.film-item-wrap');
const filmTxt = document.querySelector('.text-wrap');

const prevButton = document.querySelector('#prev');
const nextButton = document.querySelector('#next');

let carouselItem = document.querySelectorAll('.film-item-wrap .imgBox');
let position = 0;
let idx = 1;
let counter = carouselItem.length;
let filmSize = Math.floor(carousel.offsetWidth / 1.14);

const data = [
  {
    name: 'film1',
    thumb: '../images/film1.jpeg',
  },
  {
    name: 'film2',
    thumb: '../images/film2.webp',
  },
  {
    name: 'film3',
    thumb: '../images/film3.webp',
  },
];

const text = [
  {
    title: '게임의 규칙',
    description:
      '2022년 봄-여름 레디 투 웨어 Dior 쇼의 장난스럽고, 팝하고, 매혹적인 시노그래피는 1960년대 이탈리아 예술계의 상징인 안나 파파라티의 유브르에 경의를 표합니다. 공간적이고 실험적인 기하학의 중심에 있는 개시의 여정은 예술과 삶의 법칙에 대한 고찰의 장소로서 게임을 기념합니다.',
  },
  {
    title: '인스퍼레이션',
    description:
      '당시 로마의 생기 넘치는 예술적 중심지였던 파이퍼 클럽의 매혹적인 분위기부터 마르크 보앙의 대담한 실루엣까지, 60년대로 여행을 떠나는 마리아 그라치아 치우리의 Dior 2022 봄-여름 여성 레디 투 웨어 컬렉션은 패션에 대한 새롭고 그 어느 때보다 자유로운 비전을 표현합니다.',
  },
  {
    title: '마지막 터치',
    description:
      '머스트 해브 하이라이트 아이템인 액세서리가 마리아 그라치아 치우리가 디자인한 Dior룩을 과감하게 완성합니다.',
  },
];

renderImages();
function renderImages() {
  data.forEach((item) => {
    itemContainer.innerHTML += `
        <div class="imgBox">
            <div class="item"><img src="${item.thumb}" alt="${item.name}"></div>
        </div>
        `;
  });
}

renderText();
function renderText() {
  filmTxt.innerHTML = `
    <h3>${text[position].title}</h3>
    <p>${text[position].description}</p>
    `;
}

carouselItem = document.querySelectorAll('.film-item-wrap .imgBox');

init();
function init(firstTime = true) {
  carouselItem.forEach((image, index) => {
    index++;

    const newSize = firstTime
      ? filmSize * index
      : filmSize * index - filmSize * position;

    if (newSize === filmSize) {
      image.style.transform = `scale(1)`;
      image.style.opacity = '1';
      image.style.marginLeft = '0';
      image.style.zIndex = '2';
    } else {
      image.style.transform = `translateX(${newSize / 2 - 300}px) scale(.8)`;
      image.style.opacity = '0.4';
      image.style.zIndex = '1';
    }
  });
}

changeNum();
function changeNum() {
  const cardIdx = document.querySelector('.card-idx');
  cardIdx.innerText = `${idx}/3`;
}

nextButton.addEventListener('click', () => {
  if (position >= 2) return false;
  ani();
  position++;
  renderText();
  changeNum(idx++);
  init(false);
});
prevButton.addEventListener('click', () => {
  if (position === 0) return false;
  ani();
  position--;
  renderText();
  changeNum(idx--);
  init(false);
});

function ani() {
  carouselItem.forEach((item) => {
    item.style.cssText = 'transition : .5s ease-out';
  });
}
