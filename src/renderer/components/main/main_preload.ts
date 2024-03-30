import process from 'node:process';

// Add event listener to the DOM to replace the text of the elements with the versions of the dependencies
window.addEventListener('DOMContentLoaded', () => {
  // Function to replace the text of an element
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  // Add the versions of the dependencies
  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency] as string);
  }

  // Add the OS version
  replaceText(`os-version`, process.platform);
});