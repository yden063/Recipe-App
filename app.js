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
  const resultsDOM = document.querySelector('#recipes');
  let output = '';

  results.forEach(element => {
    console.log(element);
    const checkedStar = '<span class="fa fa-star checked"></span>';
    const normalStar = '<span class="fa fa-star"></span>';
    let difficulty = '';

    // Stars logic
    for (let index = 1; index <= 5; index++) {
      if (index <= element.difficulty)
        difficulty += checkedStar;
      else
        difficulty += normalStar;
    }

    output = `
      <div class='col-md-3'>
        <div class='well text-center'>
          <img class='poster' src='${element.poster}' />
          <h3>${element.name}</h3>
          ${difficulty}
        </div>
      </div>
    `;

    resultsDOM.innerHTML += output;
  });
}