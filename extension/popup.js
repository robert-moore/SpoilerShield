document.addEventListener('DOMContentLoaded', function() {
  let searchForm = document.getElementById('searchForm');
  let searchInput = document.getElementById('searchInput');

  searchForm.addEventListener('submit', handleSearchFormSubmit);
});

function handleSearchFormSubmit(event) {
  event.preventDefault();
  let searchQuery = searchInput.value;
  chrome.runtime.sendMessage({type: 'searchQueryMessage', data: searchQuery});
  searchInput.value = '';
}