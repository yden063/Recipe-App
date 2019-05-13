const results = [
  {
    'id': '00001',
    'name': 'Old School Tajine',
    'difficulty': '2',
    'total_time': '45',
    'poster': 'https://burst.shopifycdn.com/photos/moroccan-meal-in-tagine.jpg?width=4460&height=4460&exif=1&iptc=1'
  },
  {
    'id': '00002',
    'name': 'Tajine bl bar9o9',
    'difficulty': '3',
    'total_time': '50',
    'poster': 'https://www.bladi.net/IMG/arton7256.jpg'
  },
  {
    'id': '00003',
    'name': 'Pizza Margarita',
    'difficulty': '1',
    'total_time': '30',
    'poster': 'https://burst.shopifycdn.com/photos/margarita-pizza-and-fresh-tomatos.jpg?width=4460&height=4460&exif=1&iptc=1'
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
    const checkedPepper = '<i class="fas fa-pepper-hot checked"></i>';
    const normalPepper = '<i class="fas fa-pepper-hot"></i>';
    let difficulty = '';

    // Stars logic
    for (let index = 1; index <= 5; index++) {
      if (index <= element.difficulty)
        difficulty += checkedPepper;
      else
        difficulty += normalPepper;
    }

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