const form = document.getElementById('questionnaireForm');
let currentPart = 1; // 1 pour la première partie, 2 pour la deuxième

function validerFormulaire() {
    if (currentPart === 1) {
        let isValid = true;

        // Validation des champs de la première partie
        const prenom = document.getElementById('prenom').value;
        const age = document.getElementById('age').value;
        const statutRadios = document.getElementsByName('statut');
        const rechercheRadios = document.getElementsByName('recherche');
        const orientationRadios = document.getElementsByName('orientation');

        if (prenom === '') {
            document.getElementById('prenom-error').textContent = 'Le prénom est obligatoire.';
            isValid = false;
        } else {
            document.getElementById('prenom-error').textContent = '';
        }

        if (age === '') {
            document.getElementById('age-error').textContent = "L'âge est obligatoire.";
            isValid = false;
        } else {
            document.getElementById('age-error').textContent = '';
        }

        if (!isRadioSelected(statutRadios)) {
            document.getElementById('statut-error').textContent = 'Veuillez sélectionner un statut.';
            isValid = false;
        } else {
            document.getElementById('statut-error').textContent = '';
        }

        if (!isRadioSelected(rechercheRadios)) {
            document.getElementById('recherche-error').textContent = 'Veuillez sélectionner une option.';
            isValid = false;
        } else {
            document.getElementById('recherche-error').textContent = '';
        }

        if (!isRadioSelected(orientationRadios)) {
            document.getElementById('orientation-error').textContent = 'Veuillez sélectionner une option.';
            isValid = false;
        } else {
            document.getElementById('orientation-error').textContent = '';
        }

        if (!isValid) {
            return;
        }
        // Mettre à jour les informations du profil avec les données de la première partie
        document.getElementById('profile-prenom').textContent = prenom || "Lucas";
        document.getElementById('profile-age').textContent = age || "21 ans";
        document.getElementById('profile-ville').textContent = document.getElementById('ville').value || "Bayonne";
        document.getElementById('profile-taille').textContent = (document.getElementById('taille').value ? document.getElementById('taille').value + "m" : "1m85");
        document.getElementById('profile-description').textContent = document.getElementById('description').value || "Qqn de plutôt festif, qui adore le sport";
        document.getElementById('profile-statut').textContent = getSelectedRadioLabel('statut') || "Célibataire";
        document.getElementById('profile-orientation').textContent = getSelectedRadioLabel('orientation') || "Hétérosexuel";
        document.getElementById('profile-recherche').textContent = getSelectedRadioLabel('recherche') || "Des amis";

        // Masquer la première partie et afficher la deuxième
        
        currentPart = 2;
        document.querySelector('.progress-info').textContent = `${currentPart}/2`;
        document.querySelector('.button-container button').textContent = "J'ai terminé";

    } else if (currentPart === 2) {
        // Validation pour la deuxième partie
        let isValid = true;

        const passionsCheckboxes = document.getElementsByName('passions');
        let passionsSelected = [];
        for (const checkbox of passionsCheckboxes) {
            if (checkbox.checked) {
                passionsSelected.push(checkbox.value);
            }
        }
        if (passionsSelected.length === 0) {
            document.getElementById('passions-error').textContent = 'Veuillez sélectionner au moins une passion.';
            isValid = false;
        } else {
            document.getElementById('passions-error').textContent = '';
        }
        const citation = document.getElementById('citation').value;
        if (citation === '') {
            document.getElementById('citation-error').textContent = 'Veuillez entrer votre citation préférée.';
            isValid = false;
        } else {
            document.getElementById('citation-error').textContent = '';
        }
        // Mettre à jour les informations du profil avec les données de la première partie
        document.getElementById('profile-prenom').textContent = document.getElementById('prenom').value || "Lucas";
        document.getElementById('profile-age').textContent = document.getElementById('age').value || "21 ans";
        document.getElementById('profile-ville').textContent = document.getElementById('ville').value || "Bayonne";
        document.getElementById('profile-taille').textContent = (document.getElementById('taille').value ? document.getElementById('taille').value + "m" : "1m85");
        document.getElementById('profile-description').textContent = document.getElementById('description').value || "Qqn de plutôt festif, qui adore le sport";
        document.getElementById('profile-statut').textContent = getSelectedRadioLabel('statut') || "Célibataire";
        document.getElementById('profile-orientation').textContent = getSelectedRadioLabel('orientation') || "Hétérosexuel";
        document.getElementById('profile-recherche').textContent = getSelectedRadioLabel('recherche') || "Des amis";
        // Mettre à jour les informations du profil avec les données de la deuxième partie
        document.getElementById('profile-passions').textContent = passionsSelected.join(', ') || "Non spécifié";
        document.getElementById('profile-citation').textContent = citation || "Non spécifié";

        if (!isValid) {
            return;
        }

        // À ce stade, toutes les validations ont réussi, vous pouvez traiter les données du formulaire
        alert("Formulaire soumis avec succès !");
        // Ici, vous pouvez réinitialiser le formulaire ou le soumettre à un serveur
        // form.reset();
    }
}

function isRadioSelected(radios) {
    for (const radio of radios) {
        if (radio.checked) {
            return true;
        }
    }
    return false;
}
function getSelectedRadioLabel(radioGroupName) {
    const radios = document.getElementsByName(radioGroupName);
    for (const radio of radios) {
        if (radio.checked) {
            return radio.nextElementSibling.textContent;
        }
    }
    return null;
}