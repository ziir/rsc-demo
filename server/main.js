"use strict";

// "on the fly" (probably when modules are require'd) compilation
// of React Flight bindings
const reactServerregister = require("react-server-dom-webpack/node-register");
reactServerregister();

// ~"just in time" (when modules are require'd) compilation (but cached) of JSX
// & ES imports used in the app components into CJS
const babelRegister = require("@babel/register");
babelRegister({
  ignore: [/[\\\/](dist|server|node_modules)[\\\/]/],
  plugins: ["@babel/transform-modules-commonjs"],
  // @babel/preset-react is determined by babel.config.js file
});

// start the server
require("./server")();
