function openModal(modal) {
  modal.classList.add("popup_is-opened");
  modal.addEventListener("click", closePopupByClick);
  document.addEventListener("keydown", closePopupByEscape);
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  modal.classList.add("popup_is-animated");

  modal.removeEventListener("click", closePopupByClick);
  document.removeEventListener("keydown", closePopupByEscape);
}

const closePopupByEscape = (evt) => {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
};

const closePopupByClick = (evt) => {
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains("popup__close")
  ) {
    closeModal(evt.currentTarget);
  }
};

export { openModal, closeModal };
