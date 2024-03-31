const { ipcRenderer } = require('electron');

const setButton = document.getElementById('btn')
const titleInput = document.getElementById('title')

// Function to replace the text of an element
const replaceText = (selector, text) => {
  const element = document.getElementById(selector);
  if (element) element.innerText = text;
};

setButton.addEventListener('click', () => {
  const title = titleInput.value
  ipcRenderer.send('set-title', title)
})

// Replace the text of the element with the id "test-output"
ipcRenderer.on('test-output', (event, arg) => {
  console.log(arg)
  replaceText('test-output', arg)
});

// Collect console logs and send them to the main process
console.log = function() {
  ipcRenderer.send('console-log', Array.from(arguments));
}

// Collect console errors and send them to the main process
console.error = function() {
  ipcRenderer.send('console-error', Array.from(arguments));
}