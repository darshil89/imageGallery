/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com","plus.unplash.com"],
  },
  target: {
    // ...other target options
    metadata: {
      metadataBase: 'https://image-gallery-roan-alpha.vercel.app/', // Replace with your actual base URL
    },
  },
};

module.exports = nextConfig;
