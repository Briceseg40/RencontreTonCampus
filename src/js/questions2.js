document.addEventListener('DOMContentLoaded', function() {
    const profilePrenom = document.getElementById('profile-prenom');
    const profileAge = document.getElementById('profile-age');
    const profileVille = document.getElementById('profile-ville');
    const profileTaille = document.getElementById('profile-taille');
    const profileDescription = document.getElementById('profile-description');
    const profileStatut = document.getElementById('profile-statut');
    const profileOrientation = document.getElementById('profile-orientation');
    const profileRecherche = document.getElementById('profile-recherche');
     const profileCitation = document.getElementById('profile-citation');
    const profilePassions = document.getElementById('profile-passions');
     const continueButton = document.querySelector('.button-container-form2 button');
     const form = document.getElementById('questionnaireForm');

    let storedData = localStorage.getItem('formData');

    if (storedData) {
        const formData = JSON.parse(storedData);
         profilePrenom.textContent = formData.prenom;
        profileAge.textContent = formData.age;
        profileVille.textContent = formData.ville;
        profileTaille.textContent = formData.taille;
         profileDescription.textContent = formData.description;
        profileStatut.value = formData.statut;
        profileOrientation.value = formData.orientation;
         profileRecherche.value = formData.recherche;
         localStorage.removeItem('formData');
      }
      continueButton.addEventListener('click', function(event){
           event.preventDefault();
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
             const citation = document.getElementById('description').value;
             if (citation === '') {
             document.getElementById('citation-error').textContent = 'Veuillez entrer votre citation préférée.';
              isValid = false;
             } else {
              document.getElementById('citation-error').textContent = '';
             }
        document.getElementById('profile-passions').textContent = passionsSelected.join(', ') || "Non spécifié";
          document.getElementById('profile-citation').textContent = citation || "Non spécifié";
       if(!isValid){
         return;
       }
          alert("Formulaire soumis avec succès !");
    })
});