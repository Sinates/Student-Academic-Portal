/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000', // Adjust the port as needed
        pathname: '/images/**', // Adjust the pathname as needed
      },
    ],
  },
};

export default nextConfig;
