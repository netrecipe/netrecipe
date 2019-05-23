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


    // get values from form single-value inputs
    recipeApp.mainIngredientValue = $("#recipeForm :input").val();
    recipeApp.dietLabel = $(`input.dietLabels[type=radio]:checked`).val();
    
    // =========================================================================================

    // get values from checkboxes and push them to app array

    // ...starting with healthLabels class
    const healthLabelElements = $(`input.healthLabels[type=checkbox]:checked`);
    recipeApp.healthLabelArray = [];
    for (let i = 0; i < healthLabelElements.length; i++){
        recipeApp.healthLabelArray.push($(healthLabelElements[i]).val());
    }

    // ...and then the health class
    const healthElements = $(`input.health[type=checkbox]:checked`);  
    recipeApp.healthArray = [];

    for (let i = 0; i < healthElements.length; i++){
        recipeApp.healthArray.push($(healthElements[i]).val());
    }



    // =========================================================================================

recipeApp.getRecipes(recipeApp.mainIngredientValue, recipeApp.dietLabel, recipeApp.healthLabelArray, recipeApp.healthArray);
})
   recipeApp.getRecipes = function(mainIngredient, dietLabel, healthLabelArray, healthArray){
        $.ajax({
        url: "https://api.edamam.com/search",
        method: "GET",
        dataType: "jsonp",
        data: {
            app_id: "b5bbacb1",
            app_key: "4bbe351691f8c9f0ff6ca6da4fb0382a",
            q: mainIngredient,
            diet: dietLabel,     // diet only accepts one value as a string
            healthLabels: healthLabelArray,
            health: healthArray  // health accepts multiple values in array
        }
    }).then(result => {
        console.log(result);
    }).catch(result => {
        console.log("FAIL");
    });    
    }







//  if ((userChoice).is(':checked') === true) {
    
// };



    // const healthFilter = $(``).val();
    // const dietLabelFilter = $(``).val();
    // const healthLabelFilter = $(``).val();


    // const healthFilter = .params.health[array];
    // const dietLabels = .hits[array].recipe.dietLabels;
    // const healthLabels = .hits[array].recipe.healthLabels;

      // console.log(input[$()])


    // console.log($("#recipeForm :input"));

    

