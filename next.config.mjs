/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
      missingSuspenseWithCSRBailout: false,
      serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
      dangerouslyAllowSVG: true,
      domains: ['lh3.googleusercontent.com', 'cdn.imagin.studio', 'cdn.movieofthenight.com', 'www.movieofthenight.com'],
    },
    webpack(config) {
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true,
      }
      return config
    }
  }
  
  export default nextConfig