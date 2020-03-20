let windowWidth, openedInfoBlock = null;
const mobileWidth = 768;
const line = document.querySelector('.profit__connector');
const lineWidth = parseInt(getComputedStyle(line).height);
const infoBlocksWrapper = document.querySelector('.profit__info-wrapper');
const profitsBlock = document.querySelector('.profit__items');
const infoBlocks = [...document.querySelectorAll('.profit__info')];
const points = [...document.querySelectorAll('.profit__pointer')];
const pointerWidth = parseInt(getComputedStyle(points[0]).width);
const pointsCoords = [];
const profitItems = [...document.querySelectorAll('.profit__item')];
const profitItemsCoords = [];

const getNeededCoords = () => {
  windowWidth = document.documentElement.clientWidth;
  profitItemsCoords.length = 0;
  pointsCoords.length = 0;

  if (windowWidth > mobileWidth) {
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

window.addEventListener("scroll", () => {
  resetInfoTopCoordsToInitial();
  getNeededCoords();
  if (openedInfoBlock && windowWidth <= mobileWidth) positionInfoBlock(openedInfoBlock);
})

getNeededCoords();

const drawLine = (i) => {
  const lineCoords = line.getBoundingClientRect();
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

const resetInfoTopCoordsToInitial = () => {
  infoBlocksWrapper.style.top = 'initial';
};

const showInfoBlock = (i) => {
  infoBlocksWrapper.classList.add('profit__info-wrapper_visible');
  infoBlocks[i].classList.add('profit__info_visible');
  openedInfoBlock = i;
};

const positionInfoBlock = (i) => {
  if (i == 0) infoBlocksWrapper.style.top = profitItemsCoords[3] + window.pageYOffset - infoBlocksWrapper.clientHeight + 'px';
  else if (i == 1) infoBlocksWrapper.style.top = profitItemsCoords[2] + window.pageYOffset + 'px';
  else infoBlocksWrapper.style.top = profitItemsCoords[i] - infoBlocksWrapper.clientHeight + window.pageYOffset + 'px';
};

const hideInfoBlock = (i) => {
  infoBlocksWrapper.classList.remove('profit__info-wrapper_visible');
  if (windowWidth <= mobileWidth) resetInfoTopCoordsToInitial();
  infoBlocks[i].classList.remove('profit__info_visible');
  openedInfoBlock = null;
};

const showProfitInfo = (e) => {
  if (document.documentElement.clientWidth !== windowWidth) getNeededCoords();
  const target = e.target.closest('.profit__item');
  if (!target) return;
  const i = target.dataset.idx;
  showInfoBlock(i);
  if (windowWidth > mobileWidth) drawLine(i);
  else positionInfoBlock(i);
};

const hideProfitInfo = (e) => {
  const target = e.target.closest('.profit__item');
  if (!target) return;
  const i = target.dataset.idx;
  hideInfoBlock(i);
  rotateLineToInitial();
};

profitsBlock.addEventListener('mouseover', showProfitInfo);
profitsBlock.addEventListener('mouseout', hideProfitInfo);

