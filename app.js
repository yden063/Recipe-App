const results = [
  {
    'id': '00001',
    'name': 'Old School Tajine',
    'difficulty': '2',
    'total_time': '45',
    'poster': 'https://burst.shopifycdn.com/photos/moroccan-meal-in-tagine.jpg?width=4460&height=4460&exif=1&iptc=1',
    'ingredients': [
      'paprika', 'onion', 'pepper', 'cheese', 'meat'
    ],
    'steps': [
      {
        'order': '1',
        'description': 'Toss carrots on a baking sheet with a large drizzle of oil. Season with salt and pepper. Roast until browned and tender, 25-30 minutes (after 10 minutes, we’ll start the steak).',
      },
      {
        'order': '2',
        'description': 'Heat a drizzle of oil in pan used for steak over medium-high heat. Add shallot and chopped thyme. Cook, stirring, until softened, about 1 minute. Add demi-glace and ¼ cup water. Cook, stirring, until reduced, about 2 minutes. Turn off heat and stir in remaining sour cream and a squeeze of lemon juice (to taste).'
      }
    ]

  },
  {
    'id': '00002',
    'name': 'Tajine bl bar9o9',
    'difficulty': '3',
    'total_time': '50',
    'poster': 'https://www.bladi.net/IMG/arton7256.jpg',
    'ingredients': [
      'paprika', 'onion', 'pepper', 'cheese', 'meat'
    ],
    'steps': [
      {
        'order': '1',
        'description': 'Toss carrots on a baking sheet with a large drizzle of oil. Season with salt and pepper. Roast until browned and tender, 25-30 minutes (after 10 minutes, we’ll start the steak).',
      },
      {
        'order': '2',
        'description': 'Heat a drizzle of oil in pan used for steak over medium-high heat. Add shallot and chopped thyme. Cook, stirring, until softened, about 1 minute. Add demi-glace and ¼ cup water. Cook, stirring, until reduced, about 2 minutes. Turn off heat and stir in remaining sour cream and a squeeze of lemon juice (to taste).'
      }
    ]
  },
  {
    'id': '00003',
    'name': 'Pizza Margarita',
    'difficulty': '1',
    'total_time': '30',
    'poster': 'https://burst.shopifycdn.com/photos/margarita-pizza-and-fresh-tomatos.jpg?width=4460&height=4460&exif=1&iptc=1',
    'ingredients': [
      'paprika', 'onion', 'pepper', 'cheese', 'meat'
    ],
    'steps': [
      {
        'order': '1',
        'description': 'Toss carrots on a baking sheet with a large drizzle of oil. Season with salt and pepper. Roast until browned and tender, 25-30 minutes (after 10 minutes, we’ll start the steak).',
      },
      {
        'order': '2',
        'description': 'Heat a drizzle of oil in pan used for steak over medium-high heat. Add shallot and chopped thyme. Cook, stirring, until softened, about 1 minute. Add demi-glace and ¼ cup water. Cook, stirring, until reduced, about 2 minutes. Turn off heat and stir in remaining sour cream and a squeeze of lemon juice (to taste).'
      }
    ]
  },
];
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
  window.location = 'search_results.html';
}

function displayResults() {
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
  for (let index = 0; index < results.length; index++) {
    const element = results[index];

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
