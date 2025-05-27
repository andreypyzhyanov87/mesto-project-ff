import { putLike, deleteLike } from "./api.js";

export function createCard(cardData, cardTemplate, likeCard, showImgPopup, openDeletePopup, profileId) { 
  const cardElement = cardTemplate.cloneNode(true).querySelector('.card');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-count");
  const cardId = cardData._id;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCounter.textContent = cardData.likes.length;

  const isLiked = cardData.likes.some((like) => like._id === profileId);
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", () => {
    likeCard(likeButton, likeCounter, cardId);
  });

  cardImage.addEventListener("click", showImgPopup);


if (cardData.owner._id !== profileId) {
    deleteButton.classList.add("card__delete-button-unactive");
  } else {
    cardElement.addEventListener("click", () => {
      currentCardId = cardId;
      currentCardElement = cardElement;
      openDeletePopup();

    });
  }

  return cardElement;
}

export function likeCard(likeButton, likeCounter, cardId) {
  const likeMethod = likeButton.classList.contains(
    "card__like-button_is-active"
  )
    ? deleteLike
    : putLike;
  likeMethod(cardId)
    .then((updatedCard) => {
      likeButton.classList.toggle("card__like-button_is-active");
      likeCounter.textContent = updatedCard.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
}

let currentCardId;
let currentCardElement;
export function deleteCard() {
  return { cardId: currentCardId, cardElement: currentCardElement };
}
