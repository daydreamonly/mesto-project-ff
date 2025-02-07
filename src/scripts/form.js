import { openImageModal, openDeleteModal } from "../index";
import { closeModal } from "./modal";
import { createCard, deleteCard } from "./card";
import { placesList } from "../index";
import { getUser, postNewCard, updateAvatar, updateUserData } from "./api";

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

  name.textContent = nameValue;
  description.textContent = jobValue;

  updateUserData(nameValue, jobValue);

  closeModal(modal);
}

function handleNewCardSubmit(evt, modal) {
  evt.preventDefault();

  const cardValue = cardInput.value;
  const urlValue = urlInput.value;

  Promise.all([postNewCard(cardValue, urlValue), getUser()]).then(
    ([cardData, userInfo]) => {
      placesList.prepend(
        createCard(
          cardData,
          { deleteCard, openImageModal, openDeleteModal },
          userInfo
        )
      );
    }
  );

  newCardForm.reset();

  closeModal(modal);
}

function handleUpdateAvatar(evt, modal, profileImage) {
  evt.preventDefault();

  const urlValue = avatarUrlInput.value;

  updateAvatar(urlValue).then((res) => {
    profileImage.style.backgroundImage = `url(${res.avatar})`;
  });

  closeModal(modal);
}

export { handleEditSubmit, handleNewCardSubmit, handleUpdateAvatar };
