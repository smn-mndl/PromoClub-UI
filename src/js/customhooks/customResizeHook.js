import { useState, useEffect } from "react";

const getWidth = () =>
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

export const useCurrentWidth = () => {
  // save current window width in the state object
  let [width, setWidth] = useState(getWidth());

  // in this case useEffect will execute only once because
  // it does not have any dependencies.
  useEffect(() => {
    const resizeListener = () => {
      // change width from the state object
      setWidth(getWidth());
    };
    // set resize listener
    window.addEventListener("resize", resizeListener);

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  return width;
};
let last_known_scroll_position = 0;
let ticking = false;
export const useScrollEffect = () => {
  // save current window width in the state object
  let [isScrollable, setIsScrollable] = useState(true);

  // in this case useEffect will execute only once because
  // it does not have any dependencies.
  useEffect(() => {
    const scrollListener = () => {
      // change width from the state object
      setIsScrollable(false);
      last_known_scroll_position = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(function () {
          doSomething(last_known_scroll_position);
          ticking = false;
        });

        ticking = true;
      }
    };
    // set scroll listener
    window.addEventListener("scroll", scrollListener);

    // clean up function
    return () => {
      // remove scroll listener
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return isScrollable;
};

function doSomething(scroll_pos) {
  // Do something with the scroll position
  console.log("scroll_pos", scroll_pos);
}

document.addEventListener("scroll", function (e) {
  last_known_scroll_position = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(function () {
      doSomething(last_known_scroll_position);
      ticking = false;
    });

    ticking = true;
  }
});
