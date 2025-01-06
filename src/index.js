import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { renderCards } from "./scripts/card.js";
import { openModal, closeModal } from "./scripts/modal.js";
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
  
  const handleKeydown = (evt) => {
    if (evt.key === "Escape") {
      closeModal(editPopup, handleKeydown);
    }
  };
  
  editPopup.addEventListener("click", (evt) => {
    if (
      evt.target === editPopup ||
      evt.target.classList.contains("popup__close")
    ) {
      closeModal(editPopup);
    }
  });
  document.addEventListener("keydown", handleKeydown);
  openModal(editPopup);
});

editForm.addEventListener("submit", (evt) => {
  handleEditSubmit(evt, editPopup, profileName, profileJob);
});

addButton.addEventListener("click", () => {
  const handleKeydown = (evt) => {
    if (evt.key === "Escape") {
      closeModal(newCardPopup, handleKeydown);
    }
  };
  
  newCardPopup.addEventListener("click", (evt) => {
    if (
      evt.target === newCardPopup ||
      evt.target.classList.contains("popup__close")
    ) {
      closeModal(newCardPopup);
    }
  });
  document.addEventListener("keydown", handleKeydown);
  openModal(newCardPopup);
});

newCardForm.addEventListener("submit", (evt) => {
  handleNewCardSubmit(evt, newCardPopup);
});

renderCards(initialCards);
