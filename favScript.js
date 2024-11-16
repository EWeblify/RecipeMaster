document.addEventListener('DOMContentLoaded', function() {
  const favoriteBtns = document.querySelectorAll('.favorite-btn'); // Get all heart buttons

  favoriteBtns.forEach(btn => {
      const heartIcon = btn.querySelector('i'); // Get the heart icon
      const recipeBox = btn.closest('.recipe-box');
      const recipeId = recipeBox.getAttribute('data-id');  // Get the recipe ID
      const title = recipeBox.querySelector('span').textContent;  // Recipe title
      const image = recipeBox.querySelector('img').src;  // Recipe image URL
      const description = recipeBox.querySelector('p').textContent;  // Recipe description

      btn.addEventListener('click', function() {
          const recipe = {
              id: recipeId,
              title: title,
              image: image,
              description: description
          };

          let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

          // Check if the recipe is already in the favorites list
          const isFavorite = favorites.some(fav => fav.id === recipeId);

          if (!isFavorite) {
              // Add the recipe to favorites if it's not already in there
              favorites.push(recipe);
              heartIcon.classList.remove('far');
              heartIcon.classList.add('fas');
          } else {
              // Remove the recipe from favorites if it's already in there
              favorites = favorites.filter(fav => fav.id !== recipeId);
              heartIcon.classList.remove('fas');
              heartIcon.classList.add('far');
          }

          // Save the updated favorites array to localStorage
          localStorage.setItem('favorites', JSON.stringify(favorites));

          console.log('Updated Favorites:', favorites);  // Check the data in the console
      });
  });
});


document.addEventListener('DOMContentLoaded', function() {
  const favoritesList = document.getElementById('favorites-list');
  const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

  // Check if there are no favorites
  if (storedFavorites.length === 0) {
      favoritesList.innerHTML = "<p>No favorites yet.</p>";
  } else {
      // Loop through the favorites and create elements for each
      storedFavorites.forEach(fav => {
          // Create a new div for each recipe box
          const recipeDiv = document.createElement('div');
          recipeDiv.classList.add('recipe-box');
          recipeDiv.setAttribute('data-id', fav.id);  // Add the data-id attribute

          // Set the inner HTML of the recipe div, matching the structure of the explore page
          recipeDiv.innerHTML = `
           <section id="box-sec">
              <img src="${fav.image}" draggable="false" alt="recipe-img">
                <div id="recipe-box-text">
                    <span>5.0</span> <!-- Rating should go here -->
                    <span>10 Ratings</span>
                    <span>|</span>
                    <span>Ingredients:</span><span>10</span>
                    <span>|</span>
                    <span>Desi</span>
                    <p>${fav.description}</p>  <!-- Recipe description goes here -->
                    <hr>
                    <span>${fav.title}</span>  <!-- Recipe title goes here -->
                    <div class="favorite-btn">
                        <i class="fas fa-heart"></i> <!-- Filled heart icon -->
                    </div>
                </div>
              <section>
          `;

          // Append the recipe div to the favorites list
          favoritesList.appendChild(recipeDiv);
      });
  }
});
