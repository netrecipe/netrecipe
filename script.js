// PSEUDO CODE

// MVP
// Add Edamam API
// include: q as part of API
// create drop-down menu to filter out search results.
// Drop down includes: 
// --- Beef
// --- Chicken
// --- Fish
// --- Vegetables
// limit search results to 5 results
// append the following to the DOM: 
// - Image
// - Name of recipe
// - Health labels and cautions 
// - quick look up link/url to recipe.


// STRETCH GOALS
// create search bar on DOM.  Searches can be by recipe name or ingredients
// on user input for search field, attach api from search bar.
// Filter for health.  Example: calories, allergies (peanuts)
// Filter for type of meal.  Example: breakfast, lunch, dinner
// Add the ability to create a profile
// Add the option to favourite recipes
// Add the option for a search history
// searc + // Add error handling

const recipeApp = {};



// this is done via ajax call to API, which passes the search to the query portion
const $searchForm = $("#recipeForm");
$("button").on("click", function(event) {
    event.preventDefault();

// =========================================================================================
// DROP DOWN - MAIN INGREDIENT
// =========================================================================================
    // get values from form single-value inputs
    recipeApp.mainIngredientValue = $("#recipeForm :input").val();


    // =========================================================================================
    // CHECKBOXES - DIET
    // =========================================================================================
    // Get values for 'diet' radio buttons
    recipeApp.dietArray = [];

    recipeApp.dietLabel = $(`input.diet[type=radio]:checked`).val();
    recipeApp.dietArray.push(recipeApp.dietLabel);


    
    // =========================================================================================


    // =========================================================================================
    // CHECKBOXES - HEALTH
    // =========================================================================================

    // get values from checkboxes and push them to app array

    const healthElements = $(`input.health[type=checkbox]:checked`);  
    recipeApp.healthArray = [];

    for (let i = 0; i < healthElements.length; i++){
        recipeApp.healthArray.push($(healthElements[i]).val());
    }


    // =========================================================================================
    recipeApp.getRecipes(recipeApp.mainIngredientValue, recipeApp.dietArray, recipeApp.healthArray);

})
recipeApp.getRecipes = function(mainIngredient, dietArray, healthArray){
    $.ajax({
        url: "https://api.edamam.com/search",
        method: "GET",
        dataType: "jsonp",
        traditional: true,
        data: {
            app_id: "b5bbacb1",
            app_key: "4bbe351691f8c9f0ff6ca6da4fb0382a",
            q: mainIngredient,
            diet: dietArray,  // diet only accepts one value as a string            
            health: healthArray  // health accepts multiple values in array
        },
        traditional: true
    }).then(result => {
        recipeApp.hits = result.hits;
        console.log(recipeApp.hits);
    }).catch(result => {
        console.log("FAIL");
    });    
}   






