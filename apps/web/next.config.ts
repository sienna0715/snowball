import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    compiler: { styledComponents: true },
    async rewrites() {
        const api = process.env.API_BASE_URL;

        return [
            { source: "/auth/:path*", destination: `${api}/auth/:path*` },
            { source: "/api/:path*", destination: `${api}/:path*` },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
        ],
    },
};

export default nextConfig;
