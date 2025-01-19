const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const spinWheelBtn = document.getElementById('spin-wheel');
const wheelSound = document.getElementById('wheel-sound');
const resultDiv = document.getElementById('result');

const names = [
    "Emma", "Olivia", "Ava", "Isabella", "Sophia",
    "Mia", "Charlotte", "Amelia", "Evelyn", "Abigail",
    "Harper", "Emily", "Elizabeth", "Avery", "Sofia",
    "Ella", "Madison", "Scarlett", "Victoria", "Aria"
];

let rotation = 0;
let spinning = false;
let speed = 0;
let animationFrameId; // Stocker l'ID de l'animation

function drawWheel() {
    const segmentCount = names.length;
    const segmentAngle = 2 * Math.PI / segmentCount;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) * 0.9;

    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < segmentCount; i++) {
        const startAngle = i * segmentAngle + rotation;
        const endAngle = (i + 1) * segmentAngle + rotation;

        context.beginPath();
        context.moveTo(centerX, centerY);
        context.arc(centerX, centerY, radius, startAngle, endAngle);
        context.closePath();

        context.fillStyle = i % 2 === 0 ? '#FDF4F2' : '#FD9BC2';
        context.fill();

        context.save();
        context.translate(centerX, centerY);
        context.rotate(startAngle + segmentAngle / 2);
        context.textAlign = 'right';
        context.fillStyle = 'black';
        context.font = '16px Arial';
        context.fillText(names[i], radius * 0.8, 0);
        context.restore();
    }

    const needleWidth = 10;
    const needleHeight = 30;
    const needleBaseOffset = 10;
    context.beginPath();
    context.moveTo(centerX - needleWidth / 2, centerY - radius + needleBaseOffset);
    context.lineTo(centerX + needleWidth / 2, centerY - radius + needleBaseOffset);
    context.lineTo(centerX, centerY - radius - needleHeight);
    context.closePath();
    context.fillStyle = 'black';
    context.fill();
}

function spin() {
    if (spinning) return;
    spinning = true;
    wheelSound.currentTime = 0;
    wheelSound.play();
    resultDiv.innerText = "";

    speed = Math.random() * 0.8 + 0.9;
    let deceleration = 0.1;

    const startTime = Date.now();
    let lastSpeedUpdate = startTime;

    function animateSpin() {
      const currentTime = Date.now();
      const elapsedSinceLastUpdate = currentTime - lastSpeedUpdate;
            
      if (elapsedSinceLastUpdate >= 30) {
          deceleration = Math.min(deceleration + 0.00001, 0.0007);
          lastSpeedUpdate = currentTime;
        }
        rotation += speed;
        speed -= deceleration;

        if (speed <= 0) {
             stopSpin(); // Appeler la fonction pour arrêter la roue
                return;
        }
         drawWheel();
            animationFrameId = requestAnimationFrame(animateSpin);
        }
        animateSpin();
    }
      function stopSpin() {
    if (spinning) {
        spinning = false; // Arrêter le flag
        speed = 0; //  Mettre la vitesse à 0
       cancelAnimationFrame(animationFrameId); // Annuler la frame animation
        wheelSound.pause(); // Mettre le son en pause
        const segmentAngle = 2 * Math.PI / names.length; // Calcule l'angle d'un segment de la roue.
        const selectedIndex = Math.floor((3 * Math.PI / 2 - rotation) / segmentAngle) % names.length;
        const adjustedIndex = (selectedIndex + names.length) % names.length;
        drawWheel(); // Dessine la roue
        resultDiv.innerText = "Le prénom choisi est : " + names[adjustedIndex]; // Affiche le prénom
         createConfetti(); // Lance les confettis
    }
}


 function createConfetti() {
        const confettiContainer = document.createElement('div');
         confettiContainer.classList.add('confetti');
       document.body.appendChild(confettiContainer);

         const confettiCount = 100;
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
const style = document.createElement('style');
style.innerHTML = `
  @keyframes confetti-fall {
    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
    50% { opacity: 0.8; }
    100% { transform: translateY(95vh) rotate(360deg); opacity: 0; }
  }
  .confetti-piece {
    position: absolute;
    width: 10px;
    height: 10px;
  }
`;
document.head.appendChild(style);


drawWheel();
spinWheelBtn.addEventListener('click', spin);
canvas.addEventListener('click', spin);