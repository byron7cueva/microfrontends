/** @type {import('next').NextConfig} */
const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

const remotes = (isServer) => {
  
  const location = isServer ? "ssr" : "chunks";
  console.log('isServer', location);
  return {
    remote2: `remote2@http://localhost:3001/_next/static/${location}/remoteEntry.js`,
  };
};

const nextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "container2",
        filename: "static/chunks/remoteEntry.js",
        //remotes: remotes(options.isServer),
        /*remotes: {
          remote1: `
          promise new Promise(res => {
            window.consumer.get('./complexRemoteLoaderMiddleware').then(factory => {
              const mod = factory();
              mod.fefault('core').then((injectRemote) => res(injectRemote))
            })
          })
          `
        },*/
        exposes: {},
        extraOptions: {
          exposePages: true,
        },
      })
    );
    return config;
  },
};

module.exports = nextConfig;
