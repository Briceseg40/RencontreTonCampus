const form = document.getElementById('questionnaireForm');

function validerFormulaire() {
    let isValid = true;

    // Validation du prénom
    const prenom = document.getElementById('prenom').value;
    if (prenom === '') {
        document.getElementById('prenom-error').textContent = 'Le prénom est obligatoire.';
        isValid = false;
    } else {
        document.getElementById('prenom-error').textContent = '';
    }

    // Validation de l'âge
    const age = document.getElementById('age').value;
    if (age === '') {
        document.getElementById('age-error').textContent = "L'âge est obligatoire.";
        isValid = false;
    } else {
        document.getElementById('age-error').textContent = '';
    }

    // Validation du statut
    const statutRadios = document.getElementsByName('statut');
    let statutSelected = false;
    for (const radio of statutRadios) {
        if (radio.checked) {
            statutSelected = true;
            break;
        }
    }
    if (!statutSelected) {
        document.getElementById('statut-error').textContent = 'Veuillez sélectionner un statut.';
        isValid = false;
    } else {
        document.getElementById('statut-error').textContent = '';
    }
    // Validation du recherche
    const rechercheRadios = document.getElementsByName('recherche');
    let rechercheSelected = false;
    for (const radio of rechercheRadios) {
        if (radio.checked) {
            rechercheSelected = true;
            break;
        }
    }
    if (!rechercheSelected) {
        document.getElementById('recherche-error').textContent = 'Veuillez sélectionner une option.';
        isValid = false;
    } else {
        document.getElementById('recherche-error').textContent = '';
    }
    // Validation de l'orientation
    const orientationRadios = document.getElementsByName('orientation');
    let orientationSelected = false;
    for (const radio of orientationRadios) {
        if (radio.checked) {
            orientationSelected = true;
            break;
        }
    }
    if (!orientationSelected) {
        document.getElementById('orientation-error').textContent = 'Veuillez sélectionner une option.';
        isValid = false;
    } else {
        document.getElementById('orientation-error').textContent = '';
    }

    // Si le formulaire n'est pas valide, on empêche le passage à la partie 2
    if (!isValid) {
        return;
    }

    // Si le formulaire est valide, on met à jour les informations du profil (comme avant)
    document.getElementById('profile-prenom').textContent = prenom || "Lucas";
    document.getElementById('profile-age').textContent = age || "21 ans";
    document.getElementById('profile-ville').textContent = document.getElementById('ville').value || "Bayonne";
    document.getElementById('profile-taille').textContent = (document.getElementById('taille').value ? document.getElementById('taille').value + "m" : "1m85");
    document.getElementById('profile-description').textContent = document.getElementById('description').value || "Qqn de plutôt festif, qui adore le sport";
    document.getElementById('profile-statut').textContent = getSelectedRadioLabel('statut') || "Célibataire";
    document.getElementById('profile-orientation').textContent = getSelectedRadioLabel('orientation') || "Hétérosexuel";
    document.getElementById('profile-recherche').textContent = getSelectedRadioLabel('recherche') || "Des amis";
    

    // Ici, vous pouvez ajouter le code pour passer à la partie 2 du formulaire
    // Par exemple, masquer la partie 1 et afficher la partie 2
    // alert("Passage à la partie 2 du formulaire !"); // Remplacer par votre logique de passage à la partie 2
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