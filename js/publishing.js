const mobileWidth = 990;
let windowWidth = document.documentElement.clientWidth;
const line = document.querySelector(".profit__connector");
const wrapper = document.querySelector(".profit__info-wrapper");
const infoBlocks = [...document.querySelectorAll(".profit__info")];
const points = [...document.querySelectorAll(".profit__pointer")];
const pointsCoords = [];
const profitItems = [...document.querySelectorAll(".profit__item")];
const profitItemsCoords = [];

window.addEventListener("resize", () => {
  windowWidth = document.documentElement.clientWidth;
})

points.forEach((point => {
  const pointCoords = point.getBoundingClientRect();
  pointsCoords.push([pointCoords.x, pointCoords.y]);
}))

profitItems.forEach((item => {
  const itemCoords = item.getBoundingClientRect();
  profitItemsCoords.push(itemCoords.y);
}))

const drawLine = (i) => {
  const point = points[i];
  const lineCoords = line.getBoundingClientRect();
  const pointCoords = point.getBoundingClientRect();
  const a = pointCoords.bottom - 3 - lineCoords.top - 1;
  const b = pointCoords.left + 3 - lineCoords.left + 1;
  const width = Math.sqrt(a * a + b * b);
  let deg = 180 / Math.PI * Math.atan2(a, b);
  deg = (deg + 360) % 360;
  line.style.width = width + "px";
  line.style.transform = `rotate(${deg}deg)`;
}

const rotateLineToInitial = () => {
  line.style.transform = `rotate(0deg)`;
}

const showInfoBlock = (i) => {
  wrapper.classList.add("profit__info-wrapper_visible");
  infoBlocks[i].classList.add("profit__info_visible");
}

const positionInfoBlock = (i) => {
  if (i == 0) wrapper.style.top = profitItemsCoords[3] - wrapper.clientHeight + "px";
  else if (i == 1) wrapper.style.top = profitItemsCoords[2] + "px";
  else wrapper.style.top = profitItemsCoords[i] - wrapper.clientHeight + "px";
}

const hideInfoBlock = (i) => {
  wrapper.classList.remove("profit__info-wrapper_visible");
  wrapper.style.top = "initial";
  infoBlocks[i].classList.remove("profit__info_visible");
}

const showProfitInfo = (e) => {
  const i = e.target.closest(".profit__item").dataset.idx;
  showInfoBlock(i);
  if (windowWidth > mobileWidth) drawLine(i);
  else positionInfoBlock(i);
}

const hideProfitInfo = (e) => {
  const i = e.target.closest(".profit__item").dataset.idx;
  hideInfoBlock(i);
  rotateLineToInitial();
}

profitItems.forEach((item => {
  item.addEventListener("mouseenter", showProfitInfo);
  item.addEventListener("mouseleave", hideProfitInfo);
}))
