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
    recipeApp.dietLabel = $(`input.dietLabels[type=radio]:checked`).val();
    
    // =========================================================================================


    // =========================================================================================
    // CHECKBOXES
    // =========================================================================================

    // get values from checkboxes and push them to app array

    const healthElements = $(`input.health[type=checkbox]:checked`);  
    recipeApp.healthArray = [];

    for (let i = 0; i < healthElements.length; i++){
        recipeApp.healthArray.push($(healthElements[i]).val());
    }
    console.log(recipeApp.healthArray);


    // =========================================================================================

recipeApp.getRecipes(recipeApp.mainIngredientValue, recipeApp.dietLabel, recipeApp.healthArray);
})
   recipeApp.getRecipes = function(mainIngredient, dietLabel, healthArray){
        $.ajax({
        url: "https://api.edamam.com/search",
        method: "GET",
        dataType: "jsonp",
        data: {
            app_id: "b5bbacb1",
            app_key: "4bbe351691f8c9f0ff6ca6da4fb0382a",
            q: mainIngredient,
            diet: dietLabel,     // diet only accepts one value as a string            
            health: healthArray,  // health accepts multiple values in array
            
            
        }
    }).then(result => {
        console.log(result);
        console.log(healthArray)
    }).catch(result => {
        console.log("FAIL");
    });    
    }



