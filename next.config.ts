import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: '/', destination: '/index_static.html' },
      { source: '/about', destination: '/about.html' },
      { source: '/case-studies', destination: '/case-studies.html' },
      { source: '/contact', destination: '/contact.html' },
      { source: '/culture', destination: '/culture.html' },
      { source: '/quiz', destination: '/quiz.html' },
      { source: '/strategy', destination: '/strategy.html' },
      { source: '/talent', destination: '/talent.html' },
    ];
  },
};

export default nextConfig;
