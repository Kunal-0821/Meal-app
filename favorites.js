// Function to load favorite meals from localStorage
function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const favContainer = document.getElementById("favContainer");
    favContainer.innerHTML = "";

    favorites.forEach(meal => {
        const mealDiv = document.createElement("div");
        mealDiv.classList.add("meal-card");
        mealDiv.innerHTML = `
            <img src="${meal.img}" alt="${meal.name}">
            <h3>${meal.name}</h3>
            <button onclick="removeFavorite(${meal.id})">Remove</button>
        `;
        favContainer.appendChild(mealDiv);
    });
}

// Function to remove a meal from favorites
function removeFavorite(id) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter(meal => meal.id !== id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    loadFavorites();
}

// Load favorites when page loads
loadFavorites();
