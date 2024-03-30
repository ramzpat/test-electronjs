import { BrowserWindow, app, ipcMain } from "electron";
import path from "path"; // Load the path module to handle the file paths

import fs from 'fs';
import yaml from 'js-yaml';

// Get the path to the public folder
const publicResourcesPath = path.join(app.isPackaged?process.resourcesPath:app.getAppPath(), 'public');
const test_html_path = path.join(publicResourcesPath, 'test.html');
const yaml_path = path.join(publicResourcesPath, 'assets', 'test.yaml');

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
  console.log('publicPath:', publicResourcesPath);

  // Load the test HTML file
  testWindow.loadFile(test_html_path);

  // Destroy the window when it is closed
  testWindow.on('closed', () => {
    testWindow.destroy();
  });

  // Set the event listener for the 'set-title' event from the renderer process
  ipcMain.on('set-title', (event, title) => {
    console.log('Setting title:', title);
    testWindow.setTitle(title);
    
    // Load the YAML file
    const yaml_obj = yaml.load(fs.readFileSync(yaml_path).toString()) as any;
    console.log('YAML:', yaml_obj);
    // Send the YAML object to the renderer process
    testWindow.webContents.send('test-output', 'Name:' + yaml_obj['name']);
  });

  return testWindow;
}

export { create_test_window };
