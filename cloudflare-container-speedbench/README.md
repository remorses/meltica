# Cloudflare Container R2 Speed Benchmark

Previously I tried uploading to a bucket directly from the durable object, I got 30MB/s with this method.

This project benchmarks upload speeds from Cloudflare Containers to Cloudflare R2 storage, testing various optimization strategies to maximize throughput.

## Overview

The benchmark uploads 1GB of data from a Cloudflare Container to R2 storage and measures the upload speed. We tested multiple approaches and optimizations to identify the best performance characteristics.

## Speed Test Results

### Complete Speed Test Results

#### JavaScript Implementation Results

| Version | Approach | Speed | Time | Improvement |
|---------|----------|-------|------|-------------|
| 1. Original Bun | Bun runtime + Bun S3 client | 24.57 MB/s | 41.7s | Baseline |
| 2. Node.js + AWS SDK | Node.js + AWS SDK multipart | 25.86 MB/s | 39.6s | +5% |
| 3. Direct HTTP Upload | Node.js + direct HTTPS PUT | 28.73 MB/s | 35.6s | +17% |
| 4. Optimized Data Gen | Pre-generated 10MB chunks | 43.85 MB/s | 23.4s | +78% |
| 5. Larger Buffers | 50MB chunks, 64MB buffer | **48.85 MB/s** | 21.0s | **+99%** |
| 6. Maximum Buffers | 100MB chunks, 128MB buffer | 48.36 MB/s | 21.2s | +97% |
| 7. Concurrent Upload | 5 concurrent 100MB parts | 47.71 MB/s | 21.5s | +94% |

#### Rclone CLI Implementation Results

| Version | Configuration | Speed | Time | Notes |
|---------|--------------|-------|------|-------|
| 8. Rclone Baseline | --transfers 8, --s3-upload-concurrency 1, --s3-chunk-size 1024M | 32.28 MB/s | 31.7s | Initial rclone test |
| 9. Rclone Optimized | --transfers 1, --multi-thread-streams 8, --s3-chunk-size 512M | **39.88 MB/s** | 25.7s | +23% over baseline |
| 10. Rclone Final | Same as optimized, multiple runs | 39.65 MB/s | 25.8s | Consistent performance |

### Maximum Achieved Speeds
- **JavaScript Implementation**: **48.85 MB/s**
- **Rclone Implementation**: **39.88 MB/s**

The best performance was achieved with:
- **Pre-generated data**: 50MB template buffer reused for all chunks
- **Large stream buffers**: 64MB highWaterMark
- **Direct HTTP uploads**: Bypassing AWS SDK overhead
- **Optimized HTTPS agent**: Keep-alive connections

## Key Findings

### Rclone Implementation Analysis

We also tested using the industry-standard `rclone` CLI tool as an alternative to custom JavaScript implementation:

#### Rclone Performance Results
- **Initial Performance**: 32.28 MB/s (66% of JavaScript speed)
- **Optimized Performance**: 39.88 MB/s (82% of JavaScript speed)
- **Improvement**: +23% through parameter tuning

#### Rclone Optimization Parameters
```bash
rclone copy -v \
  --transfers 1 \              # Single transfer for max bandwidth
  --checkers 1 \               # Minimal checkers to reduce CPU
  --multi-thread-streams 8 \   # Multi-threading for large files
  --multi-thread-cutoff 256M \ # Enable for files > 256MB
  --s3-chunk-size 512M \       # Very large chunks
  --s3-upload-cutoff 2048M \   # Avoid multipart for 1GB
  --s3-disable-checksum \      # Disable CPU-heavy checksums
  --no-check-dest \            # Skip destination checks
  --ignore-checksum \          # Skip checksum validation
  --no-update-modtime \        # Skip setting mod times
  --buffer-size 128k \         # Standard buffer size
  --retries 1                  # Minimal retries
```

#### Rclone Trade-offs
**Advantages:**
- ✅ Industry-standard tool with excellent reliability
- ✅ Simplified code (removed AWS signature implementation)
- ✅ Better error handling and retry logic
- ✅ Easy configuration and tuning
- ✅ Well-maintained and tested

