// Function to fetch and display meal details
async function fetchMealDetails() {
    // Get meal ID from URL parameters
    const params = new URLSearchParams(window.location.search);
    const mealId = params.get("id");

    // Fetch meal details from API
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    const data = await res.json();
    const meal = data.meals[0];

    // Display meal details
    document.getElementById("mealDetails").innerHTML = `
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <p>${meal.strInstructions}</p>
    `;
}

// Call function to fetch meal details when page loads
fetchMealDetails();
