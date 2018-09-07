const withSass = require("@zeit/next-sass");
const withESLint = require("next-eslint");

module.exports = withESLint(
  withSass({
    cssModules: false
  })
);
