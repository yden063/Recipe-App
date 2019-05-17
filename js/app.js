import elementsDB from "./MockDB.js";

const recipes = document.querySelector('#recipes');
const searchForm = document.querySelector('#search');

if (searchForm) {

  document.getElementById('search').addEventListener('submit', function (e) {
    e.preventDefault();

    const searchText = document.querySelector('#search-text').value;
    console.log(searchText);

    // Search for a recipe and redirect 
    // to the search_results.html page
    getSearchResults(searchText);
  });
}

function getSearchResults(search) {
  sessionStorage.setItem('search', search);
  const resultsArray = new Array();

  const recipeList = JSON.parse(sessionStorage.getItem('recipes'));

  recipeList.forEach((recipe) => {
    if (recipe.name.toLowerCase().includes(search.toLowerCase()))
      resultsArray.push(recipe);
  });

  // Add object to the session storage 
  // and redirect to results page
  sessionStorage.setItem('results', JSON.stringify(resultsArray));
  window.location = 'search_results.html';
}

function displayResults() {
  // Extract session storage results
  const results = JSON.parse(sessionStorage.getItem('results'));
  const search = sessionStorage.getItem('search');
  const elementSearched = document.querySelector('#element-searched');

  // Displaying the h1 title
  elementSearched.innerHTML = `Results for ${search}`;

  // Rendering the results
  let output = '';

  results.forEach(element => {
    console.log(element);
    let difficulty = getFormattedDifficulty(element);

    output = `
      <div class='col-md-3' id='${element.id}'>
        <div class='well text-center'>
          <img class='poster' src='${element.poster}' />
          <a href='recipe_details.html'><h3>${element.name}</h3></a>
          ${difficulty}
        </div>
      </div>
    `;

    recipes.innerHTML += output;
  });
}

// Event: On a recipe click
if (recipes) {
  recipes.addEventListener('click', (e) => {
    const recipeId = e.target.parentNode.parentNode.parentNode.getAttribute('id');

    // Adding the id to session storage
    const recipe = JSON.stringify(getRecipeById(recipeId));
    sessionStorage.setItem('recipe_details', recipe);
  });
}

function getRecipeById(id) {
  // Search for the element
  const elements = JSON.parse(sessionStorage.getItem('recipes'));

  for (let index = 0; index < elements.length; index++) {
    const element = elements[index];

    if (element.id == id)
      return element;
  }

  return null;
}

function displayDetails() {
  const recipe = getRecipeObject();
  console.log(recipe);
  displayName();
  displayIngredients();
  displayDifficulty();
  displaySteps();
}

function displayName() {
  const name = document.querySelector('#name');
  const recipe = getRecipeObject();
  name.innerHTML = `${recipe.name}`;
}

function displayIngredients() {
  const ingredients = document.querySelector('#ingredients');
  const recipe = getRecipeObject();
  let output = '';

  recipe.ingredients.forEach((ingredient) => {
    output += `
      <p class='card-text'>${ingredient}</p>
    `;

    ingredients.innerHTML = output;
  });
}

function displayDifficulty() {
  const recipe = getRecipeObject();
  const difficulty = document.querySelector('#difficulty');

  difficulty.innerHTML = getFormattedDifficulty(recipe);
}

function displaySteps() {
  const steps = document.querySelector('#steps');
  const recipe = getRecipeObject();
  let output = '<ul class="list-group list-group-flush">';

  recipe.steps.forEach((step) => {
    output += `
    <li class='list-group-item'><span class='text-primary display-4'> ${step.order}</span>${step.description}</li>
    `;
  });

  output += '</ul>';
  steps.innerHTML = output;
}


function getRecipeObject() {
  return JSON.parse(sessionStorage.getItem('recipe_details'));
}

function getFormattedDifficulty(element) {
  // Pepper difficulty format
  const checkedPepper = '<i class="fas fa-pepper-hot checked"></i>';
  const normalPepper = '<i class="fas fa-pepper-hot"></i>';
  let difficulty = '';

  for (let index = 1; index <= 5; index++) {
    if (index <= element.difficulty)
      difficulty += checkedPepper;
    else
      difficulty += normalPepper;
  }

  return difficulty;
}

