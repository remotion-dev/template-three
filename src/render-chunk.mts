import { renderMedia, selectComposition } from "@remotion/renderer";
import fs from "node:fs/promises";
import path, { dirname } from "node:path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

//
// tsx render-chunk.mts --prefer-lossless true --bundle ./dist/bundle --range 0-299 --props '{"foo": "bar"}' --out /tmp/out.mp4
//

const argv = yargs(hideBin(process.argv))
  .option("bundle", {
    type: "string",
    demandOption: true,
    desc: "Folder or URL containing the pre-built Remotion bundle",
  })
  .option("range", {
    type: "string",
    demandOption: true,
    desc: "Inclusive frame range, e.g. 0-299",
  })
  .option("props", {
    type: "string",
    default: "{}",
    desc: "JSON stringified inputProps",
  })
  .option("out", {
    type: "string",
    default: "/tmp/out.ts",
    desc: "Output path inside the container",
  })
  .option("prefer-lossless", {
    type: "boolean",
    default: false,
    desc: "",
  })
  .strict()
  .parseSync();

const [start, end] = argv.range.split("-").map(Number);
if (Number.isNaN(start) || Number.isNaN(end) || start > end) {
  throw new Error(
    `Invalid --range "${argv.range}". Must be "start-end", start ≤ end.`,
  );
}
const serveUrl = path.resolve(argv.bundle);
const inputProps = JSON.parse(argv.props);
const outputLocation = path.resolve(argv.out);
const preferLossless = argv["prefer-lossless"];

//

console.log(`[worker] chunk (${start}-${end})`, {
  serveUrl,
  start,
  end,
  inputProps,
  outputLocation,
  preferLossless,
});

// 2) Pick the composition
const composition = await selectComposition({
  serveUrl,
  id: "Scene",
  inputProps,
});

// 3) Render only the frame range of this chunk
await fs.mkdir(dirname(outputLocation), { recursive: true });

await renderMedia({
  serveUrl,
  composition,
  codec: "h264-ts", // must be identical across chunks
  frameRange: [start, end],
  outputLocation,
  // enforceAudioTrack: true,
  preferLossless,
  chromiumOptions: {
    gl: "angle", // Use ANGLE for WebGL support
  },
  onProgress: (progress) => {
    const totalFrames = end - start;

    console.log(
      `[worker] chunk progress: ${progress.renderedFrames} / ${totalFrames} frames - ${((progress.renderedFrames / totalFrames) * 100).toFixed(1).padStart(4, "0")}%`,
    );
  },
  inputProps,
});

console.log(`[worker] chunk done → ${outputLocation}`);
