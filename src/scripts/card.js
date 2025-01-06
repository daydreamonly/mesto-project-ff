import { openModal, closeModal, openImageModal } from "./modal";

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");
const imagePopup = document.querySelector(".popup_type_image");

function createCard(item, { deleteCard }) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  cardElement.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("card__image")) {
      const imageSrc = evt.target.src;
      const imageCaption = evt.target.alt;
      
      const handleKeydown = (evt) => {
        if (evt.key === "Escape") {
          closeModal(imagePopup, handleKeydown);
        }
      };
      
      imagePopup.addEventListener("click", (evt) => {
        if (
          evt.target === imagePopup ||
          evt.target.classList.contains("popup__close")
        ) {
          closeModal(imagePopup);
        }
      });
      document.addEventListener("keydown", handleKeydown);
      openImageModal(imageSrc, imageCaption);
      openModal(imagePopup);
    }
    
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

function renderCards(arr) {
  arr.forEach((card) => {
    const cardElement = createCard(card, { deleteCard });
    return placesList.append(cardElement);
  });
}

export { createCard, deleteCard, renderCards, placesList };
