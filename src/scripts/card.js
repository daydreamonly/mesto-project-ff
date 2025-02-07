import { deleteCardAPI, likeCardAPI, unlikeCardAPI } from "./api";
import { closeModal } from "./modal";

const cardTemplate = document.querySelector("#card-template").content;
const popupDeleteCard = document.querySelector(".popup__delete-card");

function createCard(
  item,
  { deleteCard, openImageModal, openDeleteModal },
  userInfo
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".like__counter");
  const buttonConfirm = document.querySelector(".button__confirm");

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  likeCounter.textContent = item.likes.length;

  cardImage.addEventListener("click", () => {
    const imageSrc = item.link;
    const imageCaption = item.name;
    openImageModal(imageSrc, imageCaption);
  });

  if (userInfo._id === item.owner._id) {
    deleteButton.addEventListener("click", () => {
      openDeleteModal();

      buttonConfirm.addEventListener("click", () => {
        deleteCardAPI(item._id).then(() => {
          deleteCard(cardElement);
          closeModal(popupDeleteCard);
        });
      });
    });
  } else {
    deleteButton.style.display = "none";
  }

  likeButton.addEventListener("click", () => {
    const isSimillar = item.likes.find((el) => userInfo._id === el._id);

    if (isSimillar) {
      unlikeCardAPI(item._id).then((res) => {
        item.likes = res.likes;
        likeCounter.textContent = res.likes.length;
      });
      likeButton.classList.remove("card__like-button_is-active");
    } else {
      likeCardAPI(item._id).then((res) => {
        item.likes = res.likes;
        likeCounter.textContent = res.likes.length;
      });
      likeButton.classList.add("card__like-button_is-active");
    }
  });

  const exist = item.likes.find((el) => userInfo._id === el._id);
  if (exist) {
    likeButton.classList.add("card__like-button_is-active");
  }
  return cardElement;
}

function deleteCard(card) {
  card.remove();
}

export { createCard, deleteCard };