// Ingredients functionnality
const addIngredientBtn = document.querySelector('#add-ingredient-btn');

// Handle the adding event
if (addIngredientBtn) {
  addIngredientBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('adding an ingredient');
    const ingredient = document.querySelector('#recipe-ingredient-name').value;
    console.log(ingredient);
    const ingredients = getIngredientsFromSessionStorage();

    // Adding the ingredient to the list
    // and updating the session storage
    ingredients.push(ingredient);
    sessionStorage.setItem('ingredients', JSON.stringify(ingredients));

    displayTableIngredients(ingredients);

    // Clear the input
    document.querySelector('#recipe-ingredient-name').value = '';
  });
}

// Displaying the ingredients
function displayTableIngredients(ingredients) {
  ingredientsTBody.innerHTML = '';

  ingredients.forEach((ingredient, index) => {
    const output = `
      <th scope="row">${index + 1}</th>
      <td>${ingredient}</td>
      <td><button class='btn btn-danger'>X</button></td>
    `;

    const tr = document.createElement('tr');
    tr.setAttribute('id', `${ingredient}`);
    tr.innerHTML = output;
    ingredientsTBody.appendChild(tr);
  });
}

function displayElements() {
  const ingredients = getIngredientsFromSessionStorage();
  displayTableIngredients(ingredients);

  const steps = getStepsFromSession();
  displayStepsCollapse(steps);
}

function getIngredientsFromSessionStorage() {
  if (sessionStorage.getItem('ingredients') == null) {
    sessionStorage.setItem('ingredients', '[]');
  }

  const ingredientsStorage = sessionStorage.getItem('ingredients');
  const ingredients = JSON.parse(ingredientsStorage);

  return ingredients;
}

// Remove an ingredient
const ingredientsTBody = document.querySelector('#ingredients');
if (ingredientsTBody) {
  ingredientsTBody.addEventListener('click', (e) => {
    e.preventDefault();

    const tBodyNode = e.target.parentNode.parentNode.parentNode;
    const trNode = e.target.parentNode.parentNode;
    const ingredientName = trNode.getAttribute('id');
    //tBodyNode.removeChild(trNode);

    const ingredients = getIngredientsFromSessionStorage();
    const ingredientsNew = new Array();

    ingredients.forEach((ingredient) => {
      if (ingredient != ingredientName) {
        console.log(ingredient);
        console.log(ingredientName);
        ingredientsNew.push(ingredient);
      }
    });

    sessionStorage.setItem('ingredients', JSON.stringify(ingredientsNew));
    displayTableIngredients(ingredientsNew);
  });
}

// Steps functionnality
const stepsDiv = document.querySelector('#steps');
const addStepBtn = document.querySelector('#add-step-btn');

// Handle event
if (addStepBtn) {
  addStepBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const description = document.querySelector('#recipe-step-text').value;
    const steps = getStepsFromSession();
    const step = getStepObjectFromText(description, steps.length + 1);

    steps.push(step);
    console.log(steps);

    addToSessionStorage(steps);
    displayStepsCollapse(steps);
  });
}

function getStepObjectFromText(description, order) {
  const step = {
    'order': `${order}`,
    'description': `${description}`
  };

  return step;
}

function getStepsFromSession() {
  if (sessionStorage.getItem('steps') == null) {
    sessionStorage.setItem('steps', '[]');
  }

  const steps = JSON.parse(sessionStorage.getItem('steps'));

  return steps;
}

function addToSessionStorage(steps) {
  sessionStorage.setItem('steps', JSON.stringify(steps));
}

function displayStepsCollapse(steps) {
  // Clear the previous elements
  stepsDiv.innerHTML = '';

  steps.forEach((step) => {
    console.log(step.order);
    // Create the different elements
    const card = createCard();
    const link = createLink(step);
    const collapse = createCollapse(step);

    // Adding the link reference
    // and collapse to the card
    card.appendChild(link);
    card.appendChild(collapse);

    // Adding the card to the steps div
    stepsDiv.appendChild(card);
  });
}

