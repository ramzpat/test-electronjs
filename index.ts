import { app, BrowserWindow } from 'electron';
import path from 'path';
import { spawn } from 'child_process';
import process from 'process';

let mainWindow: BrowserWindow | null;


const runExecutable = (): void => {
  const sub_process = spawn('echo', ['OS:', process.platform, 'ARCH:', process.arch]);

  sub_process.stdout.on('data', (data: Buffer) => {
    console.log(`stdout: ${data}`);
  });

  sub_process.stderr.on('data', (data: Buffer) => {
    console.error(`stderr: ${data}`);
  });

  sub_process.on('close', (code: number) => {
    console.log(`child process exited with code ${code}`);
  });
};

app.on('ready', () => {
  mainWindow = new BrowserWindow({ 
    width: 800, 
    height: 600, 
    webPreferences: { 
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
     }, 
    // autoHideMenuBar: true 
  });
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  runExecutable();
});

app.on('window-all-closed', () => {
  // if (process.platform !== 'darwin') {
  //   app.quit();
  // }
  app.quit();
});