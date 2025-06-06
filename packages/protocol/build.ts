import { $ } from "bun";

Bun.build({
    entrypoints: ["src/index.ts"],
    minify: true,
    target: "browser",
    format: "esm",
    outdir: "dist"
})

await $`bun tsc`