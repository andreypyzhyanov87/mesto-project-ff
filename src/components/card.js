import {
  showImgPopup
} from '../index.js';
export function likeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

export function createCard(cardData, handleDelete, likeCard, showImgPopup) {
  const cardTemplate = document.getElementById('card-template').content;
  const cardElement = cardTemplate.cloneNode(true).querySelector('.card');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector(".card__like-button");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  likeButton.addEventListener("click", () => {
      likeCard(likeButton);
  });

  cardImage.addEventListener("click", showImgPopup);

  deleteButton.addEventListener('click', () => {
      handleDelete(cardElement);
  });

  return cardElement;
}
export function deleteCard(cardElement) {
  cardElement.remove();
}
const placesList = document.querySelector('.places__list');

function renderCards(cards) {
  cards.forEach(cardData => {
      const cardElement = createCard(cardData, deleteCard, likeCard, showImgPopup);
      placesList.append(cardElement);
  });
}

renderCards(initialCards);
