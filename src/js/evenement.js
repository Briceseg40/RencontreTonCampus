document.addEventListener('DOMContentLoaded', function() {
    const accepterReglesCheckbox = document.getElementById('accepterRegles');
    const participerBtn = document.getElementById('participerBtn');

    accepterReglesCheckbox.addEventListener('change', function() {
        participerBtn.disabled = !this.checked;
    });

    participerBtn.addEventListener('click', function() {
        alert('Vous avez validé votre participation !');
        // Rediriger vers la page d'accueil
        window.location.href = "../../page/Accueil/accueil.html"; // Modifier l'URL si nécessaire
    });
});