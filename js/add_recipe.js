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