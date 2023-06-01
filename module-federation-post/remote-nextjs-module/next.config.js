// const { withFederatedSidecar } = require("@module-federation/nextjs-mf");

// module.exports = withFederatedSidecar({
//   name: "remote_nextjs_module",
//   filename: "static/chunks/remoteEntry.js",
//   exposes: {
//     "./BB8": "./components/BB8.js",
//   },
//   shared: {},
// })({
//   // your original next.config.js export
//   reactStrictMode: true,
// });

const NextFederationPlugin = require("@module-federation/nextjs-mf");

const deps = require("./package.json").dependencies;

module.exports = {
  webpack5: true,
  webpack(config, options) {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: "remote_nextjs_module",
        remotes: {
          remote_react_module:
            "remote_react_module@http://localhost:8082/RemoteEntry.js",
        },
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./BB8": "./components/BB8.js",
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
        },
      })
    );

    return config;
  },
};
