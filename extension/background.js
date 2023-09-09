```javascript
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'searchQueryMessage') {
    fetchFirstVideoResult(request.searchQuery);
  }
});

function fetchFirstVideoResult(searchQuery) {
  const encodedQuery = encodeURIComponent(searchQuery);
  const searchUrl = `https://www.youtube.com/results?search_query=${encodedQuery}`;

  fetch(searchUrl)
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const firstVideo = doc.querySelector('a.yt-simple-endpoint.style-scope.ytd-video-renderer');
      const videoUrl = `https://www.youtube.com${firstVideo.getAttribute('href')}`;

      chrome.tabs.create({ url: videoUrl }, (tab) => {
        chrome.tabs.executeScript(tab.id, { file: 'content.js' });
      });
    })
    .catch(error => console.error('Error:', error));
}
```