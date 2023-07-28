/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['firebasestorage.googleapis.com', 'edamam-product-images.s3.amazonaws.com'],
    }
}

module.exports = nextConfig
