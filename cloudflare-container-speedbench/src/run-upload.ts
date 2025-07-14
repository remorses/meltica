import { uploadToS3 } from './speed-test';

async function main() {
  console.log('Starting upload benchmark...');
  console.log('Environment variables:', {
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID ? 'SET' : 'NOT SET',
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY ? 'SET' : 'NOT SET',
    AWS_REGION: process.env.AWS_REGION,
    S3_BUCKET: process.env.S3_BUCKET
  });

  // Check required environment variables
  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.S3_BUCKET) {
    console.error('Missing required environment variables:');
    console.error('- AWS_ACCESS_KEY_ID:', process.env.AWS_ACCESS_KEY_ID ? 'SET' : 'NOT SET');
    console.error('- AWS_SECRET_ACCESS_KEY:', process.env.AWS_SECRET_ACCESS_KEY ? 'SET' : 'NOT SET');
    console.error('- S3_BUCKET:', process.env.S3_BUCKET || 'NOT SET');
    process.exit(1);
  }

  try {
    const result = await uploadToS3();
    
    console.log('\n=== Upload Benchmark Results ===');
    console.log(`Upload Time: ${(result.uploadTime / 1000).toFixed(2)}s`);
    console.log(`Upload Speed: ${(1024 / (result.uploadTime / 1000)).toFixed(2)} MB/s`);
    console.log(`File Key: ${result.fileKey}`);
    console.log('================================\n');
    
    // Exit successfully
    process.exit(0);
  } catch (error) {
    console.error('Upload benchmark failed:', error);
    process.exit(1);
  }
}

// Run the benchmark
main().catch((error) => {
  console.error('Unexpected error:', error);
  process.exit(1);
});