function createCollapse(step) {
  const collapse = document.createElement('collapse');
  collapse.setAttribute('id', `step-${step.order}`);
  collapse.setAttribute('class', 'collapse');

  // Add the card and the description to the collapse
  output = `
  <div class="card-body">
    <p class="card-text">${step.description}</p>
  </div>`;
  collapse.innerHTML = output;

  return collapse;
}

function createLink(step) {
  const link = document.createElement('a');
  const attributes = {
    'href': `#step-${step.order}`,
    'data-toggle': 'collapse',
    'role': 'button',
    'aria-expanded': 'false',
    'aria-controls': `step-${step.order}`
  };

  // Adding the attributes
  for (const attribute in attributes) {
    link.setAttribute(attribute, attributes[attribute]);
  }

  // Add the h5 to the link
  let output = `<h5 class="card-header">Step ${step.order}</h5>`;
  link.innerHTML = output;

  return link;
}

function createCard() {
  const card = document.createElement('div');
  card.setAttribute('class', 'card');

  return card;
}

// Event: Submitting form to add the recipe
const addRecipeForm = document.querySelector('#add-recipe');

if (addRecipeForm) {
  addRecipeForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const recipeName = document.querySelector('#recipe-name').value;
    const poster = document.querySelector('#recipe-poster').value;
    const ingredients = getIngredientsFromSessionStorage();
    const steps = getStepsFromSession();

    // Building the JSON object
    const recipe = buildObject(recipeName, ingredients, steps, poster);

    // Adding it the session storage
    const elements = JSON.parse(sessionStorage.getItem('recipes'));
    elements.push(recipe);
    sessionStorage.setItem('recipes', JSON.stringify(elements));

    // Cleaning session storage elements
    sessionStorage.setItem('ingredients', '[]');
    sessionStorage.setItem('steps', '[]');

    // Redirecting to the index
    // to display success notification
    sessionStorage.setItem('notification', '1');
    window.location = 'index.html';
  });
}

// Adding the element to the session storage
// Doing this once // 
if (sessionStorage.getItem('recipes') == null) {
  sessionStorage.setItem('recipes', JSON.stringify(elementsDB));
}

function buildObject(recipeName, ingredients, steps, poster) {
  const recipe = {
    'id': generateId(),
    'name': recipeName,
    'difficulty': getDifficultyPepper(),
    'total_time': '20',
    'poster': poster,
    'ingredients': ingredients,
    'steps': steps
  };

  return recipe;
}

function generateId() {
  const min = 1;
  const max = 99999999;
  let generatedId = (Math.random() * (max - min)) + min;

  return Math.trunc(generatedId);
}

console.log(generateId());

// Pepper difficulty functionnality
const difficultyDiv = document.querySelector('#difficulty-pepper');

if (difficultyDiv) {
  // Event: Difficulty clicking 
  difficultyDiv.addEventListener('click', (e) => {
    const pepperID = e.target.getAttribute('id').split('-')[1];

    if (pepperID != null || pepperID != undefined) {
      for (let index = 1; index <= 5; index++) {
        const pepperIcon = document.querySelector(`#pepper-${index}`);

        if (index <= pepperID) {
          pepperIcon.setAttribute('class', 'fas fa-pepper-hot checked');
        } else {
          pepperIcon.setAttribute('class', 'fas fa-pepper-hot');
        }
      }
    }

    getDifficultyPepper();
  });
}

function getDifficultyPepper() {
  // Count the time the pepper is checked
  let difficulty = 0;

  for (let index = 1; index <= 5; index++) {
    const pepperIcon = document.querySelector(`#pepper-${index}`);

    if (pepperIcon.getAttribute('class') == 'fas fa-pepper-hot checked') {
      difficulty = difficulty + 1;
    }
  }

  return difficulty;
}

function displayNotification() {
  const notification = sessionStorage.getItem('notification');

  if (notification != null && notification != undefined) {
    if (notification == '1') {
      const notificationDiv = document.querySelector('#notification');
      notificationDiv.innerHTML = `
      <br>
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
        The recipe has been added successfully!
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      `;

      sessionStorage.setItem('notification', '0');
    }
  }
}