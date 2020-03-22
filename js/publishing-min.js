"use strict";function _toConsumableArray(t){return _arrayWithoutHoles(t)||_iterableToArray(t)||_unsupportedIterableToArray(t)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(t,o){if(t){if("string"==typeof t)return _arrayLikeToArray(t,o);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(e):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?_arrayLikeToArray(t,o):void 0}}function _iterableToArray(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function _arrayWithoutHoles(t){if(Array.isArray(t))return _arrayLikeToArray(t)}function _arrayLikeToArray(t,o){(null==o||o>t.length)&&(o=t.length);for(var e=0,r=new Array(o);e<o;e++)r[e]=t[e];return r}var windowWidth,wrapperTopCoords,profitsBlockCoords,openedInfoBlock=null,mobileWidth=768,infoBlocksDesiredOffset=20,cloudsMovingDistance=-70,line=document.querySelector(".profit__connector");console.log(getComputedStyle(line));var lineWidth=parseInt(getComputedStyle(line).height),wrapper=document.querySelector(".profit__wrapper"),infoBlocksWrapper=document.querySelector(".profit__info-wrapper"),profitsBlock=document.querySelector(".profit__items"),infoBlocks=_toConsumableArray(document.querySelectorAll(".profit__info")),points=_toConsumableArray(document.querySelectorAll(".profit__pointer")),pointerWidth=parseInt(getComputedStyle(points[0]).width),profitItems=_toConsumableArray(document.querySelectorAll(".profit__item")),getItemsCoords=function(t){var o=[];return t.forEach((function(t){var e=t.getBoundingClientRect(),r={top:e.top,left:e.left,bottom:e.bottom,right:e.right};o.push(r)})),o},getItemsStyle=function(t,o){var e=[];return t.forEach((function(t){var r=parseInt(getComputedStyle(t)[o]);e.push(r)})),e},setInfoBlocksBehaviour=function(){var t=[],o=[],e=function(){windowWidth=document.documentElement.clientWidth,wrapperTopCoords=wrapper.getBoundingClientRect().top,o.length=0,t.length=0,windowWidth>mobileWidth?(profitsBlockCoords=profitsBlock.getBoundingClientRect().top,points.forEach((function(o){var e=o.getBoundingClientRect();t.push({top:e.top,left:e.left,bottom:e.bottom,right:e.right})}))):profitItems.forEach((function(t){var e=t.getBoundingClientRect();o.push(e.y-wrapperTopCoords)}))};window.addEventListener("scroll",(function(){e(),openedInfoBlock&&windowWidth<=mobileWidth&&i(openedInfoBlock),openedInfoBlock&&windowWidth>mobileWidth&&r(openedInfoBlock)})),e();var r=function(o){var e=line.getBoundingClientRect(),r=t[o].bottom-pointerWidth/2-e.top-lineWidth/2,n=t[o].left+pointerWidth/2-e.left+lineWidth/2,i=Math.sqrt(r*r+n*n),l=180/Math.PI*Math.atan2(r,n);l=(l+360)%360,line.style.width=i+"px",line.style["-moz-transform"]="rotate(".concat(l,"deg)"),line.style["-o-transform"]="rotate(".concat(l,"deg)"),line.style["-ms-transform"]="rotate(".concat(l,"deg)"),line.style["-webkit-transform"]="rotate(".concat(l,"deg)"),line.style.transform="rotate(".concat(l,"deg)")},n=function(){infoBlocksWrapper.style.top=windowWidth>mobileWidth?"":0},i=function(t){infoBlocksWrapper.style.top=0==t?o[3]-infoBlocksWrapper.clientHeight+"px":1==t?o[2]+"px":o[t]-infoBlocksWrapper.clientHeight+"px"};profitsBlock.addEventListener("mouseover",(function(t){document.documentElement.clientWidth!==windowWidth&&e();var o=t.target.closest(".profit__item");if(o){var n=o.dataset.idx;!function(t){infoBlocksWrapper.classList.add("profit__info-wrapper_visible"),infoBlocks[t].classList.add("profit__info_visible"),openedInfoBlock=t}(n),windowWidth>mobileWidth?(!function(){if(profitsBlockCoords<0){var t=profitsBlockCoords-wrapperTopCoords;infoBlocksWrapper.style.top=-profitsBlockCoords+t+infoBlocksDesiredOffset+"px"}}(),r(n)):i(n)}})),profitsBlock.addEventListener("mouseout",(function(t){var o=t.target.closest(".profit__item");o&&(!function(t){infoBlocksWrapper.classList.remove("profit__info-wrapper_visible"),infoBlocks[t].classList.remove("profit__info_visible"),n(),openedInfoBlock=null}(o.dataset.idx),line.style["-moz-transform"]="",line.style["-o-transform"]="",line.style["-ms-transform"]="",line.style["-webkit-transform"]="",line.style.transform="")}))},animateClouds=function(){var t=document.documentElement.clientHeight,o=Math.round(t/2),e=_toConsumableArray(document.querySelectorAll(".profit__cloud")),r=(getItemsStyle(e,"left"),getItemsCoords(e));window.addEventListener("scroll",(function(){r=getItemsCoords(e),e.forEach((function(t,e){r[e].top<=o&&(console.log("eee"),t.style["-moz-transform"]="translateX(".concat(cloudsMovingDistance,"px)"),t.style["-o-transform"]="translateX(".concat(cloudsMovingDistance,"px)"),t.style["-ms-transform"]="translateX(".concat(cloudsMovingDistance,"px)"),t.style["-webkit-transform"]="translateX(".concat(cloudsMovingDistance,"px)"),t.style.transform="translateX(".concat(cloudsMovingDistance,"px)")),r[e].top>o&&(t.style["-moz-transform"]="",t.style["-o-transform"]="",t.style["-ms-transform"]="",t.style["-webkit-transform"]="",t.style.transform="")}))}))};setInfoBlocksBehaviour(),animateClouds();
//# sourceMappingURL=publishing-min.js.map
