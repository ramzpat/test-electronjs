import { app } from 'electron';
import { create_main_window } from './renderer/components/main/main';
import { create_test_window } from './renderer/components/test/test';
import { test_executable } from './services/test_executable/test_executable';
import { BrowserWindow } from 'electron/main';

app.on('ready', () => {
  // create_main_window();

  // Test multiple windows
  create_test_window();
  // create_test_window();

  // Test loading an external URL
  // new BrowserWindow().loadURL('https://www.google.com');

  // Test calling an executable
  // test_executable();
});

app.on('window-all-closed', () => {
  // if (process.platform !== 'darwin') {
  //   // On macOS, the app should not quit until the user explicitly quits
  //   app.quit();
  // }
  app.quit();
});