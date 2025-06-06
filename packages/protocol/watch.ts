import { $ } from "bun";
import chokidar from "chokidar";

async function build() {
    console.log(`Building...`);
    
    try {
        await $`bun run build.ts`
        console.log(`Built successfully`);
    } catch (error) {
        console.error(error);
    }
}

chokidar.watch("src")
    .on("all", build)