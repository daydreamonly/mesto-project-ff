import "./pages/index.css";
import { createCard, deleteCard } from "./scripts/card.js";
import { openModal } from "./scripts/modal.js";
import {
  handleEditSubmit,
  handleNewCardSubmit,
  handleUpdateAvatar,
} from "./scripts/form.js";
import { enableValidation, clearValidation } from "./scripts/validation.js";
import { getInitialCards, getUser } from "./scripts/api.js";

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const popupDeleteCard = document.querySelector(".popup__delete-card");
const popupUpdateAvatar = document.querySelector(".popup__update-avatar");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
export const placesList = document.querySelector(".places__list");
const editForm = document.forms.editProfile;
const newCardForm = document.forms.newPlace;
const updateAvatarForm = document.forms.updateAvatar;
const formNameInput = editForm.elements.name;
const formAboutInput = editForm.elements.description;

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export function openImageModal(imageSrc, imageCaption) {
  const image = document.querySelector(".popup__image");
  const imgCaption = document.querySelector(".popup__caption");

  image.src = imageSrc;
  imgCaption.textContent = imageCaption;
  openModal(imagePopup);
}

export function openDeleteModal() {
  openModal(popupDeleteCard);
}

editButton.addEventListener("click", () => {
  formNameInput.value = profileName.textContent;
  formAboutInput.value = profileJob.textContent;
  openModal(editPopup);
  clearValidation(editProfile, validationConfig);
});

editForm.addEventListener("submit", (evt) => {
  handleEditSubmit(evt, editPopup, profileName, profileJob);
});

profileImage.addEventListener("click", () => {
  openModal(popupUpdateAvatar);
});

updateAvatarForm.addEventListener("submit", (evt) => {
  handleUpdateAvatar(evt, popupUpdateAvatar, profileImage);
  clearValidation(updateAvatarForm, validationConfig);
});

addButton.addEventListener("click", () => {
  openModal(newCardPopup);
  newCardForm.reset();
  clearValidation(newCardForm, validationConfig);
});

newCardForm.addEventListener("submit", (evt) => {
  handleNewCardSubmit(evt, newCardPopup);
  clearValidation(newCardForm, validationConfig);
});

enableValidation(validationConfig);

Promise.all([getUser(), getInitialCards()]).then(([userInfo, cardsData]) => {
  profileName.textContent = userInfo.name;
  profileJob.textContent = userInfo.about;
  profileImage.style.backgroundImage = `url(${userInfo.avatar})`;

  cardsData.forEach((card) => {
    const cardElement = createCard(
      card,
      { deleteCard, openImageModal, openDeleteModal },
      userInfo
    );

    return placesList.append(cardElement);
  });
});
