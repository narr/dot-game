const DOT_SIZE_MIN = 10;
const DOT_SIZE_MAX = 100;
const INTERVAL_TO_ADD_DOT = 1000;

let lastDotAddedTime;
let idRequestAnimationFrame;

// NOTE: returns a random number between min and max (both included)
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function triggerAnimationByTogglingClass(element, className) {
  element.classList.remove(className);
  // NOTE: To be sure that the styles are recalculated after remove the class above,
  // use window.requestAnimationFrame(), specifying a callback.
  // But the callback gets executed just before the next repaint of the document which
  // doesn't have the style recomputation yet. So to resolve it,
  // calls requestAnimationFrame() a second time. This time, the callback is run
  // before the next repaint, which is after the style recomputation has occurred.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      element.classList.add(className);
    });
  });
}

function getRandomBrightColor() {
  return `hsla(${random(0, 360)}, 100%, 50%, ${random(0.5, 1)})`;
}

function getGameZoneEl(index = 0) {
  return document.querySelectorAll('.game-zone')[index];
}

function getSpeedEl(index = 0) {
  return document.querySelectorAll('.speed-controller__speed')[index];
}

function getScoreIncreaseEl(index = 0) {
  return document.querySelectorAll('.score__increase')[index];
}

function createDot() {
  const el = document.createElement('div');
  el.className = 'dot';
  const size = random(DOT_SIZE_MIN, DOT_SIZE_MAX);
  Object.assign(el.style, {
    backgroundColor: getRandomBrightColor(),
    width: `${size}px`,
    height: `${size}px`,
    // NOTE: A dot should not "hang" off the left or right edge of the screen.
    left: `${random(0, getGameZoneEl().offsetWidth - DOT_SIZE_MAX)}px`,
    // NOTE: show half of it when it appears on the screen
    top: `-${size / 2}px`,
  });
  return el;
}

function initScoreIncrease() {
  getScoreIncreaseEl().addEventListener('animationend', e => {
    const scoreIncreaseEl = e.target;
    scoreIncreaseEl.classList.remove('score__increase--active');
    scoreIncreaseEl.textContent = '';
  });
}

function initSpeedController() {
  document
    .querySelectorAll('.speed-controller__slider')[0]
    // NOTE: use input event to update value while dragging
    .addEventListener('input', e => {
      getSpeedEl().textContent = e.target.value;
    });
}

function initStartStopBtn() {
  let init = false;
  document
    .querySelectorAll('.btn-start-stop')[0]
    .addEventListener('click', e => {
      if (!init) {
        handleStartBtnClick(e.target);
        init = true;
        return;
      }
      if (isGameStopped()) {
        handleStartBtnClick(e.target);
        return;
      }
      handleStopBtnClick(e.target);
    });
}

function isGameStopped() {
  return getGameZoneEl().classList.contains('game-zone--stopped');
}

function handleStartBtnClick(startStopBtn) {
  getGameZoneEl().classList.remove('game-zone--stopped');
  startStopBtn.textContent = 'PAUSE';
  startGame();
}

function startGame() {
  // NOTE: for smooth animation that closes to 60 FPS (approximately 60 times a second)
  window.requestAnimationFrame(startGameLoop);
}

function startGameLoop() {
  // NOTE: even consider checking the interval since it stops
  lastDotAddedTime = lastDotAddedTime || Date.now();
  (function loop() {
    idRequestAnimationFrame = requestAnimationFrame(loop);
    const now = Date.now();
    const delta = now - lastDotAddedTime;
    if (delta > INTERVAL_TO_ADD_DOT) {
      lastDotAddedTime = now;
      addDot();
    }
    updateDotPositions();
  })();
}

function addDot() {
  getGameZoneEl().appendChild(createDot());
}

function updateDotPositions() {
  const gameHeight = getGameZoneEl().offsetHeight;
  const speed = Number(getSpeedEl().textContent);
  document.querySelectorAll('.dot').forEach(dot => {
    const dotPosition = parseFloat(dot.style.top);
    if (dotPosition > gameHeight) {
      updateScore(
        -1 * getScoreIncrease(dot.offsetWidth, DOT_SIZE_MAX, DOT_SIZE_MIN)
      );
      removeDot(dot);
    } else {
      dot.style.top = `${dotPosition +
        getSpeedRateForRequestAnimationFrame(speed)}px`;
    }
  });
}

function removeDot(dot) {
  getGameZoneEl().removeChild(dot);
}

function getSpeedRateForRequestAnimationFrame(speedPerSecond) {
  // NOTE: requestAnimationFrame is called 60 times per second approximately
  const fps = 60;
  return speedPerSecond / fps;
}

function handleStopBtnClick(startStopBtn) {
  getGameZoneEl().classList.add('game-zone--stopped');
  startStopBtn.textContent = 'START';
  stopGame();
}

function stopGame() {
  cancelAnimationFrame(idRequestAnimationFrame);
}

function initGameZone() {
  // NOTE: If event listeners below are added to each 'dot' node, it will
  // increase the amount of event listeners (total memory footprint) on the page.
  // To avoid this, use event delegation here.
  getGameZoneEl().addEventListener('click', e => {
    if (e.target.matches('.dot') && !e.target.matches('.dot--pop')) {
      handleDotClick(e.target);
    }
  });
  getGameZoneEl().addEventListener('transitionend', e => {
    if (e.target.matches('.dot')) {
      removeDot(e.target);
    }
  });
}

function handleDotClick(dot) {
  updateScore(getScoreIncrease(dot.offsetWidth, DOT_SIZE_MAX, DOT_SIZE_MIN));
  dot.classList.add('dot--pop');
}

function getScoreIncrease(dotSize, dotSizeMax, dotSizeMin) {
  const minPoint = 1;
  const maxPoint = 10;
  const pointRange = maxPoint - minPoint;
  const pointPerOneRange = (dotSizeMax - dotSizeMin) / pointRange;
  return maxPoint - Math.ceil((dotSize - dotSizeMin) / pointPerOneRange);
}

function updateScore(increase) {
  const scoreEl = document.querySelectorAll('.score__value')[0];
  const currentScore = Number(scoreEl.textContent);
  if (currentScore + increase > 0) {
    scoreEl.textContent = currentScore + increase;
  } else {
    scoreEl.textContent = 0;
  }
  showScoreIncrease(increase);
}

function showScoreIncrease(increase) {
  const scoreIncreaseEl = getScoreIncreaseEl();
  if (increase > 0) {
    scoreIncreaseEl.textContent = `+${increase}`;
    scoreIncreaseEl.classList.remove('score__increase--minus');
    scoreIncreaseEl.classList.add('score__increase--plus');
  } else {
    scoreIncreaseEl.textContent = `${increase}`;
    scoreIncreaseEl.classList.remove('score__increase--plus');
    scoreIncreaseEl.classList.add('score__increase--minus');
  }
  triggerAnimationByTogglingClass(scoreIncreaseEl, 'score__increase--active');
}

function init() {
  initScoreIncrease();
  initSpeedController();
  initStartStopBtn();
  initGameZone();
}

init();
