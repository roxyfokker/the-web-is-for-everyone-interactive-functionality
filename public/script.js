// Instrument toevoegen pop open en sluit met blur
const popup = document.querySelector('.instrument-toevoegen-popup');
const btnPopupOpen = document.querySelector('.button--new');
const btnPopupSluiten = document.querySelectorAll('.popup-sluiten, .annuleren')
const overlay = document.querySelector('.overlay');

btnPopupOpen.addEventListener('click', () => {
    popup.classList.add('is-open');
    overlay.classList.add('is-open');
});

btnPopupSluiten.forEach(btn => {
    btn.addEventListener('click', () => {
        popup.classList.remove('is-open');
        overlay.classList.remove('is-open');
    });
});

// werkt niet 
const form = document.querySelector('form');
const melding = document.getElementById('form-melding');

form.addEventListener('submit', (event) => {
    if (!form.checkValidity()) {
        event.preventDefault(); 
        melding.classList.remove('hidden');
    }
});
