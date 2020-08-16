const { getCombinedModifierFlags } = require("typescript");

module.exports = {
  webpack: (config, options) => {
    if (!config.module.rules) {
      config.module.rules = [];
    }
    config.module.rules.push({
      test: /\.gon$/i,
      use: "raw-loader",
    });
    return config;
  },
};
