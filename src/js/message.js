document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const messageText = document.getElementById('message-text');
    const sendButton = document.getElementById('send-button');
    const chatProfileImage = document.getElementById('chat-profile-image');
    const chatProfileName = document.getElementById('chat-profile-name');
    const chatProfileAge = document.getElementById('chat-profile-age');
    const showActionsButton = document.getElementById('show-actions-button');
    const actionsDropdown = document.getElementById('actions-dropdown');
    const reportButton = document.getElementById('report-button');
    const removeMatchButton = document.getElementById('remove-match-button');
    const messages = [
      {
            sender: "sarah",
            text: "Salut ! Comment ça va ?",
            type: "received"
        },
          {
            sender: "me",
             text: "Salut Sarah, ça va super et toi ?",
            type: "sent"
        },
          {
            sender: "sarah",
            text: "Super merci ! Tu fais quoi de beau en ce moment ?",
            type: "received"
        },
        {
            sender: "me",
             text: "Je suis en train de réviser mes partiels c'est la folie",
            type: "sent"
        },
    ];

     const profiles = [
        {
             name: "Sarah",
            age: 23,
            image: "../../img/sarah.png"
        },
            {
              name: "Lucas",
            age: 23,
             image: "../../img/lucas.png"
         },
    ];

    const currentProfile = profiles[0];

    function loadMessages() {
        chatProfileImage.src = currentProfile.image;
        chatProfileName.textContent = currentProfile.name + ", "; // Ajout de la virgule et d'un espace
        chatProfileAge.textContent = " " + currentProfile.age + " ans"; // Ajout de l'espace avant l'âge
        chatMessages.innerHTML = messages.map(message =>
           `<div class="message ${message.type}">
                ${message.text}
            </div>`
        ).join('');
           chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom
    }

   function showActionsDropdown(event) {
        event.stopPropagation();
         actionsDropdown.classList.toggle('hidden');
       }
     function hideActionsDropdown() {
      actionsDropdown.classList.add('hidden');
    }

    loadMessages();

   sendButton.addEventListener('click', () => {
        if (messageText.value.trim() !== '') {
            messages.push({
                sender: "me",
                text: messageText.value,
                type: "sent"
            });
            messageText.value = '';
             loadMessages();
        }
    });

    showActionsButton.addEventListener('click', showActionsDropdown);
     document.addEventListener('click', hideActionsDropdown); // Clic à l'extérieur de la dropdown la ferme

     reportButton.addEventListener('click', () => {
         alert("L'utilisateur a été signalé");
      hideActionsDropdown();
    })
    removeMatchButton.addEventListener('click', () => {
         alert("Vous avez supprimé le match");
     hideActionsDropdown();
    })
});