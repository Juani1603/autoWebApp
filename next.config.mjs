/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { isServer }) {
    if (!isServer) {
      config.devtool = false; // Desactiva la generación de source maps con eval
    }
    return config;
  },
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**', // Acepta cualquier dominio (incluye localhost)
        port: '*',      // Acepta cualquier puerto
        pathname: '**', // Permite cualquier ruta
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;