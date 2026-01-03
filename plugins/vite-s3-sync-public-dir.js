import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { mkdirSync, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import path from "path";

let synced = false;

export default function viteS3SyncPublicDirPlugin({
    s3Bucket,
    s3Endpoint,
    awsRegion,
    awsAccessKeyId,
    awsSecretAccessKey,
}) {
    const skipS3Sync = process.argv.includes("--skip-s3-sync");

    return {
        name: "vite-s3-sync-public-dir",
        apply: "build",
        async buildStart() {
            if (skipS3Sync) {
                console.log("S3 sync skipped via --skip-s3-sync flag.");
                return;
            }

            if (synced) return;

            // Validate the props
            const missing = [];
            if (!s3Bucket) missing.push("s3Bucket");
            if (!s3Endpoint) missing.push("s3Endpoint");
            if (!awsRegion) missing.push("awsRegion");
            if (!awsAccessKeyId) missing.push("awsAccessKeyId");
            if (!awsSecretAccessKey) missing.push("awsSecretAccessKey");

            if (missing.length > 0) {
                console.warn(`S3 Sync disabled: Missing configuration (${missing.join(", ")})`);
                return;
            }

            const client = new S3Client({
                region: awsRegion,
                endpoint: s3Endpoint,
                credentials: {
                    accessKeyId: awsAccessKeyId,
                    secretAccessKey: awsSecretAccessKey,
                },
            });

            try {
                console.log(`[s3-sync] Syncing bucket "${s3Bucket}" to public folder...`);

                const listCommand = new ListObjectsV2Command({ Bucket: s3Bucket });
                const { Contents } = await client.send(listCommand);

                if (!Contents || Contents.length === 0) {
                    console.log("[s3-sync] No files found in S3 bucket.");
                    synced = true;
                    return;
                }

                for (const file of Contents) {
                    if (!file.Key) continue;

                    // Ensure directory exists
                    const filePath = path.join(process.cwd(), file.Key);
                    mkdirSync(path.dirname(filePath), { recursive: true });

                    console.log(`[s3-sync] Downloading: ${file.Key}`);

                    const getCommand = new GetObjectCommand({ Bucket: s3Bucket, Key: file.Key });
                    const { Body } = await client.send(getCommand);

                    if (!Body) {
                        console.warn(`[s3-sync] Empty body for ${file.Key}`);
                        continue;
                    }

                    const fileStream = createWriteStream(filePath);
                    // @ts-ignore - Body is a ReadableStream in this context
                    await pipeline(Body, fileStream);
                }

                console.log("[s3-sync] Sync complete.");
                synced = true;
            } catch (error) {
                console.error("[s3-sync] Error during sync:", error instanceof Error ? error.message : error);
                // We don't necessarily want to crash the whole build if sync fails, 
                // but that depends on how critical these files are.
                // For now, let's keep it as an error log.
            }
        },
    };
}
