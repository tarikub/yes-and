// Function to handle changes in text inputs and textareas
const handleInputChange = (event: Event) => {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement;
  chrome.runtime.sendMessage({ type: 'text_change', text: target.value });
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(mutationsList => {
  for (let mutation of mutationsList) {
    if (mutation.type === 'childList') {
      // Attach event listeners to new input fields
      document.querySelectorAll('input[type="text"], textarea').forEach(input => {
        input.removeEventListener('input', handleInputChange);
        input.addEventListener('input', handleInputChange);
      });
    }
  }
});

// Start observing the document for added nodes
observer.observe(document.body, { childList: true, subtree: true });

// Initial attachment of event listeners to existing input fields
document.querySelectorAll('input[type="text"], textarea').forEach(input => {
  input.addEventListener('input', handleInputChange);
});

