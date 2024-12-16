/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { isServer }) {
    if (!isServer) {
      config.devtool = false; // Desactiva la generación de source maps con eval
    }
    return config;
  },
  images: {
    domains: ['http2.mlstatic.com', 'cdn.motor1.com', 'storage.googleapis.com'], // Agrega aquí el dominio adicional
  },
};

export default nextConfig;
