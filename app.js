document.getElementById('search').addEventListener('submit', function(e) {
  e.preventDefault();
  const searchText = document.querySelector('#search-text').value;
  console.log(searchText);
});