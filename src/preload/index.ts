import { contextBridge } from "electron";
import { ipcRenderer } from "electron/renderer";

// whitelist channels
const validSendChannels = ["set-title", "console-log", "console-error"]
const validHandleChannels = ["test-output"]

// Add event listener to the DOM to replace the text of the elements with the versions of the dependencies
window.addEventListener('DOMContentLoaded', () => {
  // Function to replace the text of an element
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };
  replaceText(`test-output`, "test-output");
  replaceText(`test-resourcePath`, process.resourcesPath);
});

contextBridge.exposeInMainWorld('electron', {
  // Add a function to the window object to get the versions of the dependencies
  getVersions: () => {
    const versions = process.versions;
    return versions;
  },
  send: (channel: string, data: any) => { // Add type annotation for 'data'
    if (validSendChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    } else {
      console.log(`Invalid sending channel: ${channel}`);
    }
  },
  receive: (channel: string, func: Function ) => {
    if (validHandleChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    } else {
      console.log(`Invalid handle channel: ${channel}`);
    }
  }
});