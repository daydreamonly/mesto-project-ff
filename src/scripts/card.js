import { deleteCardAPI, likeCardAPI, unlikeCardAPI } from "./api";

const cardTemplate = document.querySelector("#card-template").content;

function createCard(item, { openImageModal, openDeleteModal }, userInfo) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".like__counter");

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
      openDeleteModal(item, cardElement);
    });
  } else {
    deleteButton.style.display = "none";
  }

  likeButton.addEventListener("click", () => {
    const isSimillar = item.likes.some((el) => userInfo._id === el._id);
    const likeMethod = isSimillar ? unlikeCallback : likeCallback;

    likeMethod(item, likeButton, likeCounter);
  });

  const exist = item.likes.some((el) => userInfo._id === el._id);
  exist ? likeButton.classList.add("card__like-button_is-active") : "";

  return cardElement;
}

function deleteCard(item, cardElement) {
  deleteCardAPI(item._id).catch((err) => {
    console.log(err);
  });

  cardElement.remove();
}

function likeCallback(item, likeButton, likeCounter) {
  likeCardAPI(item._id)
    .then((res) => {
      item.likes = res.likes;
      likeCounter.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });

  likeButton.classList.add("card__like-button_is-active");
}

function unlikeCallback(item, likeButton, likeCounter) {
  unlikeCardAPI(item._id)
    .then((res) => {
      item.likes = res.likes;
      likeCounter.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });

  likeButton.classList.remove("card__like-button_is-active");
}

export { createCard, deleteCard };
