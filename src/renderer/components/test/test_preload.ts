import process from 'node:process';
import path from 'node:path';

import fs from 'node:fs';
import yaml from 'js-yaml';

const assetsPath = path.resolve('./public/assets');
const yaml_file_path = path.join(assetsPath, 'test.yaml');

// Add event listener to the DOM to replace the text of the elements with the versions of the dependencies
window.addEventListener('DOMContentLoaded', () => {
  // Function to replace the text of an element
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  // Load the YAML file
  const doc = yaml.load(fs.readFileSync(yaml_file_path, 'utf8')) as any;
  const addresses = doc.addresses;
  const addressesList = addresses.map((address: any) => `${address.city}`).join(', ');
  replaceText(`test-output`, addressesList);
});