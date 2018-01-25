function onFastClick(element, handler) {
  var delay = 300,
    offset = 10,
    still = true,
    startX = 0,
    startY = 0,
    touch;
  function longClick() {//排除长按
    still = false;
  }
  function start(e) {
    still = true;
    touch = e.touches[0];
    startX = touch.pageX;
    startY = touch.pageY;
    setTimeout(longClick, delay);
  }
  function move(e) {
    touch = e.touches[0];
    if (touch.pageX - startX >= offset || touch.pageY - startY >= offset) {//排除滑动
      still = false;
    }
  }
  function end(e) {
    clearTimeout(longClick);
    still && handler();
  }
  element.addEventListener("touchstart", start);
  element.addEventListener("touchmove", move);
  element.addEventListener("touchend", end);
  element.addEventListener("touchcancel", end);
}
onFastClick(document, function () {
  console.log("fastclick")
})
