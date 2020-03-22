import 'element-closest-polyfill';

let windowWidth, wrapperTopCoords, profitsBlockCoords, openedInfoBlock = null;
const mobileWidth = 768;
const infoBlocksDesiredOffset = 20;
const cloudsMovingDistance = -70;
const line = document.querySelector('.profit__connector');
const lineWidth = parseInt(getComputedStyle(line).height);
const wrapper = document.querySelector('.profit__wrapper');
const infoBlocksWrapper = document.querySelector('.profit__info-wrapper');
const profitsBlock = document.querySelector('.profit__items');
const infoBlocks = [...document.querySelectorAll('.profit__info')];
const points = [...document.querySelectorAll('.profit__pointer')];
const pointerWidth = parseInt(getComputedStyle(points[0]).width);
const profitItems = [...document.querySelectorAll('.profit__item')];

const getItemsCoords = (items) => {
  const itemsCoords = [];

  items.forEach(item => {
    const itemCoords = item.getBoundingClientRect();
    const coordsObj = {
      top: itemCoords.top,
      left: itemCoords.left,
      bottom: itemCoords.bottom,
      right: itemCoords.right
    };
    itemsCoords.push(coordsObj);
  })

  return itemsCoords;
}

const getItemsStyle = (items, property) => {
  const itemsStyle = [];
  items.forEach(item => {
    const itemStyle = parseInt(getComputedStyle(item)[property]);
    itemsStyle.push(itemStyle);
  })

  return itemsStyle;
}

// Блок с дополнительной информацией по каждому "сектору" горы

const setInfoBlocksBehaviour = () => {
  const pointsCoords = [];
  const profitItemsCoords = [];

  const getNeededCoords = () => {
    windowWidth = document.documentElement.clientWidth;
    wrapperTopCoords = wrapper.getBoundingClientRect().top;
    profitItemsCoords.length = 0;
    pointsCoords.length = 0;

    if (windowWidth > mobileWidth) {
      profitsBlockCoords = profitsBlock.getBoundingClientRect().top;
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
        profitItemsCoords.push(itemCoords.top - wrapperTopCoords);
      }));
    }
  };

  window.addEventListener("scroll", () => {
    getNeededCoords();
    if (openedInfoBlock && windowWidth <= mobileWidth) positionInfoBlockMobile(openedInfoBlock);
    if (openedInfoBlock && windowWidth > mobileWidth) {
      resetInfoTopCoordsToInitial;
      drawLine(openedInfoBlock);
    }
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
    line.style["-moz-transform"] = `rotate(${deg}deg)`;
    line.style["-o-transform"] = `rotate(${deg}deg)`;
    line.style["-ms-transform"] = `rotate(${deg}deg)`;
    line.style["-webkit-transform"] = `rotate(${deg}deg)`;
    line.style.transform = `rotate(${deg}deg)`;
  };

  const rotateLineToInitial = () => {
    line.style["-moz-transform"] = "";
    line.style["-o-transform"] = "";
    line.style["-ms-transform"] = "";
    line.style["-webkit-transform"] = "";
    line.style.transform = "";
  };

  const resetInfoTopCoordsToInitial = () => {
    infoBlocksWrapper.style.top = (windowWidth > mobileWidth) ? "" : 0;
  };

  const showInfoBlock = (i) => {
    infoBlocksWrapper.classList.add('profit__info-wrapper_visible');
    infoBlocks[i].classList.add('profit__info_visible');
    openedInfoBlock = i;
  };

  const positionInfoBlockMobile = (i) => {
    if (i == 0) infoBlocksWrapper.style.top = profitItemsCoords[3] - infoBlocksWrapper.clientHeight + 'px';
    else if (i == 1) infoBlocksWrapper.style.top = profitItemsCoords[2] + 'px';
    else infoBlocksWrapper.style.top = profitItemsCoords[i] - infoBlocksWrapper.clientHeight + 'px';
  };

  const positionInfoBlockDesktop = () => {
    if (profitsBlockCoords < 0) {
      const profitsBlockOffset = profitsBlockCoords - wrapperTopCoords;
      infoBlocksWrapper.style.top = -profitsBlockCoords + profitsBlockOffset + infoBlocksDesiredOffset + "px";
    }
  }

  const hideInfoBlock = (i) => {
    infoBlocksWrapper.classList.remove('profit__info-wrapper_visible');
    infoBlocks[i].classList.remove('profit__info_visible');
    resetInfoTopCoordsToInitial();
    openedInfoBlock = null;
  };

  const showProfitInfo = (e) => {
    if (document.documentElement.clientWidth !== windowWidth) getNeededCoords();
    const target = e.target.closest('.profit__item');
    if (!target) return;
    const i = target.dataset.idx;
    showInfoBlock(i);
    if (windowWidth > mobileWidth) {
      positionInfoBlockDesktop();
      drawLine(i);
    }
    else positionInfoBlockMobile(i);
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
}

// Анимация облаков в блоке с горой

const animateClouds = () => {
  const windowHeight = document.documentElement.clientHeight;
  const halfWindowHeight = Math.round(windowHeight / 2);
  const clouds = [...document.querySelectorAll(".profit__cloud")];
  const cloudsCoordsLeft = getItemsStyle(clouds, "left");
  let cloudsCoords = getItemsCoords(clouds);

  const animateCloudsOnScroll = () => {
    clouds.forEach((cloud, i) => {
      if (cloudsCoords[i].top <= halfWindowHeight) {
        cloud.style["-moz-transform"] = `translateX(${cloudsMovingDistance}px)`;
        cloud.style["-o-transform"] = `translateX(${cloudsMovingDistance}px)`;
        cloud.style["-ms-transform"] = `translateX(${cloudsMovingDistance}px)`;
        cloud.style["-webkit-transform"] = `translateX(${cloudsMovingDistance}px)`;
        cloud.style.transform = `translateX(${cloudsMovingDistance}px)`;
      }
      if (cloudsCoords[i].top > halfWindowHeight) {
        cloud.style["-moz-transform"] = "";
        cloud.style["-o-transform"] = "";
        cloud.style["-ms-transform"] = "";
        cloud.style["-webkit-transform"] = "";
        cloud.style.transform = "";
      }
    })

  }

  window.addEventListener("scroll", () => {
    cloudsCoords = getItemsCoords(clouds);
    animateCloudsOnScroll();
  })
};


setInfoBlocksBehaviour();
animateClouds();


