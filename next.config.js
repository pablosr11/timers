/** @type {import('next').NextConfig} */
const nextConfig = {
    // Cloudflare Pages specific settings
    output: 'export',

    // Disable image optimization since we'll use Cloudflare's
    images: {
        unoptimized: true
    }
}

module.exports = nextConfig 