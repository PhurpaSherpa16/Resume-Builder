import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  // data saving, its for file validation.
  experimental:{
    serverActions:{
      bodySizeLimit: '4MB',
    }
  },
  images:{
    remotePatterns:[
      {
        protocol : 'https',
        hostname : 'ktzam1ys1tu5npzm.public.blob.vercel-storage.com'
      }
    ]
  }

};

export default nextConfig;
