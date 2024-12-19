import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:3001/api/:path*', // Proxy to Backend
            },
        ];
    },
};

export default nextConfig;
