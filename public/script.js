const btnPopup = document.querySelector('.button--new');
const popup = document.querySelector('.instrument-toevoegen-popup');
const btnPopup2 = document.querySelector('.popup-sluiten')

btnPopup.addEventListener('click', () => {
    popup.classList.add('is-open');
});

btnPopup2.addEventListener('click', () => {
    popup.classList.remove('is-open');
});

