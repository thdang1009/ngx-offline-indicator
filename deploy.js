const { execSync } = require('child_process');

console.log('🚀 Deploying to Vercel...');

try {
  // Run vercel command with production flag
  console.log('Running Vercel deployment...');
  execSync('vercel --prod', { stdio: 'inherit' });

  console.log('✅ Deployment successful!');
  console.log('Your app should be available at https://ngx-offline-indicator.vercel.app/');
} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}
