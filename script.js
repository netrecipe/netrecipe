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

$(function (){
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

        // radio button on form gives user an opportunity to change mind and 
        // choose a "deselect" button
        // we reset this value to undefined before pushing tot he dietArray
        // so that the ajax call will ignore the dietLabel parameter
        if (recipeApp.dietLabel === "noValue") {
            recipeApp.dietLabel = undefined;
        }
        
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
        recipeApp.hits = recipeApp.getRecipes(recipeApp.mainIngredientValue, recipeApp.dietArray, recipeApp.healthArray);
        
        
        
    })
    
    
    //=================================================================================================
    // END OF SUBMIT EVENT
    //=================================================================================================
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
            // unwrap the recipes from the API result hits
            recipeApp.hits = result.hits.map(hit => hit.recipe);
            // put the recipes onto cards and attach to DOM
            recipeApp.generateCards(recipeApp.hits);
            // give the results a heading
            $('.resultsHeading').text("Dining Destinations"); 
        }).catch(result => {
        });    
    }   


    //=================================================================
    //=================================================================
    //=================================================================


    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // BUILDING CARD COMPONENTS AND EXTRACTING HIT DATA
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // an array of restriction objects mapping API recipe healthLabels with
    // restriction classes in our recipe card component.
    recipeApp.restrictionList = [
        {
            restrictionClass: ".veganFlag",
            healthLabel: "Vegan"
        },
        {
            restrictionClass: ".vegetarianFlag",
            healthLabel: "Vegetarian"
        },
        {
            restrictionClass: ".peanutFreeFlag",
            healthLabel: "Peanut-Free"
        },
        {
            restrictionClass: ".treeNutFreeFlag",
            healthLabel: "Tree-Nut-Free"
        },
        {
            restrictionClass: ".sugarConciousFlag",
            healthLabel: "Sugar-Conscious"
        },
        {
            restrictionClass: ".alcoholFreeFlag",
            healthLabel: "Alcohol-Free"
        },
    ];

    //================================================================
    // extract recipe image
    //================================================================

    //================================================================
    // checks which of the current recipe's health labels are included
    // in our list of available health labels
    //================================================================
    recipeApp.filterHealthRestrictions = (currentRecipeHit) => {
        return recipeApp.restrictionList.filter(restrictionObject => {
            return currentRecipeHit.healthLabels.includes(restrictionObject.healthLabel);
        });
    }
    //================================================================

    //================================================================
    // assigns a class to whichever recipe flags are checked in the 
    // current recipe's array of healthLabels.
    //================================================================
    recipeApp.applyHealthLabel = ($cardComponent, currentRecipeHit) => {
        const matchedRestrictionsArray = recipeApp.filterHealthRestrictions(currentRecipeHit);
        matchedRestrictionsArray.forEach(restriction => {
            $cardComponent.find(restriction.restrictionClass).addClass("highlightFlag").attr("aria-hidden", "false");
        })
    }


    recipeApp.buildCardElement = (recipeHit) => {
        // extract data from current recipe hit
        const cardRecipeName = recipeHit.label;
        const cardImageAltText = cardRecipeName;
        const cardURL = recipeHit.url;
        const cardImage = recipeHit.image;
        // ensure 'reduce' does not raise empty array error
        // by supplying at least one array element
        if (recipeHit.dietLabels.length == 0) {
            recipeHit.dietLabels = ['']
        }
        // scoop all of the recipe's diet labels into a string of list items
        // I tried to use .reduce to do this, but I couldn't figure it out.
        const cardDietLabelsString = recipeHit.dietLabels.map(label => {
            return `<li>${label}</li>`;
        }).join('');


        // template
        const cardTemplate = `
            <li class="card">
                <!-- this might be more accessible as a figure element -->
                <div class="recipeImageBox">
                    <img src=${cardImage} alt=${cardImageAltText}>
                </div>
                <div class="cardTextWrapper">
                    <p><a href="${cardURL}" target="window">${cardRecipeName}</a></p>
                    <ul class="dietaryList">
                        ${cardDietLabelsString}
                    </ul>
                    <ul class="concernsList">
                        <li class="veganFlag" aria-hidden>Vegan</li>
                        <li class="vegetarianFlag" aria-hidden="true">Vegetarian</li>
                        <li class="peanutFreeFlag" aria-hidden="true">Peanut-Free</li>
                        <li class="treeNutFreeFlag" aria-hidden="true">Tree-Nut-Free</li>
                        <li class="sugarConsciousFlag" aria-hidden="true">Sugar-Conscious</li>
                        <li class="alcoholFreeFlag" aria-hidden="true">Alcohol-Free</li>
                    </ul>
                </div>
            </li>
        `;
        // convert template string into DOM element
        const $cardComponent = $(cardTemplate);
        // highlight corresponding health restrictions
        recipeApp.applyHealthLabel($cardComponent, recipeHit);
        // return the DOM element version of the card
        return $cardComponent;
    }
    //================================================================


    //================================================================
    // appending card components to DOM
    //================================================================
    recipeApp.generateCards = () => {
        $('.recipeResults').empty();
        recipeApp.hits.forEach(hit => {
            $cardComponent = recipeApp.buildCardElement(hit);
            $('.recipeResults').append($cardComponent);
        })
        // hack to ensure odd-numbers of cards never get too wide 
        // for viewport on flex wrap
        $('.recipeResults').append('<li class="card"><li class="card">');
    }

});