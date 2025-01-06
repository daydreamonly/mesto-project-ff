import { openModal } from "./modal";

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");
const imagePopup = document.querySelector(".popup_type_image");

function createCard(item, { deleteCard, likeCard, openImageModal }) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  cardImage.addEventListener("click", () => {
    const imageSrc = item.link;
    const imageCaption = item.name;
    openImageModal(imageSrc, imageCaption);
  });

  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });

  likeButton.addEventListener("click", () => {
    likeCard(likeButton);
  });

  return cardElement;
}

function deleteCard(card) {
  card.remove();
}

function likeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

function openImageModal(imageSrc, imageCaption) {
  const image = document.querySelector(".popup__image");
  const imgCaption = document.querySelector(".popup__caption");

  image.src = imageSrc;
  imgCaption.textContent = imageCaption;
  openModal(imagePopup);
}

export { createCard, deleteCard, likeCard, openImageModal, placesList };
