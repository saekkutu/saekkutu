import { $ } from "bun";
import { watch } from "fs";

await $`bun run build.ts`
watch("src", async (event, _filename) => {
    if (event !== "change") return;

    console.log(`Building...`);
    await $`bun run build.ts`
});