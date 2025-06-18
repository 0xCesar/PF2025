import type { Configuration } from 'webpack';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack(config: Configuration) {
    (config.module!.rules!).push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader', 'glslify-loader'],
    });
    
    return config;
  },
};

export default nextConfig;
