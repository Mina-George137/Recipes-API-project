let searchInput = document.getElementById("searchInput");
let mainBtn = document.getElementById("searchBtn");
let recipesArray = [];

mainBtn.addEventListener('click', function() {
    getData(searchInput.value);
})


async function getData(term) {
    let apiRequest = await fetch(`https://forkify-api.herokuapp.com/api/search?&q=${term}`);
    let allRecipes = await apiRequest.json();
    recipesArray = allRecipes.recipes;
    console.log(allRecipes.recipes);
    console.log(term);
    displayData();
}

function displayData() {
    let box = '';
    for (let i = 0; i < recipesArray.length; i++) {

        let myId = "'" + recipesArray[i].recipe_id + "'";
        box += `                           
        <div class="col-md-4 recipe p-2" onclick="getRecipeDetails(${myId})">
            <img src="${recipesArray[i].image_url}" alt="" class="w-100">
            <h3 class="color-mine py-1">${recipesArray[i].title}</h3>
            <p>Publisher : ${recipesArray[i].publisher}</p> 
            <p>Social rank : ${recipesArray[i].social_rank} </p>
        </div>`;
    }
    document.getElementById("recipesRow").innerHTML = box;

}

async function getRecipeDetails(id) {
    console.log(id);
    let apiRequest = await fetch(`https://forkify-api.herokuapp.com/api/get?&rId=${id}`);
    let details = await apiRequest.json();
    details = details.recipe;
    console.log(details)
    displayRecipeDetails(details);
}

function displayRecipeDetails(recipeDetails) {
    let box = ``;
    for (ingrediant of recipeDetails.ingredients) {
        box += `<ol class=" p-2"> <i class="fas fa-utensils"></i> ${ingrediant} </ol>`
    }

    let box1 = `
    <div class >
     <h3 class="color-mine py-1">${recipeDetails.title}</h3>
       
     <img src="${recipeDetails.image_url}" alt="" class="w-100">
     <ul class = "ingrediantes">
      ${box}
     </ul>
    </div>`;
    console.log("hello");

    document.getElementById("recipeDetails").innerHTML = box1;
}