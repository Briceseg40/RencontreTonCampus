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
    let selectedStatutValue = null;
    for (const radio of statutRadios) {
        if (radio.checked) {
            statutSelected = true;
               selectedStatutValue = radio.value;
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
    let selectedRechercheValue = null;
    for (const radio of rechercheRadios) {
        if (radio.checked) {
            rechercheSelected = true;
                selectedRechercheValue = radio.value;
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
    let selectedOrientationValue = null;
    for (const radio of orientationRadios) {
        if (radio.checked) {
            orientationSelected = true;
              selectedOrientationValue = radio.value;
            break;
        }
    }
    if (!orientationSelected) {
        document.getElementById('orientation-error').textContent = 'Veuillez sélectionner une option.';
        isValid = false;
    } else {
        document.getElementById('orientation-error').textContent = '';
    }
    if (!isValid) {
        return;
    }
  
 const formData = {
        prenom: prenom || "Lucas",
        age: age + " ans" || "21 ans",
        ville: document.getElementById('ville').value || "Bayonne",
        taille: document.getElementById('taille').value ? document.getElementById('taille').value + "cm" : "1m85",
        description: document.getElementById('description').value || "Qqn de plutôt festif, qui adore le sport",
        statut: selectedStatutValue || "Célibataire",
        orientation: selectedOrientationValue || "Hétérosexuel",
        recherche:  selectedRechercheValue || "Des amis"
    };
   localStorage.setItem('formData', JSON.stringify(formData));
    window.location.href = '../../page/Creation-de-compte/questions2.html';
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