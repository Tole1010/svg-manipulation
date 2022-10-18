const curve = document.querySelector("#curve");
const numberVal = document.querySelector("#numberVal");
const higherBtn = document.querySelector("#higher");
const lowerBtn = document.querySelector("#lower");

let counter = 0;

numberVal.innerHTML = counter;

let interval;

/**button event listeners */
const startEventListeners = ["mousedown", "touchstart"];
const stopEventListeners = ["mouseup", "mouseleave", "touchend"];

startEventListeners.forEach((evt) => {
  higherBtn.addEventListener(evt, function () {
    addAndUpdate(1);
    interval = setInterval(() => addAndUpdate(1), 50);
  });

  lowerBtn.addEventListener(evt, function () {
    addAndUpdate(-1);
    interval = setInterval(() => addAndUpdate(-1), 50);
  });
});

stopEventListeners.forEach((evt) => {
  higherBtn.addEventListener(evt, function () {
    clearInterval(interval);
  });

  lowerBtn.addEventListener(evt, function () {
    clearInterval(interval);
  });
});

/**Init */
updatePath();

/**Helper functions */
/**Update counter And HTML */
function addAndUpdate(i) {
  if (counter + i >= -100 && counter + i <= 100) {
    updatePath();
    counter += i;
    numberVal.innerHTML = counter;
  } else {
    clearInterval(interval);
  }
}

/**Scale range of numbers from range of numbers */
function scale(value, inMin, inMax, outMin, outMax) {
  const result =
    ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

  if (result < outMin) {
    return outMin;
  } else if (result > outMax) {
    return outMax;
  }

  return result;
}

/**Update curve path using middle value*/
function updatePath() {
  curve.setAttribute(
    "d",
    `M${50 + Math.abs(scale(counter, -100, 100, -30, 30))},${
      150 - scale(counter, -100, 100, -50, 50)
    } Q200,${scale(counter, -100, 100, 50, 250)} ${
      350 - Math.abs(scale(counter, -100, 100, -30, 30))
    },${150 - scale(counter, -100, 100, -50, 50)}`
  );
}
