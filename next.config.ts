import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  async redirects() {
    return [
      // Old investigation create URLs → new postmortem create (address bar updates)
      {
        source: '/dashboard/:role/investigation-report/create',
        destination: '/dashboard/:role/postmortem-report/create',
        permanent: false,
      },
      {
        source: '/dashboard/:role/investigation-report/create-design2',
        destination: '/dashboard/:role/postmortem-report/create',
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      // Keep files under investigation-report while showing postmortem-report in URL
      {
        source: '/dashboard/:role/postmortem-report',
        destination: '/dashboard/:role/investigation-report',
      },
      {
        source: '/dashboard/:role/postmortem-report/create',
        destination: '/dashboard/:role/investigation-report/create-design2',
      },
      {
        source: '/dashboard/:role/postmortem-report/:id',
        destination: '/dashboard/:role/investigation-report/:id',
      },
    ];
  },
};

export default nextConfig;
