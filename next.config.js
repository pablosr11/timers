/** @type {import('next').NextConfig} */
const nextConfig = {
    // Disable image optimization since we'll use Cloudflare's
    images: {
        unoptimized: true
    }
}

module.exports = nextConfig 