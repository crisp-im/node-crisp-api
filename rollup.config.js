import typescript from "@rollup/plugin-typescript";
import tscAlias from "rollup-plugin-tsc-alias";
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
      dir: "dist",
      entryFileNames: "crisp.cjs.js",
      format: "cjs",
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript({ 
        tsconfig: "./tsconfig.json",
        declaration: true,
        declarationDir: "dist",
        rootDir: "lib"
      }),
      tscAlias(),
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
      dir: "dist",
      entryFileNames: "crisp.esm.js",
      format: "esm",
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript({ 
        tsconfig: "./tsconfig.json",
        declaration: false  // Only generate declarations once
      }),
      tscAlias(),
      replace({
        preventAssignment: true,
        __PKG_VERSION__: pkg.version,
      }),
    ],
  },
];
