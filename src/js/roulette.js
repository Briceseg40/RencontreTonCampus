const canvas = document.getElementById('canvas');
const likeButton = document.querySelector('.like-button');
const matchMessage = document.getElementById('match-message');
const context = canvas.getContext('2d');
const spinWheelBtn = document.getElementById('spin-wheel');
const wheelSound = document.getElementById('wheel-sound');
const resultDiv = document.getElementById('result');
const modal = document.getElementById("myModal"); // Récupère la modale
const span = document.getElementsByClassName("close")[0]; // Récupère le bouton de fermeture

const names = [
    "Emma", "Olivia", "Ava", "Isabella", "Sophia",
    "Mia", "Charlotte", "Amelia", "Evelyn", "Abigail",
    "Harper", "Emily", "Elizabeth", "Avery", "Sofia",
    "Ella", "Madison", "Scarlett", "Victoria", "Aria"
];

let rotation = 0;
let spinning = false;
let speed = 0;
let selectedName = "";
let selectedImage = "";
function showMatchMessage() {
    matchMessage.classList.remove('hidden');
    setTimeout(() => {
        matchMessage.classList.add('hidden');
    }, 2000);
}

likeButton.addEventListener('click', () => {
    nextProfile(true);
});

function nextProfile(liked) {
    if (liked) {
        showMatchMessage();
    }
    loadProfile(currentProfileIndex);
}

function drawWheel() {
    const segmentCount = names.length;
    const segmentAngle = 2 * Math.PI / segmentCount;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) * 0.8;

    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < segmentCount; i++) {
        const startAngle = i * segmentAngle + rotation;
        const endAngle = (i + 1) * segmentAngle + rotation;

        context.beginPath();
        context.moveTo(centerX, centerY);
        context.arc(centerX, centerY, radius, startAngle, endAngle);
        context.closePath();

        // Couleur du triangle
        context.fillStyle = i % 2 === 0 ? '#FDF4F2' : '#FD9BC2';
        context.fill();

        context.save();
        context.translate(centerX, centerY);
        context.rotate(startAngle + segmentAngle / 2);
        context.textAlign = 'right';

        // Couleur du texte en fonction de la couleur du triangle
        if (i % 2 === 0) {
            context.fillStyle = '#FD9BC2';
        } else {
            context.fillStyle = 'white';
        }

        context.font = '16px Arial';
        // Augmenter le rayon pour éloigner le texte du centre
        context.fillText(names[i], radius * 0.95, 0); // 0.95 au lieu de 0.8
        context.restore();
    }

    // Dessin de l'aiguille (triangle) - Correction ici
    const needleWidth = 10;
    const needleHeight = 30;
    const needleBaseOffset = 10;

    context.save();
    context.translate(centerX, centerY - radius); // Déplace l'origine au centre de la base de l'aiguille
    context.rotate(Math.PI); // Rotation de 180 degrés (π radians)

    context.beginPath();
    context.moveTo(-needleWidth / 2, needleBaseOffset); // Coin supérieur gauche de la base
    context.lineTo(needleWidth / 2, needleBaseOffset); // Coin supérieur droit de la base
    context.lineTo(0, -needleHeight); // Pointe de l'aiguille vers le haut (avant rotation)
    context.closePath();

    context.fillStyle = 'black';
    context.fill();
    context.restore(); // Restaure le contexte précédent
}

function spin() {
    if (spinning) return;
    spinning = true;
    wheelSound.currentTime = 0;
    wheelSound.play();
    resultDiv.innerText = "";

    speed = Math.random() * 0.4 + 0.5;
    let deceleration = 0.0005;

    const startTime = Date.now();
    let lastSpeedUpdate = startTime;

    function animateSpin() {
        const currentTime = Date.now();
        const elapsedSinceLastUpdate = currentTime - lastSpeedUpdate;

        if (elapsedSinceLastUpdate >= 30) {
            deceleration = Math.min(deceleration + 0.0005, 0.001);
            lastSpeedUpdate = currentTime;
        }

        rotation += speed;
        speed -= deceleration;

        if (speed <= 0) {
            speed = 0;
            const segmentAngle = 2 * Math.PI / names.length;
            const selectedIndex = Math.floor((3 * Math.PI / 2 - rotation) / segmentAngle) % names.length;
            const adjustedIndex = (selectedIndex + names.length) % names.length;
            selectedName = names[adjustedIndex];

            // Choix aléatoire d'une image parmi les 10 images de femmes
            const imageIndex = Math.floor(Math.random() * 10) + 1; // Génère un nombre aléatoire entre 1 et 10
            selectedImage = `../../img/femme${imageIndex}.jpg`; // Construit le nom de l'image

            drawWheel();
            spinning = false;
            wheelSound.pause();
            showModal(); // Affiche la modale
        }

        if (spinning) {
            drawWheel();
            requestAnimationFrame(animateSpin);
        }
    }

    animateSpin();
}

// Fonction pour afficher la modale
function showModal() {
    document.getElementById("modalImage").src = selectedImage;
    document.getElementById("modalName").innerText = selectedName;
    modal.style.display = "block";
}

// Ferme la modale quand on clique sur "x"
span.onclick = function () {
    modal.style.display = "none";
}

// Ferme la modale quand on clique en dehors de la modale
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Gestion des boutons Match et Unmatch
function handleAction(action) {
    if (action === 'match') {
        createConfetti(); // Ajoute les confettis
        modal.classList.add("modal-green")
    } else if (action === 'unmatch') {
        modal.classList.add("modal-red")

    }
       setTimeout(() => {
        modal.style.display = "none";
       modal.classList.remove("modal-green", "modal-red");
    }, 400);
}
document.getElementById("matchBtn").addEventListener('click', () => handleAction('match'));
document.getElementById("unmatchBtn").addEventListener('click', () => handleAction('unmatch'));


function createConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.classList.add('confetti');
    document.body.appendChild(confettiContainer);

    const confettiCount = 200;
    const colors = ['#FD9BC2', '#FDF4F2', '#f0f', '#0ff', '#ff0', '#0f0'];

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti-piece');
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.top = `${Math.random() * -100}vh`;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animation = `confetti-fall ${Math.random() * 3 + 1}s linear forwards`;
        confetti.style.animationDelay = `${Math.random() * 2}s`;

        confettiContainer.appendChild(confetti);

        confetti.addEventListener('animationend', () => {
            confetti.remove();
            if (confettiContainer.children.length === 0) {
                confettiContainer.remove();
            }
        });
    }
}

drawWheel();
spinWheelBtn.addEventListener('click', spin);
canvas.addEventListener('click', spin);

