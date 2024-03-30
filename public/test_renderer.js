const { ipcRenderer } = require('electron');

const setButton = document.getElementById('btn')
const titleInput = document.getElementById('title')
setButton.addEventListener('click', () => {
  const title = titleInput.value
  ipcRenderer.send('set-title', title)
})

// Function to replace the text of an element
const replaceText = (selector, text) => {
  const element = document.getElementById(selector);
  if (element) element.innerText = text;
};

// Replace the text of the element with the id "test-output"
ipcRenderer.on('test-output', (event, arg) => {
  console.log(arg)
  replaceText('test-output', arg)
});