**Disadvantages:**
- ❌ ~18% slower than optimized JavaScript
- ❌ Additional process overhead
- ❌ Less fine-grained control over upload process

### Major Performance Bottlenecks

1. **CPU-bound data generation** (biggest impact)
   - Original: Generated random data on-the-fly using `crypto.randomFillSync`
   - Optimized: Pre-generate template and reuse
   - **Result**: +78% performance improvement

2. **AWS SDK overhead**
   - AWS SDK multipart uploads add protocol complexity
   - Direct HTTPS PUT requests are more efficient
   - **Result**: +12% improvement over AWS SDK

3. **Buffer sizes matter**
   - Larger chunks and stream buffers reduce I/O overhead
   - Sweet spot: 50MB chunks with 64MB stream buffer
   - **Result**: +11% improvement

### Optimization Techniques That Worked

✅ **Pre-generating data in memory** (biggest win)
✅ **Direct HTTP uploads vs AWS SDK**
✅ **Larger chunk sizes (10MB → 50MB)**
✅ **Increased stream buffer sizes (16MB → 64MB)**
✅ **HTTPS agent optimization (keep-alive, connection pooling)**

### Optimization Techniques That Didn't Help

❌ **Concurrent uploads** - No significant improvement
❌ **Very large buffers** (100MB+ chunks) - Hit diminishing returns
❌ **Socket-level optimizations** - Minimal impact

## Architecture

### Container Setup
- **Runtime**: Node.js 20 Alpine
- **Dependencies**: Minimal (no AWS SDK)
- **Memory**: Pre-loads 1GB data template at startup
- **Network**: Direct HTTPS to R2 endpoint

### Upload Process
1. Pre-generate 50MB random data template at container startup
2. Create 1GB stream by reusing the template (20 × 50MB)
3. Upload via direct HTTPS PUT with AWS Signature V4
4. Use 64MB stream buffer for optimal throughput

## Performance Limits

The ~49 MB/s speed appears to be the practical limit for this setup due to:

- **Container resource constraints** (CPU/memory/network)
- **Single-threaded Node.js limitations**
- **HTTPS protocol overhead**
- **Cloudflare Container networking limits**

## Usage

### Deploy
```bash
pnpm deployment
```

### Test
```bash
curl https://meltica-speedtest-r2-containers.remorses.workers.dev
```

### Example Response
```json
{
  "uploadTime": 20962,
  "downloadTime": 0,
  "uploadSpeed": "48.85 MB/s",
  "downloadSpeed": "N/A",
  "fileKey": "speed-test/a3d3954d-7e99-40ce-bf24-218f58be5319.bin"
}
```

## Technical Details

### Environment Variables Required
- `AWS_ACCESS_KEY_ID`: R2 access key
- `AWS_SECRET_ACCESS_KEY`: R2 secret key
- `S3_BUCKET`: R2 bucket name

### File Structure
- `src/speed-test.ts`: Main container server with upload logic
- `src/worker.ts`: Cloudflare Worker that manages containers
- `Dockerfile`: Node.js 20 Alpine container
- `package.json`: Dependencies and scripts

## Conclusion

We achieved a **99% performance improvement** (24.57 → 48.85 MB/s) through systematic optimization, with the biggest gains coming from eliminating CPU bottlenecks rather than network optimizations.

### Implementation Comparison
- **JavaScript (Direct HTTP)**: 48.85 MB/s - Maximum performance with full control
- **Rclone CLI**: 39.88 MB/s - Good performance with better maintainability

The ~40-49 MB/s range appears to be the practical limit for Cloudflare Container uploads to R2, constrained by:
- Container resource limitations (CPU/memory/network)
- HTTPS protocol overhead
- Single-threaded upload constraints

For even higher speeds, consider:
- Using Cloudflare Workers' native R2 bindings (bypasses container networking)
- Testing with different container runtime environments
- Implementing parallel uploads to multiple R2 endpoints
- Using native compiled languages (Rust/Go) to reduce overhead
