import { BrowserWindow, app } from 'electron';
import path from 'node:path';

const APP_HTML_FILE = path.join(APP_CONFIG.rendererPath, 'index.html')
const PRELOAD_PATH = path.join(APP_CONFIG.preloadPath, 'index.js');
const appPath = APP_CONFIG.appPath;

export default class TestApp {
  window: BrowserWindow | null = null;
  constructor() {
    console.log('TestApp constructor');
    console.log("APP_PATH: ", appPath)
    console.log('APP_HTML_FILE: ', APP_HTML_FILE);
  }

  public init(): void {
    this.createWindow();
  }

  private createWindow(): void {
    if (this.window === null) {
      // Create a new BrowserWindow instance if the window is null
      this.window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          preload: PRELOAD_PATH
        }
      });
      this.window.loadFile(APP_HTML_FILE);
    }

    // Throw an error if the window is null
    if (this.window === null) {
      throw new Error('Window is null');
    }
  }
}