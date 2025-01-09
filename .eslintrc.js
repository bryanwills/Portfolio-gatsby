module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: `react-app`,
  plugins: ["simple-import-sort"],
  rules: {
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",
  },
};
