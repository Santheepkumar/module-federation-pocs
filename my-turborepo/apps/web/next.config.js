const NextFederationPlugin = require("@module-federation/nextjs-mf");

const deps = require("./package.json").dependencies;

module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  webpack5: true,
  webpack(config, options) {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: "web",
        remotes: {
          docs: "docs@http://localhost:3001/_next/static/chunks/remoteEntry.js",
        },
        filename: "static/chunks/remoteEntry.js",
        exposes: {},
        shared: {},
      })
    );

    return config;
  },
};
