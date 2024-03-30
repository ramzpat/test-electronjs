const { app, BrowserWindow } = require('electron')
// include the Node.js 'path' module at the top of your file
const path = require('node:path')
const { spawn } = require('child_process');
const process = require('node:process');


const runExecutable = () => {
  const sub_process = spawn('echo', ['OS:', process.platform, 'ARCH:', process.arch]);

  sub_process.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  sub_process.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  sub_process.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
};

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile('index.html');

  // const new_win = new BrowserWindow({
  //   width: 800,
  //   height: 600,
  //   webPreferences: {
  //     preload: path.join(__dirname, 'preload.js')
  //   }
  // });
  // new_win.loadFile('test_windows.html');

  // Show JSon file in new window
  // const json_win = new BrowserWindow({
  //   width: 800,
  //   height: 600,
  //   webPreferences: {
  //     preload: path.join(__dirname, 'preload.js')
  //   }
  // });
  // json_win.loadFile('test.json');

  // // Read JSON file in as a new object
  // const fs = require('fs');
  // const json = fs.readFileSync('test.json');
  // console.log(JSON.parse(json));

  // Read YAML file 'test.yaml' in as a new object
  const yaml = require('js-yaml');
  const fs = require('fs');
  const yaml_file = fs.readFileSync('test.yaml', 'utf8');
  console.log(yaml.load(yaml_file));
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  runExecutable();
})

app.on('window-all-closed', () => {
  // if (process.platform !== 'darwin') app.quit()
  app.quit();
})

