// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCards(arr) {
  arr.forEach((card) => {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const deleteButton = cardElement.querySelector(".card__delete-button");

    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardTitle.textContent = card.name;
    deleteButton.addEventListener("click", () => {
      deleteCard(cardElement);
    });

    return placesList.append(cardElement);
  });
}

// @todo: Функция удаления карточки
function deleteCard(card) {
  card.remove();
}

// @todo: Вывести карточки на страницу
createCards(initialCards);
