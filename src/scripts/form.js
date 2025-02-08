import { openImageModal, openDeleteModal } from "../index";
import { closeModal } from "./modal";
import { createCard } from "./card";
import { placesList } from "../index";
import { postNewCard, updateAvatar, updateUserData } from "./api";

const editForm = document.forms.editProfile;
const nameInput = editForm.elements.name;
const jobInput = editForm.elements.description;
const newCardForm = document.forms.newPlace;
const cardInput = newCardForm.elements.placeName;
const urlInput = newCardForm.elements.link;
const updateAvatarForm = document.forms.updateAvatar;
const avatarUrlInput = updateAvatarForm.elements.avatarLink;

function handleEditSubmit(evt, modal, name, description) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  updateUserData(nameValue, jobValue)
    .then((res) => {
      name.textContent = res.name;
      description.textContent = res.about;
    })
    .catch((err) => {
      console.log(err);
    });

  closeModal(modal);
}

function handleNewCardSubmit(evt, modal, userInfo) {
  evt.preventDefault();

  const cardValue = cardInput.value;
  const urlValue = urlInput.value;

  postNewCard(cardValue, urlValue)
    .then((cardData) => {
      placesList.prepend(
        createCard(cardData, { openImageModal, openDeleteModal }, userInfo)
      );
    })
    .catch((err) => {
      console.log(err);
    });

  newCardForm.reset();

  closeModal(modal);
}

function handleUpdateAvatar(evt, modal, profileImage) {
  evt.preventDefault();

  const urlValue = avatarUrlInput.value;

  updateAvatar(urlValue)
    .then((res) => {
      profileImage.style.backgroundImage = `url(${res.avatar})`;
    })
    .catch((err) => {
      console.log(err);
    });

  closeModal(modal);
}

export { handleEditSubmit, handleNewCardSubmit, handleUpdateAvatar };
