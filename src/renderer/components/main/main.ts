import { BrowserWindow } from "electron";
import path from "path"; // Load the path module to handle the file paths
let mainWindow: BrowserWindow | null = null;

// Get the path to the public folder
const publicPath = path.resolve('./public');
const main_html_path = path.join(publicPath, 'main.html');

//  Create the main window
const create_main_window = () => {
  if (mainWindow !== null) {
    return;
  }
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'main_preload.js')  // Load the compiled preload script (JS format)
    }
  });

  // Check if the main window is defined
  if (mainWindow === null) {
    throw new Error('Main window is not defined');
  }

  // Load the main HTML file
  mainWindow.loadFile(main_html_path);

  // Destroy the window when it is closed
  mainWindow.on('closed', () => {
    if (mainWindow !== null) {
      mainWindow.destroy();
    }
  });
}

export { create_main_window, mainWindow };
