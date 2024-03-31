import path from 'node:path';
import { app } from 'electron';

// Declare the global variable APP_CONFIG
const APP_PATH = path.join(__dirname, '..');
const RESOURCES_PATH = 
  app.isPackaged ? 
    path.join(process.resourcesPath, "resources") : 
    path.join(__dirname, '..', '..', 'resources');
const RENDERER_PATH = path.join(APP_PATH, 'renderer');
const PRELOAD_PATH = path.join(APP_PATH, 'preload');
global.APP_CONFIG = {
  appPath: APP_PATH,
  rendererPath: RENDERER_PATH,
  preloadPath: PRELOAD_PATH,
  resourcesPath: RESOURCES_PATH
};

import TestApp from './application';
import { ipcMain } from 'electron';
import fs from 'fs';
import yaml from 'js-yaml';
const yaml_path = path.join(RESOURCES_PATH, 'test.yaml');

import { Example } from './examples';

app.on('ready', () => {
  const testWin = new TestApp();
  testWin.init();

  new Example.D3().init();

  // Set the event listener for the 'set-title' event from the renderer process
  ipcMain.on('set-title', (event, title) => {
    console.log('Setting title:', title);
    testWin.window?.setTitle(title);
    
    // Load the YAML file
    const yaml_obj = Example.load_yaml(yaml_path);
    // Send the YAML object to the renderer process
    testWin.window?.webContents.send('test-output', 'Name:' + yaml_obj['name']);
  });
});

app.on('window-all-closed', () => {
  app.quit();
});