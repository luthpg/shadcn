import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    registry: ['./registry/**/*'],
  },
  output: 'export',
};

export default nextConfig;
