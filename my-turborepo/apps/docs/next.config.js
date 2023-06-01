const NextFederationPlugin = require("@module-federation/nextjs-mf");

const deps = require("./package.json").dependencies;

module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  webpack(config, options) {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: "docs",
        remotes: {},
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./Header": "./components/Header.tsx",
        },
        shared: {},
      })
    );

    return config;
  },
};
