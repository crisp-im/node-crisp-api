import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import fs from "fs";

var pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));

export default [
  // CommonJS
  {
    input: "lib/crisp.ts",
    output: {
      file: "dist/crisp.cjs.js",
      format: "cjs",
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      replace({
        preventAssignment: true,
        __PKG_VERSION__: pkg.version,
      }),
    ],
  },

  // ESM
  {
    input: "lib/crisp.ts",
    output: {
      file: "dist/crisp.esm.js",
      format: "esm",
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      replace({
        preventAssignment: true,
        __PKG_VERSION__: pkg.version,
      }),
    ],
  },
];
