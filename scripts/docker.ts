import { execSync } from 'child_process';

try {
  // Build the Docker image
  console.log('Building Docker image...');
  const buildOutput = execSync('docker build -t kdenlivetest .', { 
    encoding: 'utf-8',
    stdio: 'inherit'
  });

  // Run the container and remove it when done
  console.log('\nRunning container...');
  const runOutput = execSync('docker run --rm kdenlivetest', {
    encoding: 'utf-8',
    stdio: 'inherit'
  });

} catch (error) {
  console.error('Error:', error);
  process.exit(1);
}


