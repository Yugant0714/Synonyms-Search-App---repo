const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const synonymsList = document.getElementById('synonymsList');
searchButton.addEventListener('click', searchSynonyms);
function searchSynonyms() {
   const word = searchInput.value.trim();
   if (word !== '') {
      fetchSynonyms(word);
   } else {
      clearResults();
   }
}
function fetchSynonyms(word) {
   const apiUrl = `https://api.datamuse.com/words?rel_syn=${word}&max=10`;
   fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
         displaySynonyms(data);
      })
      .catch(error => {
         console.log('An error occurred:', error);
      });
}
function displaySynonyms(synonyms) {
   synonymsList.innerHTML = '';
   if (synonyms.length === 0) {
      synonymsList.innerHTML = 'No synonyms found.';
      return;
   }
   synonyms.forEach(synonym => {
      const listItem = document.createElement('li');
      listItem.textContent = synonym.word;
      synonymsList.appendChild(listItem);
   });
}
function clearResults() {
   synonymsList.innerHTML = '';
   searchInput.value = '';
}