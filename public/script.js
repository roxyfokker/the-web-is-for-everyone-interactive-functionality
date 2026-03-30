// Instrument toevoegen pop open en sluit met blur
const popup = document.querySelector('.instrument-toevoegen-popup');
const btnPopupOpen = document.querySelector('.button--new');
const btnPopupSluiten = document.querySelectorAll('.popup-sluiten, .annuleren')
const overlay = document.querySelector('.overlay');

btnPopupOpen.addEventListener('click', () => {
    popup.classList.add('is-open');
    overlay.classList.add('is-open');
    document.body.classList.add('no-scroll');
});

btnPopupSluiten.forEach(btn => {
    btn.addEventListener('click', () => {
        popup.classList.remove('is-open');
        overlay.classList.remove('is-open');
        document.body.classList.remove('no-scroll');
    });
});

overlay.addEventListener('click', () => {
    popup.classList.remove('is-open');
    overlay.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
});

// scrollen na toevoegen new blokeren
if (window.location.hash) {window.scrollTo(0, 0);}