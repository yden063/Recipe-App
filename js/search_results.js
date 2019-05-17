// Display results
displayResults();

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
recipes.addEventListener('click', (e) => {
  const recipeId = e.target.parentNode.parentNode.parentNode.getAttribute('id');

  // Adding the id to session storage
  const recipe = JSON.stringify(getRecipeById(recipeId));
  sessionStorage.setItem('recipe_details', recipe);
});

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
