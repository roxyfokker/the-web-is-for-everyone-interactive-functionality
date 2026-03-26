const btnPopup = document.querySelector('.button--new');
const popup = document.querySelector('.instrument-popup');

btnPopup.addEventListener('click', () => {
    popup.classList.toggle('is-open');
});