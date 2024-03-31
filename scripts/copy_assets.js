const fs = require('fs-extra');

// Define source and destination directories
const srcDir = process.argv[2];
const outDir = process.argv[3];

console.log('Copying assets...');
console.log('> Source:', srcDir);
console.log('> Destination:', outDir);

fs.copySync(srcDir, outDir, { 
  overwrite: true,
  errorOnExist: false,
  filter: (src, dest) => {
    // Exclude .ts files
    return !src.endsWith('.ts');
  }
});