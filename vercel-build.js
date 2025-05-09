const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Function to execute shell commands
function runCommand(command) {
  console.log(`Running: ${command}`);
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Error executing ${command}:`, error);
    process.exit(1);
  }
}

// Main build process
console.log('Starting Vercel build process...');

// 1. Build the library first
console.log('Building ngx-offline-indicator library...');
runCommand('npx ng build ngx-offline-indicator');

// 2. Create the dist directory if it doesn't exist
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// 3. Build the demo app
console.log('Building demo application...');
runCommand('npx ng build demo-app --configuration production');

// 4. Copy _redirects file to the output directory
console.log('Ensuring routing works properly...');
if (!fs.existsSync('dist/demo-app/browser/_redirects')) {
  fs.writeFileSync('dist/demo-app/browser/_redirects', '/* /index.html 200');
  console.log('Created _redirects file for proper routing');
}

// 5. Create a simple vercel.json in the output directory
const vercelConfig = {
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
};

fs.writeFileSync(
  'dist/demo-app/browser/vercel.json',
  JSON.stringify(vercelConfig, null, 2)
);
console.log('Created vercel.json in the output directory');

console.log('Build completed successfully!');
