import { BrowserWindow } from 'electron';
import path from 'node:path';

// Export class D3 in namespace Example as Example.D3
const D3_HTML_FILE = path.join(APP_CONFIG.rendererPath, 'd3_test.html');
export namespace Example {
  export class D3 {
    window: BrowserWindow | null = null;
    constructor() {
      console.log('D3 constructor');
    }

    public init(): void {
      this.createWindow();
    }

    private createWindow(): void {
      if (this.window === null) {
        // Create a new BrowserWindow instance if the window is null
        this.window = new BrowserWindow({
          width: 330,
          height: 350,
          webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
          },
          show: true,
          frame: true,
          resizable: false
        });
        this.window.loadFile(D3_HTML_FILE);
      }

      // Throw an error if the window is null
      if (this.window === null) {
        throw new Error('Window is null');
      }
    }
  }
}