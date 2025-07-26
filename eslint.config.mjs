import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  //  OVERRIDES HERE
  {
    files: ["*.ts", "*.tsx"],
    rules: {
      "no-undef": "off" // Disable no-undef for TypeScript files
    }
  }
];

export default eslintConfig;
