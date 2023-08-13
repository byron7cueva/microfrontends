/** @type {import('next').NextConfig} */
const {NextFederationPlugin} = require("@module-federation/nextjs-mf");

const nextConfig = {
  reactStrictMode: true,
    webpack(config, options) {
        config.plugins.push(
            new NextFederationPlugin({
              name: "remote2",
              filename: "static/chunks/remoteEntry.js",
              exposes: {
                'Button': 'components/button.tsx',
                'Message': 'components/message.tsx'
              },
              extraOptions: {
                // Expone de forma automatica todas las paguinas que tenemos en next
                exposePages: true,
              },
            })
          );
          return config;
    }
}

module.exports = nextConfig

