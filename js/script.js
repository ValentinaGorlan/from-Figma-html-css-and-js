// 'use strict';

document.addEventListener("DOMContentLoaded", function () {
  // Burger menu
  const headerBtn = document.querySelector("header.top_header .wrapper"),
    menuContent = document.querySelector(
      " header.top_header .wrapper .nav_left"
    );

  function burgerMenu() {
    // if (window.matchMedia("(max-width: 770px)")) {
      // menuContent.style.display = "none";
      headerBtn.addEventListener("click", (e) => {
        const target = e.target;
        if (target.classList.contains("burger")) {
          target.classList.remove("burger");
          target.classList.add("burger_close");
          menuContent.style.display = "block";
        } else if (target.classList.contains("burger_close")) {
          target.classList.remove("burger_close");
          target.classList.add("burger");
          menuContent.style.display = "none";
        } else if (window.matchMedia("(min-width: 771px)")) {
          menuContent.style.display = "block";
        }
      // });
    });
  }

  burgerMenu();

  // Feedback Slider

  const sliders = (slides, dir, prev = false, next, display = "block") => {
    let slideIndex = 1,
      paused = false;

    const items = document.querySelectorAll(slides);

    function showSlides(n) {
      if (n > items.length) {
        slideIndex = 1;
      }

      if (n < 1) {
        slideIndex = items.length;
      }

      items.forEach((item) => {
        item.classList.add("animate__animated");
        item.style.display = "none";
      });

      items[slideIndex - 1].style.display = display;
    }

    showSlides(slideIndex);

    function plusSlides(n) {
      showSlides((slideIndex += n));
    }

    try {
      const nextBtn = document.querySelector(next);
      if (prev != false) {
        const prevBtn = document.querySelector(prev);

        prevBtn.addEventListener("click", (e) => {
          e.preventDefault();
          plusSlides(-1);
          items[slideIndex - 1].classList.remove("animate__slideInLeft");
          items[slideIndex - 1].classList.add("animate__slideInRight");
        });
      }

      nextBtn.addEventListener("click", (e) => {
        e.preventDefault();
        plusSlides(1);
        if (dir === "vertical") {
          items[slideIndex - 1].classList.add("animate__fadeInDown");
        } else {
          items[slideIndex - 1].classList.remove("animate__slideInRight");
          items[slideIndex - 1].classList.add("animate__slideInLeft");
        }
      });
    } catch (e) {
      console.log("Error!");
    }

    function activateAnimation() {
      if (dir === "vertical") {
        paused = setInterval(function () {
          plusSlides(1);
          items[slideIndex - 1].classList.add("animate__fadeInDown");
        }, 5000);
      } else {
        paused = setInterval(function () {
          plusSlides(1);
          items[slideIndex - 1].classList.remove("animate__slideInRight");
          items[slideIndex - 1].classList.add("animate__slideInLeft");
        }, 100000);
      }
    }

    activateAnimation();

    items[0].parentNode.addEventListener("mouseenter", () => {
      clearInterval(paused);
    });

    items[0].parentNode.addEventListener("mouseleave", () => {
      activateAnimation();
    });
  };

  sliders(
    ".feedback_block",
    "horizontal",
    ".feeddback_slider .prev",
    " .feeddback_slider .next",
    "flex"
  );

  sliders(
    ".section2 .wrapper .flex_block .left_block .services_block",
    "vertical",
    false,
    ".arrow_down"
  );

  // Tabs
  function tabs(
    tabsSelector,
    tabsContentSelector,
    tabsParentSelector,
    activeClass
  ) {
    const tabs = document.querySelectorAll(tabsSelector),
      tabsContent = document.querySelectorAll(tabsContentSelector),
      tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {
      tabsContent.forEach((item) => {
        item.style.display = "none";
        item.classList.remove("animate__fadeIn");
      });

      tabs.forEach((item) => {
        item.classList.remove(activeClass);
      });
    }

    function showTabContent(i = 0) {
      tabsContent[i].style.display = "flex";
      tabsContent[i].classList.add("animate__fadeIn");
      tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener("click", (event) => {
      const target = event.target;
      console.log(target);
      if (target && target.classList.contains(tabsSelector.slice(1))) {
        tabs.forEach((item, i) => {
          if (target == item) {
            hideTabContent();
            showTabContent(i);
          }
        });
      }
    });
  }

  tabs(
    ".mini_feedback_photo",
    ".feedback_block",
    ".customers",
    "customers_active"
  );

  let feedback = document.querySelectorAll(".feedback p.description");

  feedback.forEach((item) => {
    let dots;
    // let dots = document.createElement('button .show');
    // dots.innerHTML = "Показать полностью";
    const arr = item.textContent.trim().split(" ");

    arr.length > 70 ? (dots = "...") : (dots = ".");
    const feedbackText = arr.slice(0, 70).join(" ") + dots;
    item.textContent = feedbackText;
  });
});
