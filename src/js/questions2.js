document.addEventListener('DOMContentLoaded', function() {
  const profilePrenom = document.getElementById('profile-prenom');
  const profileAge = document.getElementById('profile-age');
  const profileVille = document.getElementById('profile-ville');
  const profileTaille = document.getElementById('profile-taille');
  const profileDescription = document.getElementById('profile-description');
  const continueButton = document.querySelector('.button-container button');

  let storedData = localStorage.getItem('formData');

  if (storedData) {
      const formData = JSON.parse(storedData);
      profilePrenom.textContent = formData.prenom;
      profileAge.textContent = formData.age;
      profileVille.textContent = formData.ville;
      profileTaille.textContent = formData.taille;
      profileDescription.textContent = formData.description;
      localStorage.removeItem('formData'); 
  }

  continueButton.addEventListener('click', function(event) {
      event.preventDefault(); 
      alert("Formulaire soumis avec succès !");
      window.location.href = '../../page/Swipe/swipe.html'; 
  });
});