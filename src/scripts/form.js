import { closeModal } from "./modal";
import { createCard, deleteCard, placesList } from "./card";

const editForm = document.forms.editProfile;
const nameInput = editForm.elements.name;
const jobInput = editForm.elements.description;

function handleEditSubmit(evt, modal, name, description) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  name.textContent = nameValue;
  description.textContent = jobValue;

  closeModal(modal);
}

const newCardForm = document.forms.newPlace;
const cardInput = newCardForm.elements.placeName;
const urlInput = newCardForm.elements.link;

function handleNewCardSubmit(evt, modal) {
  evt.preventDefault();

  const cardValue = cardInput.value;
  const urlValue = urlInput.value;
  let newObj = { name: cardValue, link: urlValue };

  placesList.prepend(createCard(newObj, { deleteCard }));
  cardInput.value = "";
  urlInput.value = "";
  closeModal(modal);
}

export { handleEditSubmit, handleNewCardSubmit }