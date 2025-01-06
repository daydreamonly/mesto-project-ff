function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal, handler) {
  modal.classList.remove("popup_is-opened");
  modal.classList.add("popup_is-animated");

  document.removeEventListener("keydown", handler);
}

function openImageModal(imageSrc, imageCaption) {
  const image = document.querySelector(".popup__image");
  const imgCaption = document.querySelector(".popup__caption");

  image.src = imageSrc;
  imgCaption.textContent = imageCaption;
}

export { openModal, closeModal, openImageModal };
