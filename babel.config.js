const development = (process.env.NODE_ENV || "development") === "development";

module.exports = {
  presets: [
    [
      "@babel/preset-react",
      {
        runtime: "automatic",
        useSpread: true,
        development,
      },
    ],
  ],
};
