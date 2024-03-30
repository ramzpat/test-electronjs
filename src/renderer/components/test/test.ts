import { BrowserWindow } from "electron";
import path from "path"; // Load the path module to handle the file paths

// Get the path to the public folder
const publicPath = path.resolve('./public');
const test_html_path = path.join(publicPath, 'test.html');


//  Create a test window
const create_test_window = ():BrowserWindow => {
   let testWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'test_preload.js')  // Load the compiled preload script (JS format)
    },
  });

  // Load the test HTML file
  testWindow.loadFile(test_html_path);
  
  // Destroy the window when it is closed
  testWindow.on('closed', () => {
    testWindow.destroy();
  });
  return testWindow;
}

export { create_test_window };
