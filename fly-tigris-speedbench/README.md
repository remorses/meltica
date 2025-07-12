# Fly Tigris Speed Benchmark

A high-performance speed testing application for measuring upload speeds from Fly.io containers to Tigris storage.

## 🚀 Performance Results

### Current Performance (Performance Machine)
- **CPU**: 4 performance cores  
- **Memory**: 8GB RAM
- **Region**: Frankfurt (fra)
- **Storage**: Fly Tigris (`https://fly.storage.tigris.dev`)

| Upload Method | Speed | Time (1GB) | Status |
|---------------|-------|------------|---------|
| **Concurrent Upload** 🥇 | **90.20 MB/s** | 11.35s | ✅ Optimized |
| **Single Upload** | **41.86 MB/s** | 24.46s | ✅ Stable |

### Architecture
- **Concurrent Upload**: 10 parts × 100MB each, 5 concurrent connections in batches
- **Single Upload**: Direct 1GB file upload  
- **Memory Management**: Shared HTTPS agent, batched processing, garbage collection

## 🛠 Setup

### Prerequisites
- Fly.io account with Tigris storage access
- AWS S3-compatible credentials for Tigris

### Environment Variables
Configure these secrets in Fly:
```bash
fly secrets set AWS_ACCESS_KEY_ID=<your-tigris-access-key>
fly secrets set AWS_SECRET_ACCESS_KEY=<your-tigris-secret-key>  
fly secrets set AWS_ENDPOINT_URL_S3=https://fly.storage.tigris.dev
fly secrets set AWS_REGION=auto
```

### Configuration
Update `fly.toml`:
```toml
[env]
  S3_BUCKET = 'your-bucket-name'

[[vm]]
  memory = '8gb'
  cpu_kind = 'performance' 
  cpus = 4
```

### Deploy
```bash
fly deploy
```

## 📊 API Endpoints

### Speed Tests
- `POST /upload` - Concurrent multipart upload test (10 × 100MB parts)
- `POST /upload-single` - Single file upload test (1GB)

### Utilities  
- `GET /` - Status and available endpoints
- `GET /generate` - Download 1GB of test data
- `GET /env` - Environment variable check

### Example Usage
```bash
# Test concurrent upload
curl -X POST https://your-app.fly.dev/upload

# Test single upload  
curl -X POST https://your-app.fly.dev/upload-single
```

## 🔧 Technical Optimizations

### Memory Leak Fixes
- **Shared HTTPS Agent**: Prevents socket exhaustion (200+ → 10 connections)
- **Buffer Management**: Eliminates string concatenation memory leaks
- **Batch Processing**: Controls concurrent operations to prevent OOM
- **Garbage Collection**: Manual GC between batches with `--expose-gc`

### Node.js Configuration
```dockerfile
ENV NODE_OPTIONS="--max-old-space-size=3072 --expose-gc"
```

## 📈 Performance History

| Configuration | Concurrent | Single | Notes |
|---------------|------------|---------|-------|
| 2 shared CPUs, 4GB | ❌ OOM crash | 48.58 MB/s | Memory issues |
| 4 performance CPUs, 8GB (before fix) | ❌ OOM crash | 64.99 MB/s | Memory leaks |
| 4 performance CPUs, 8GB (after fix) | ✅ **90.20 MB/s** | 41.86 MB/s | **Optimized** |

## 🐛 Troubleshooting

### Common Issues
1. **OOM Errors**: Ensure 8GB+ memory for concurrent uploads
2. **403 Access Denied**: Verify bucket permissions and credentials
3. **Timeout**: Increase curl timeout for large uploads (`-m 300`)

### Memory Monitoring
The app includes built-in memory management:
- Batched concurrent uploads (5 parts at a time)
- Automatic garbage collection between batches
- Shared connection pooling

## 🏗 Architecture Details

### Data Generation
- 1GB of random data pre-generated at startup
- Stored as 10 × 100MB Buffer parts in memory
- Reused across multiple test runs

### Upload Strategies
1. **Concurrent**: Upload multiple parts simultaneously with controlled concurrency
2. **Single**: Upload entire file as single HTTP request

### Error Handling
- Request timeout management
- Connection cleanup on errors  
- Comprehensive error reporting with stack traces

## 📝 Response Format

### Success Response
```json
{
  "success": true,
  "uploadTime": 11353,
  "uploadSpeed": "90.20 MB/s", 
  "fileKey": "speed-test/uuid",
  "timestamp": "2025-07-12T13:20:00.155Z"
}
```

### Error Response  
```json
{
  "success": false,
  "error": "Upload failed: 403 - Access Denied",
  "errorName": "Error",
  "timestamp": "2025-07-12T13:20:00.155Z"
}
```

## 🚀 Deployment

Live app: https://fly-tigris-speedbench.fly.dev/

The application is optimized for high-performance upload testing with enterprise-grade error handling and memory management.