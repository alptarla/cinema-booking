const path = require("path");
module.exports = {
  webpack: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@helpers": path.resolve(__dirname, "src/helpers"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@router": path.resolve(__dirname, "src/router"),
      "@services": path.resolve(__dirname, "src/services"),
      "@config": path.resolve(__dirname, "src/config"),
      "@store": path.resolve(__dirname, "src/store"),
    },
  },
};
