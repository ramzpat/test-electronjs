// Add event listener to the DOM to replace the text of the elements with the versions of the dependencies
window.addEventListener('DOMContentLoaded', () => {
  // Function to replace the text of an element
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };
  replaceText(`test-resourcePath`, process.resourcesPath);
  replaceText(`test-path`, __dirname);
  replaceText(`test-output`, "test-output");
});
