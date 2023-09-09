```javascript
// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'videoDataMessage') {
    toggleTheaterMode(request.videoData);
  }
});

// Function to toggle theater mode
function toggleTheaterMode(videoData) {
  // Navigate to the video URL
  window.location.href = videoData.url;

  // Wait for the page to load
  window.onload = () => {
    // Check if the video is already in theater mode
    let theaterModeButton = document.getElementById('theaterModeButton');
    if (!videoData.isInTheaterMode && theaterModeButton) {
      // Click the theater mode button
      theaterModeButton.click();
    }
  };
}
```