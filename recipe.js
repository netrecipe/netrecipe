
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// BUILDING CARD COMPONENTS AND EXTRACTING HIT DATA
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// an array of restriction objects mapping API recipe healthLabels with
// restriction classes in our recipe card component.
recipeApp.restrictionList = [
    {
        restrictionClass: "veganFlag",
        healthLabel: "Vegan"
    },
    {
        restrictionClass: "vegetarianFlag",
        healthLabel: "Vegetarian"
    },
    {
        restrictionClass: "peanutFreeFlag",
        healthLabel: "Peanut-Free"
    },
    {
        restrictionClass: "treeNutFreeFlag",
        healthLabel: "Tree-Nut-Free"
    },
    {
        restrictionClass: "sugarConciousFlag",
        healthLabel: "Sugar-Conscious"
    },
    {
        restrictionClass: "alcoholFreeFlag",
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
    recipeApp.restrictionList.filter( restrictionObject => {
        return currentRecipeHit.healthLabels.includes(restrictionObject.healthLabel);
    });
}
//================================================================

//================================================================
// assigns a class to whichever recipe flags are checked in the 
// current recipe's array of healthLabels.
//================================================================
recipeApp.applyHealthLabel = (cardComponent, currentRecipeHit) => {
    const matchedRestrictionsArray = recipeApp.filterHealthRestrictions(currentRecipeHit);
    matchedRestrictionsArray.forEach( restriction => {
        $(cardComponent).find(restriction.restrictionClass).addClass("highlightFlag")
    })
}


recipeApp.buildCardElement = (recipeHit) => {
    // extract data from current recipe hit
    const cardRecipeName = recipeHit.label;
    const cardImageAltText = cardRecipeName;
    const cardImage = recipeHit.image;


    // template
    const cardTemplate = `
        <li>
            <!-- this might be more accessible as a figure element -->
            <div class="recipeImageBox">
                <img src=${cardImage} alt=${cardImageAltText}>
            </div>
            <p>${cardRecipeName}<p>
            <div>
                <div>
                    <p>${cardDietLabel}</p>
                </div>
                <ul>
                    <li class="veganFlag">Vegan</li>
                    <li class="vegetarianFlag">Vegetarian</li>
                    <li class="peanutFreeFlag">Peanut-Free</li>
                    <li class="treeNutFreeFlag">Tree-Nut-Free</li>
                    <li class="sugarConsciousFlag">Sugar-Conscious</li>
                    <li class="alcoholFreeFlag">Alcohol-Free</li>
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

//================================================================