import process from 'process';  
import { app } from 'electron'; // Load the app module from Electron
import { spawn } from 'child_process'; // Load the spawn function from the child_process module
import path from 'path'; // Load the path module to handle the file paths

const executable_path = path.join(app.getAppPath(), 'public', 'executables');

// Test the executable by spawning a child process that runs the 'echo' command
const test_executable = (): void => {
  // const sub_process = spawn('echo', ['OS:', process.platform, 'ARCH:', process.arch]);
  const sub_process = spawn('python', [ path.join(executable_path, 'hello.py')]);

  // sub_process.stdin.write('Hello from Electron\n');

  // Retrieve the output of the child process
  sub_process.stdout.on('data', (data: Buffer) => {
    console.log(`echo: ${data}`);
  });

  // Retrieve the error output of the child process
  sub_process.stderr.on('data', (data: Buffer) => {
    console.error(`echo: ${data}`);
  });

  // Log the exit code of the child process
  sub_process.on('close', (code: number) => {
    console.log(`child process exited with code ${code}`);
    sub_process.kill();
  });
};

export { test_executable };