const mobileWidth = 990;
let windowWidth, lineCoords;
const line = document.querySelector('.profit__connector');
const lineWidth = parseInt(getComputedStyle(line).width);
const wrapper = document.querySelector('.profit__info-wrapper');
const infoBlocks = [...document.querySelectorAll('.profit__info')];
const points = [...document.querySelectorAll('.profit__pointer')];
const pointerWidth = parseInt(getComputedStyle(points[0]).width);
const pointsCoords = [];
const profitItems = [...document.querySelectorAll('.profit__item')];
const profitItemsCoords = [];

const getNeededCoords = () => {
  windowWidth = document.documentElement.clientWidth;

  if (windowWidth > mobileWidth) {
    lineCoords = line.getBoundingClientRect();

    points.forEach((point => {
      const pointCoords = point.getBoundingClientRect();
      pointsCoords.push({
        top: pointCoords.top,
        left: pointCoords.left,
        bottom: pointCoords.bottom,
        right: pointCoords.right
      });
    }));
  } else {
    profitItems.forEach((item => {
      const itemCoords = item.getBoundingClientRect();
      profitItemsCoords.push(itemCoords.y);
    }));
  }
};

getNeededCoords();

const drawLine = (i) => {
  const a = pointsCoords[i].bottom - pointerWidth / 2 - lineCoords.top - lineWidth / 2;
  const b = pointsCoords[i].left + pointerWidth / 2 - lineCoords.left + lineWidth / 2;
  const width = Math.sqrt(a * a + b * b);
  let deg = 180 / Math.PI * Math.atan2(a, b);
  deg = (deg + 360) % 360;
  line.style.width = width + 'px';
  line.style.transform = `rotate(${deg}deg)`;
};

const rotateLineToInitial = () => {
  line.style.transform = `rotate(0deg)`;
};

const showInfoBlock = (i) => {
  wrapper.classList.add('profit__info-wrapper_visible');
  infoBlocks[i].classList.add('profit__info_visible');
};

const positionInfoBlock = (i) => {
  if (i == 0) wrapper.style.top = profitItemsCoords[3] - wrapper.clientHeight + 'px';
  else if (i == 1) wrapper.style.top = profitItemsCoords[2] + 'px';
  else wrapper.style.top = profitItemsCoords[i] - wrapper.clientHeight + 'px';
};

const hideInfoBlock = (i) => {
  wrapper.classList.remove('profit__info-wrapper_visible');
  wrapper.style.top = 'initial';
  infoBlocks[i].classList.remove('profit__info_visible');
};

const showProfitInfo = (e) => {
  if (document.documentElement.clientWidth !== windowWidth) getNeededCoords();
  const i = e.target.closest('.profit__item').dataset.idx;
  showInfoBlock(i);
  if (windowWidth > mobileWidth) drawLine(i);
  else positionInfoBlock(i);
};

const hideProfitInfo = (e) => {
  const i = e.target.closest('.profit__item').dataset.idx;
  hideInfoBlock(i);
  rotateLineToInitial();
};

profitItems.forEach((item => {
  item.addEventListener('mouseenter', showProfitInfo);
  item.addEventListener('mouseleave', hideProfitInfo);
}));
