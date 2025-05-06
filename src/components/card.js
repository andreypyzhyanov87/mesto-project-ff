export function createCard(cardData, actions) { 
  const cardTemplate = document.getElementById('card-template').content;
  const cardElement = cardTemplate.cloneNode(true).querySelector('.card');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  if (actions && actions.likeCard) {
    likeButton.addEventListener("click", () => {
      actions.likeCard(likeButton);
    });
  }
  if (actions && actions.handleImageClick) {
    cardImage.addEventListener("click", () => {
      actions.handleImageClick(cardData.link, cardData.name);
  });
  }
  if (actions && actions.handleDelete) {
    deleteButton.addEventListener('click', () => {
      actions.handleDelete(cardElement);
    });
  }
  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function likeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}