// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";
import viteS3SyncPublicDirPlugin from "./plugins/vite-s3-sync-public-dir.js";

// https://astro.build/config
export default defineConfig({
    site: "https://proto.cool",
    image: {
        // These items allow Astro to optimize images from your upstream CMS.
        domains: ["payload.proto.cool"],
        remotePatterns: [{ protocol: "https" }],
    },
    compressHTML: true,
    prefetch: true,
    integrations: [sitemap()],
    vite: {
        plugins: [
            tailwindcss(),
            // @ts-ignore
            viteS3SyncPublicDirPlugin({
                awsRegion: process.env.S3_REGION,
                awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
                awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                s3Endpoint: process.env.S3_ENDPOINT,
                s3Bucket: process.env.S3_BUCKET,
            }),
        ],
    },
});
