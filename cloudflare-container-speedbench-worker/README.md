# Cloudflare Container Speed Benchmark Worker

This worker benchmarks upload and download speeds from Cloudflare Containers to R2 storage.

## Performance Results

### 1GB Upload/Download Test (Single Request)

**Upload Performance:**
- **Time:** 58.8 seconds
- **Speed:** 17.43 MB/s

**Download Performance:**  
- **Time:** 32.8 seconds
- **Speed:** 31.21 MB/s

*Test performed with 1GB file using single request from container to R2 storage.*

## How it works

1. Container generates 1GB of random data using ReadableStream
2. Streams data directly to Cloudflare R2 bucket
3. Downloads the same file back from R2
4. Measures and reports upload/download speeds

## Usage

Visit the deployed worker URL to run a speed test:
```
https://meltica-speedtest-r2-containers-from-worker.remorses.workers.dev
```

## Deployment

```bash
pnpm install
pnpm deployment
```