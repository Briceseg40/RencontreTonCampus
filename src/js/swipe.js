document.addEventListener('DOMContentLoaded', function() {
    const likeButton = document.querySelector('.like-button');
    const dislikeButton = document.querySelector('.dislike-button');
    const matchMessage = document.getElementById('match-message');
    const prevImageButton = document.querySelector('.prev-image');
    const nextImageButton = document.querySelector('.next-image');
    const profileImage = document.getElementById('profile-image');
    const profileText = document.querySelector('.profile-text');


    let currentProfileIndex = 0;
    let profilesLiked = [];
    let currentImageIndex = 0;
    const profiles = [
       {
            name: "Sarah",
            age: 23,
            description: "Passionnée de voyage et de lecture.",
             images: ["../../img/sarah.jpg", "../../img/sarah2.jpg","../../img/sarah3.jpg"]
        },
        {
            name: "Lucas",
            age: 23,
            description: "Amateur de sports et de jeux vidéo.",
             images: ["../../img/lucas.jpg", "../../img/lucas2.jpg", "../../img/lucas3.jpg"]
        },
        {
            name: "Lea",
            age: 23,
            description: "Adepte de musique et de cuisine.",
            images: ["../../img/lea.jpg","../../img/lea2.jpg","../../img/lea3.jpg"]
        },
         {
            name: "Alex",
            age: 23,
            description: "Fan de cinéma et de randonnée.",
            images: ["../../img/alex.jpg","../../img/alex2.jpg","../../img/alex3.jpg"]
        },
         {
            name: "Madeline",
            age: 25,
            description: "Actrice à mes heures perdue",
            images: ["../../img/madeline.jpg","../../img/madeline2.jpg","../../img/madeline3.jpg"]
        },
    ];

    function loadProfile(profileIndex) {
        const profile = profiles[profileIndex % profiles.length];
        currentImageIndex = 0; 
          loadCurrentImage(profile);
         profileText.innerHTML = `
           <h2>${profile.name}, ${profile.age}</h2>
            <p>${profile.description}</p>
         `;
    }
       function loadCurrentImage(profile) {
        profileImage.src = profile.images[currentImageIndex % profile.images.length];

    }


      function showMatchMessage() {
        matchMessage.classList.remove('hidden');
        setTimeout(() => {
            matchMessage.classList.add('hidden');
        }, 2000);
    }

    function nextProfile(liked) {
         if (liked) {
            profilesLiked.push(currentProfileIndex);
            showMatchMessage();
        }
         currentProfileIndex++;
        loadProfile(currentProfileIndex);
    }

    loadProfile(currentProfileIndex);

    likeButton.addEventListener('click', () => {
        nextProfile(true);
    });

    dislikeButton.addEventListener('click', () => {
        nextProfile(false);
    });
      prevImageButton.addEventListener('click', () => {
       const profile = profiles[currentProfileIndex % profiles.length];
        currentImageIndex = (currentImageIndex - 1 + profile.images.length) % profile.images.length;
       loadCurrentImage(profile)
    });

    nextImageButton.addEventListener('click', () => {
           const profile = profiles[currentProfileIndex % profiles.length];
        currentImageIndex = (currentImageIndex + 1) % profile.images.length;
      loadCurrentImage(profile)
    });
});