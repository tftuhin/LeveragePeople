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
      { source: '/wp-content/:path*', destination: 'https://leveragepeople.us/wp-content/:path*' },
      { source: '/wp-includes/:path*', destination: 'https://leveragepeople.us/wp-includes/:path*' },
      { source: '/images/logo.png', destination: 'https://leveragepeople.us/wp-content/uploads/2019/06/400dpiLogoCropped-1024x309.png' },
    ];
  },
};

export default nextConfig;
