// Get references to the search box, meal container, and favorites button
const searchBox = document.getElementById("searchBox");
const mealContainer = document.getElementById("mealContainer");
const favBtn = document.getElementById("favBtn");

// Event listener for search input to fetch meals dynamically
searchBox.addEventListener("input", async () => {
    const query = searchBox.value.trim();

    // If search box is empty, clear results
    if (query.length === 0) {
        mealContainer.innerHTML = "";
        return;
    }

    // Fetch meals from the API based on search query
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await res.json();
    
    // Display the fetched meals
    displayMeals(data.meals);
});

// Function to display meals in the container
function displayMeals(meals) {
    mealContainer.innerHTML = "";
    
    if (!meals) return;

    meals.forEach(meal => {
        const mealCard = document.createElement("div");
        mealCard.classList.add("meal-card");
        mealCard.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
            <button onclick="viewMeal(${meal.idMeal})">View</button>
            <button onclick="toggleFavorite(${meal.idMeal}, '${meal.strMeal}', '${meal.strMealThumb}')">❤️</button>
        `;
        mealContainer.appendChild(mealCard);
    });
}

// Function to navigate to meal details page
function viewMeal(mealId) {
    window.location.href = `meal.html?id=${mealId}`;
}

// Function to add or remove meals from favorites
function toggleFavorite(id, name, img) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const exists = favorites.find(meal => meal.id === id);

    if (exists) {
        favorites = favorites.filter(meal => meal.id !== id);
    } else {
        favorites.push({ id, name, img });
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
}

// Redirect to favorites page
favBtn.addEventListener("click", () => {
    window.location.href = "favorites.html";
});
