(function () {
  const items = document.querySelectorAll(".item");
  const sliderRow = document.querySelector(".slider__row");
  const wrapperRow = document.querySelector(".wrapper");

  let enableVerticalScroll = true;
  const deltaPosition = 90;

  const line = document.querySelector(".roadmap__line");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const itemId = entry.target.dataset.slide;
        const icon = document.querySelector(`[data-id="${itemId}"]`);

        icon.classList.add("_show");
        observer.unobserve(entry.target);
      } else {
        const itemId = entry.target.dataset.slide;
        const icon = document.querySelector(`[data-id="${itemId}"]`);

        icon.classList.remove("_show");
      }
    });
  });

  items.forEach((item) => {
    // observer.observe(item)
  });

  function isScrollIntoView(item) {
    const docViewLeft = sliderRow.scrollLeft;
    const docViewRight = docViewLeft + sliderRow.offsetWidth;
    const itemStart = item.offsetLeft;
    const itemEnd = itemStart + sliderRow.offsetWidth * 0.21;

    const itemId = item.dataset.slide;
    const icon = document.querySelector(`[data-id="${itemId}"]`);

    if (itemEnd <= docViewRight && itemStart >= docViewLeft) {
      icon.classList.add("_show");
    }
    if (!(itemEnd <= docViewRight)) {
      icon.classList.remove("_show");
    }
  }

  function scrollHorizontally(e) {
    e = window.event || e;
    var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
    sliderRow.scrollLeft -= delta * 100; // Multiplied by 10

    items.forEach((item) => {
      isScrollIntoView(item);
    });
  }

  function disableScroll() {
    window.scrollTo(window.scrollX, wrapperRow.offsetTop);

    document.body.style.marginTop = `-${wrapperRow.offsetTop}px`;
    document.body.style.position = "fixed";
    document.body.style.overflowY = "scroll";

    enableVerticalScroll = false;
  }

  function enableScroll(direct) {
    const scrollTop = -parseInt(document.body.style.marginTop, 10);
    document.body.style.position = "";
    document.body.style.overflowY = "";
    document.body.style.marginTop = "";
    window.scrollTo(window.scrollX, scrollTop - direct * deltaPosition);
    enableVerticalScroll = true;
  }

  function scrollVertically(e) {
    e = window.event || e;
    var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));

    if (enableVerticalScroll) {
      if (Math.abs(window.scrollY - wrapperRow.offsetTop) < deltaPosition) {
        disableScroll();
      }
    } else {
      if (delta > 0 && sliderRow.scrollLeft == 0) {
        enableScroll(delta);
      }
      if (delta < 0 && sliderRow.scrollLeft >= sliderRow.scrollWidth - sliderRow.clientWidth) {
        sliderRow.classList.add("BG"); //добавление класс в конце горизонтального слайдера
        enableScroll(delta);
      }
      scrollHorizontally(e);
    }
    console.log(
      delta,
      window.scrollY,
      sliderRow.scrollLeft,
      sliderRow.scrollWidth - sliderRow.clientWidth
    );
  }

  if (document.addEventListener) {
    // IE9, Chrome, Safari, Opera
    console.dir(sliderRow);
    //sliderRow.addEventListener('mousewheel', () => {
    document.addEventListener(
      "mousewheel",
      () => {
        scrollVertically();
      },
      false
    );
    // Firefox
    document.addEventListener("DOMMouseScroll", scrollVertically, false);
  } else {
    // IE 6/7/8
    document.attachEvent("onmousewheel", scrollVertically);
  }
})();
