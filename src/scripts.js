import "./styles.css";
import "normalize.css";

// Menu functionality:

// Toggles the visibility of the bottom menu when the top is clicked (in combination with the event listener below)
function toggleMenuVisibility() {
  const menuBottom = document.getElementById("menu_bottom");
  menuBottom.classList.toggle("hidden");
}

(function addMenuClickListener() {
  const menuTop = document.getElementById("menu_top");
  menuTop.addEventListener("click", () => {
    toggleMenuVisibility();
  });
})();

// Slideshow functionality:

// Initially sets the default/first slide to equal zero, which will be important for moving between slides and moving by clicking dots
let currentSlide = 0;
const slideElements = document.querySelectorAll(".slide");
const slidesContainer = document.getElementById("slides");
const totalSlides = slideElements.length;

// Initialising variables for the auto-scroll feature
let autoScrollInterval;
let autoScrollTimeout;

// This was being repeated, so it was easier to turn it into a function. Moves the slides div by exactly one width
function updateSlidesPosition() {
  slidesContainer.style.transform = `translateX(${-currentSlide * 20}%)`;
}

// Moves the slides to the right (unless it's at the limit, then it loops to the start), then updates the active dot
function moveSlidesRight() {
  console.log(`Moving slides right. Current slide is ${currentSlide}`);
  // If it's not on the last slide:
  if (currentSlide < totalSlides - 1) {
    currentSlide++;
  } else {
    currentSlide = 0;
  }
  updateSlidesPosition();
  updateActiveDot();
}

// Same as above, but the other way around!
function moveSlidesLeft() {
  console.log(`Moving slides left. Current slide is ${currentSlide}`);
  if (currentSlide > 0) {
    currentSlide--;
  } else {
    currentSlide = totalSlides - 1;
  }
  updateSlidesPosition();
  updateActiveDot();
}

// Adds click listeners that move the slideshow in the correct direction, then resets the timer for autoscroll
(function addArrowClickListeners() {
  const leftArrow = document.getElementById("left_button");
  const rightArrow = document.getElementById("right_button");

  leftArrow.addEventListener("click", () => {
    moveSlidesLeft();
    resetAutoScroll(5000);
  });

  rightArrow.addEventListener("click", () => {
    moveSlidesRight();
    resetAutoScroll(5000);
  });
})();

// Allows the user to click a dot and then access the corresponding slide. Also resets the timer.
(function addDotClickListeners() {
  const dots = document.querySelectorAll(".image_circle");

  dots.forEach((dot, index) => {
    dot.dataset.index = index;

    dot.addEventListener("click", () => {
      currentSlide = index;
      updateSlidesPosition();
      updateActiveDot();
      resetAutoScroll(5000);
    });
  });
  updateActiveDot();
})();

// Ensures that the correct dot is highlighted according to the slide
function updateActiveDot() {
  const dots = document.querySelectorAll(".image_circle");
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[currentSlide].classList.add("active");
}

// Starts with an auto-scroll of 3 seconds. If the user interacts, this changes temporarily to 5.
function startAutoScroll(delay = 3000) {
  autoScrollInterval = setInterval(moveSlidesRight, delay);
}

// Reset auto-scroll with specified delay (5 seconds for user interaction at the moment)
function resetAutoScroll(delay) {
  clearInterval(autoScrollInterval);
  clearTimeout(autoScrollTimeout);

  autoScrollTimeout = setTimeout(() => {
    startAutoScroll();
  }, delay);
}

// Starts the timer on page (DOM) load
document.addEventListener("DOMContentLoaded", () => {
  startAutoScroll();
});
