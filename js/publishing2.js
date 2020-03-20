const windowWidth = document.documentElement.clientWidth;
const line = document.querySelector('.profit__line');
const lineSvg = document.querySelector('.profit__lineSvg');
const wrapper = document.querySelector('.profit__info-wrapper');
const infoBlocks = [...document.querySelectorAll('.profit__info')];
const points = document.querySelectorAll('.profit__pointer');
const pointsCoords = [];

document.addEventListener('resize', () => {
  windowWidth = document.documentElement.clientWidth;
})

  [
...
points;
].
forEach((point => {
  const pointCoords = point.getBoundingClientRect();
  pointsCoords.push([pointCoords.x, pointCoords.y]);
}));

const drawLine = (i) => {
  const wrapper = document.querySelector('.profit__info-wrapper');
  const wrapperCoords = wrapper.getBoundingClientRect();
  const wrapperWidth = wrapper.clientWidth;
  const lineX = wrapperCoords.left - wrapperWidth / 2 - 1;
  const lineY = wrapperCoords.bottom;
  line.setAttribute('x1', lineX);
  line.setAttribute('y1', lineY);
  line.setAttribute('x2', pointsCoords[i][0]);
  line.setAttribute('y2', pointsCoords[i][1]);
  lineSvg.classList.add('.profit__lineSvg_visible');
};

const hideLine = () => {
  lineSvg.classList.remove('.profit__lineSvg_visible');
};

const showInfoBlock = (i) => {
  wrapper.classList.add('profit__info-wrapper_visible');
  infoBlocks[i].classList.add('profit__info_visible');
};

const hideInfoBlock = (i) => {
  wrapper.classList.remove('profit__info-wrapper_visible');
  infoBlocks[i].classList.remove('profit__info_visible');
};

const showProfitInfo = (e) => {
  const i = e.target.closest('.profit__item').dataset.idx;
  showInfoBlock(i);
  console.log(windowWidth);
  if (windowWidth > 990) drawLine(i);
};

const hideProfitInfo = (e) => {
  const i = e.target.closest('.profit__item').dataset.idx;
  hideInfoBlock(i);
  hideLine();
};

const profitItems = document.querySelectorAll('.profit__item');
[...profitItems].forEach((item => {
  item.addEventListener('mouseover', showProfitInfo);
  item.addEventListener('mouseout', hideProfitInfo);
}));
