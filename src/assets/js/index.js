// Import Swiper and modules
import Swiper, {
  Controller,
  Navigation,
  EffectFade,
} from "swiper/core";

// Install modules
Swiper.use([Controller, Navigation, EffectFade]);

const hairTypes = {
  a: "Жирный",
  b: "Нормальный",
  c: "Сухой",
};

const hairTypesR = {
  a: "жирной",
  b: "нормальной",
  c: "сухой",
};

const shampooTypes = {
  a: "1",
  b: "2",
  c: "3",
};

const swiper = new Swiper(".quiz__slider", {
  allowTouchMove: false,
  spaceBetween: 30,
  effect: "fade",
  loopPreventsSlide: false,
  // height: "adaptive",
});

// handle next click
const btnNextEls = document.querySelectorAll("button");
const radioBtnEls = document.querySelectorAll('input[type="radio"]');

btnNextEls.forEach((el) => {
  el.onclick = (event) => {
    const currentSlide = event.target.closest(".quiz__slide-content");
    const radioBtnEl = currentSlide.querySelector(
      'input[type="radio"]:checked'
    );
    const errorEl = document.createElement("p");
    errorEl.classList.add("error");

    if (radioBtnEl) {
      currentSlide.classList.remove("has-error");
    } else {
      if (!currentSlide.classList.contains("has-error")) {
        currentSlide.classList.add("has-error");
        errorEl.innerHTML = "Пожалуйста, выберите один из вариантов ответа";
        currentSlide.appendChild(errorEl);
      }
      return;
    }
    swiper.slideNext(300);
  };
});

radioBtnEls.forEach((el) => {
  el.onclick = (event) => {
    const currentSlide = event.target.closest(".quiz__slide-content");
    currentSlide.querySelector(".error") &&
      currentSlide.querySelector(".error").remove();
  };
});

// calc answers
const resultBtnEl = document.querySelector(".get-result");
const reinitBtnEl = document.querySelector(".new-test");

resultBtnEl.addEventListener("click", () => {
  reinitBtnEl.style.display = "inline-block";

  const checkedInputEls = document.querySelectorAll(
    'input[type="radio"]:checked'
  );
  const hairTypeEl = document.querySelector(".hair-type");
  const hairTypeREl = document.querySelector(".hair-type-r");
  const shampooTypeEl = document.querySelector(".shampoo-type");
  const resultCount = {
    a: 0,
    b: 0,
    c: 0,
  };
  checkedInputEls.forEach((el) => {
    if (el.dataset.type == "a") {
      resultCount.a += 1;
    }
    if (el.dataset.type == "b") {
      resultCount.b += 1;
    }
    if (el.dataset.type == "c") {
      resultCount.c += 1;
    }
  });

  const largest = Math.max(resultCount.a, resultCount.b, resultCount.c);

  switch (largest) {
    case resultCount.a:
      hairTypeEl.innerHTML = `<strong>${hairTypes.a}</strong>`;
      hairTypeREl.innerHTML = `<strong>${hairTypesR.a}</strong>`;
      shampooTypeEl.innerHTML = `<strong>${shampooTypes.a}</strong>`;
      break;
    case resultCount.b:
      hairTypeEl.innerHTML = `<strong>${hairTypes.b}</strong>`;
      hairTypeREl.innerHTML = `<strong>${hairTypesR.b}</strong>`;
      shampooTypeEl.innerHTML = `<strong>${shampooTypes.b}</strong>`;
      break;
    case resultCount.c:
      hairTypeEl.innerHTML = `<strong>${hairTypes.c}</strong>`;
      hairTypeREl.innerHTML = `<strong>${hairTypesR.c}</strong>`;
      shampooTypeEl.innerHTML = `<strong>${shampooTypes.c}</strong>`;
      break;
    default:
      hairTypeEl.innerHTML = `<strong>${hairTypes.b}</strong>`;
      hairTypeREl.innerHTML = `<strong>${hairTypesR.b}</strong>`;
      shampooTypeEl.innerHTML = `<strong>${shampooTypes.b}</strong>`;
  }
});

// reinit slider
reinitBtnEl.onclick = (event) => {
  event.target.style.display = "none";
  radioBtnEls.forEach(el => el.checked = false);
  swiper.slideTo(0, 0,false);
};
