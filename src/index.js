import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import {
  createCard,
  deleteCard,
  likeCard,
  openImageModal,
  placesList,
} from "./scripts/card.js";
import { openModal } from "./scripts/modal.js";
import { handleEditSubmit, handleNewCardSubmit } from "./scripts/form.js";

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const editForm = document.forms.editProfile;
const newCardForm = document.forms.newPlace;
const formNameInput = editForm.elements.name;
const formAboutInput = editForm.elements.description;

editButton.addEventListener("click", () => {
  formNameInput.value = profileName.textContent;
  formAboutInput.value = profileJob.textContent;
  openModal(editPopup);
});

editForm.addEventListener("submit", (evt) => {
  handleEditSubmit(evt, editPopup, profileName, profileJob);
});

addButton.addEventListener("click", () => {
  openModal(newCardPopup);
});

newCardForm.addEventListener("submit", (evt) => {
  handleNewCardSubmit(evt, newCardPopup);
});

function renderCards(arr) {
  arr.forEach((card) => {
    const cardElement = createCard(card, {
      deleteCard,
      likeCard,
      openImageModal,
    });
    return placesList.append(cardElement);
  });
}

renderCards(initialCards);
