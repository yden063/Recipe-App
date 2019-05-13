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
  window.location = 'search_results.html';
}