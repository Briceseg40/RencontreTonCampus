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
    const matchList = document.getElementById('match-list');


  const users = [
        {
           id:1,
           name: "User1",
             matches: [1, 2, 4]
        }
    ];

      const profiles = [
        {
            id: 1,
              name: "Sarah",
            age: 23,
            image: "../../img/sarah.jpg",
            messages: [
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
            ]
       },
          {
              id: 2,
             name: "Lucas",
            age: 23,
             image: "../../img/lucas.jpg",
              messages: [
                 {
                 sender: "lucas",
                    text: "Salut ! ça va ?",
                  type: "received"
                 },
                 {
                 sender: "me",
                    text: "Hey, ca va niquel et toi ?",
                     type: "sent"
                  },
                  {
                   sender: "lucas",
                    text: "Super ! tu viens d'ou ?",
                   type: "received"
                 },
                 {
                  sender: "me",
                     text: "J'habite a Anglet",
                      type: "sent"
                   },
             ]
        },
         {
            id: 4,
              name: "Alex",
            age: 23,
            image: "../../img/alex.jpg",
            messages: [
                 {
                   sender: "alex",
                    text: "Hello!",
                    type: "received"
                 },
                 {
                 sender: "me",
                   text: "Salut Alex!",
                     type: "sent"
                 }
            ]
        },

    ];
    let currentUser = users[0];
    let currentProfile = null;



   function loadMessages(selectedProfile) {
      currentProfile = selectedProfile;
        chatProfileImage.src = currentProfile.image;
        chatProfileName.textContent = currentProfile.name + ", ";
        chatProfileAge.textContent =  currentProfile.age + " ans";
       chatMessages.innerHTML = currentProfile.messages.map(message =>
           `<div class="message ${message.type}">
                ${message.text}
            </div>`
        ).join('');
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

     function loadMatches() {
        const userMatches = currentUser.matches;
       const matchedProfiles = profiles.filter(profile => userMatches.includes(profile.id));

          matchList.innerHTML = matchedProfiles.map(profile => `
           <li class="match-item" data-profile-id="${profile.id}">
              <img src="${profile.image}" alt="Photo de profil de ${profile.name}">
                <span>${profile.name}, ${profile.age}</span>
             </li>
        `).join("");

    }

     function handleMatchClick(event) {
           const clickedMatch = event.target.closest('.match-item');
            if (clickedMatch) {
             const profileId = clickedMatch.dataset.profileId;
              const selectedProfile = profiles.find(profile => String(profile.id) === profileId);

               if (selectedProfile) {
                 loadMessages(selectedProfile);
                }
            }
      }

   function showActionsDropdown(event) {
        event.stopPropagation();
         actionsDropdown.classList.toggle('hidden');
       }
     function hideActionsDropdown() {
        actionsDropdown.classList.add('hidden');
     }

    loadMatches();
    if (currentUser.matches && currentUser.matches.length > 0) {
       const initialProfile = profiles.find(profile => profile.id === currentUser.matches[0]);
          if (initialProfile) {
            loadMessages(initialProfile);
          }
     }


   matchList.addEventListener('click', handleMatchClick);


   sendButton.addEventListener('click', () => {
       if (messageText.value.trim() !== '') {
            currentProfile.messages.push({
               sender: "me",
               text: messageText.value,
                 type: "sent"
            });
            messageText.value = '';
             loadMessages(currentProfile);
        }
    });

    showActionsButton.addEventListener('click', showActionsDropdown);
    document.addEventListener('click', hideActionsDropdown);

    reportButton.addEventListener('click', () => {
       alert("L'utilisateur a été signalé");
         hideActionsDropdown();
    })
   removeMatchButton.addEventListener('click', () => {
         alert("Vous avez supprimé le match");
         hideActionsDropdown();
   })
});