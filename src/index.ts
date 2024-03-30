import { app } from 'electron';
import { create_main_window } from './renderer/components/main/main';
import { create_test_window } from './renderer/components/test/test';
import { test_executable } from './services/test_executable/test_executable';
import { BrowserWindow } from 'electron/main';

app.on('ready', () => {
  // create_main_window();
  const test_win = create_test_window();

  // Add an event listener for the 'did-finish-load' event
  test_win.webContents.on('did-finish-load', () => {
    // Call the test_executable function
    let test_process = test_executable();
    // Add an event listener for the 'test-output' event from the renderer process
    // This event updates the output in the renderer process using the data from the child process
    test_process.stdout.on('data', (data: Buffer) => {
      test_win.webContents.send('test-output', data.toString());
    });
  });

  // Test multiple windows
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