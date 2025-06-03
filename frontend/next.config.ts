/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [new URL("https://images.unsplash.com/**")],
  },
  // Other Next.js config options...
};

export default config;
