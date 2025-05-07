import {
  openModal,
  closeModal
} from "./components/modal.js";
import {
  createCard,
  deleteCard,
  likeCard
} from "./components/card.js";
import {
  initialCards
} from "./components/cards.js";
import "./pages/index.css"

const placesList = document.querySelector(".places__list");

const editPopup = document.querySelector(".popup_type_edit");
const profileEditButton = document.querySelector(".profile__edit-button");
const closeEditButton = editPopup.querySelector(".popup__close");
const editForm = document.querySelector('form[name="edit-profile"]');
const nameInput = editForm.querySelector(".popup__input_type_name");
const jobInput = editForm.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editSaveButton = editPopup.querySelector(".popup__button");
const cardActionHandlers = {
  handleDelete: deleteCard,
  likeCard: likeCard,
  handleImageClick: showImgPopup
};
// Popup редактирования профиля
profileEditButton.addEventListener("click", () => {
  openModal(editPopup);
  fillPopupEditInputs();
  editSaveButton.disabled = false;
});

closeEditButton.addEventListener("click", () => {
  closeModal(editPopup);
});

function fillPopupEditInputs() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

function handleEditForm(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;
  editSaveButton.disabled = true;
  closeModal(editPopup);
}
editForm.addEventListener("submit", handleEditForm);


// Popup добавления карточек
const addCardPopup = document.querySelector(".popup_type_new-card");
const openAddButton = document.querySelector(".profile__add-button");
const closeAddButton = addCardPopup.querySelector(".popup__close");
const addForm = document.querySelector('form[name="new-place"]');
const cardInput = addForm.querySelector(".popup__input_type_card-name");
const linkInput = addForm.querySelector(".popup__input_type_url");
const addSaveButton = addCardPopup.querySelector(".popup__button");

openAddButton.addEventListener("click", () => {
  openModal(addCardPopup);
  addForm.reset();
  addSaveButton.disabled = false;
});

closeAddButton.addEventListener("click", () => {
  closeModal(addCardPopup);
});

function showImgPopup(imageUrl, imageAlt) {
  openModal(imgPopup);
  zoomedPopupImage.setAttribute("src", imageUrl);
  zoomedPopupImage.setAttribute("alt", imageAlt);
  imgPopupCaption.textContent = imageAlt;
}

function handleAddForm(evt) {
  evt.preventDefault();
  const cardValue = cardInput.value;
  const linkValue = linkInput.value;
  // cardInput.textContent = cardValue;
  // linkInput.textContent = linkValue;
  const newCardData = {
      name: cardValue,
      link: linkValue,
      likes: []
  };
  
  const newCardElement = createCard(newCardData, cardActionHandlers);
  placesList.prepend(newCardElement);
  addSaveButton.disabled = true;

  closeModal(addCardPopup);
}

addForm.addEventListener("submit", handleAddForm);

//Popup с картинкой
const imgPopup = document.querySelector(".popup_type_image");
const closePhotoButton = imgPopup.querySelector(".popup__close");
const zoomedPopupImage = imgPopup.querySelector(".popup__image");
const imgPopupCaption = imgPopup.querySelector(".popup__caption");

closePhotoButton.addEventListener("click", () => {
  closeModal(imgPopup);
});

function renderCards(cards) {
  cards.forEach(cardData => {
      const cardElement = createCard(cardData, cardActionHandlers);
      placesList.append(cardElement);
  });
}

renderCards(initialCards);