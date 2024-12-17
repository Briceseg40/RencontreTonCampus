const wheel = document.querySelector('.wheel');
const spinButton = document.querySelector('.spin-button');
let isSpinning = false;

spinButton.addEventListener('click', () => {
    if (isSpinning) {
        // Arrête la rotation et réinitialise la position
        wheel.classList.remove('spinning');
        wheel.style.transform = 'rotate(0deg)'; // Retour à la position initiale
        isSpinning = false;
    } else {
        // Démarre la rotation
        wheel.classList.add('spinning');
        isSpinning = true;
    }
});