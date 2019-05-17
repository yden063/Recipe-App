import elementsDB from "./MockDB.js";

// Adding the element to the session storage
// Doing this once // 
if (sessionStorage.getItem('recipes') == null) {
  sessionStorage.setItem('recipes', JSON.stringify(elementsDB.elementsDB));
}

displayNotification();

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

// Event: Search submitting form
document.getElementById('search').addEventListener('submit', function (e) {
  e.preventDefault();

  const searchText = document.querySelector('#search-text').value;
  console.log(searchText);

  // Search for a recipe and redirect 
  // to the search_results.html page
  getSearchResults(searchText);
});

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
  window.location = '../search_results.html';
}
