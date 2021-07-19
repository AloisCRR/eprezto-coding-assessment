const withTM = require("next-transpile-modules")(["lowdb"]);

module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: ["d29fo3cabnm3fy.cloudfront.net"],
  },
});
