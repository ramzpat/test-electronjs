import { BrowserWindow, app, ipcMain } from "electron";
import path from "path"; // Load the path module to handle the file paths

import fs from 'fs';
import yaml from 'js-yaml';

// Get the path to the public folder
const publicPath = path.join(app.getAppPath(), 'public');
const test_html_path = path.join(publicPath, 'test.html');
const yaml_path = path.join(publicPath, 'assets', 'test.yaml');

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
  console.log('publicPath:', publicPath);

  // Load the test HTML file
  testWindow.loadFile(test_html_path);

  // Destroy the window when it is closed
  testWindow.on('closed', () => {
    testWindow.destroy();
  });

  ipcMain.on('set-title', (event, title) => {
    console.log('Setting title:', title);
    testWindow.setTitle(title);
    const yaml_obj = yaml.load(fs.readFileSync(yaml_path).toString()) as any;
    console.log('YAML:', yaml_obj);

    testWindow.webContents.send('test-output', 'Name:' + yaml_obj['name']);
  })

  return testWindow;
}

export { create_test_window };
