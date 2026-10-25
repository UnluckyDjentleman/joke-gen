import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[
      new URL('https://www.kolobok.us/smiles/icq/**'),
    ],
  },
  allowedDevOrigins: ['192.168.0.116'],
};

export default nextConfig;
