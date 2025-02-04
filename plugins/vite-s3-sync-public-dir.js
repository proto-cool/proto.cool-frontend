import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { mkdirSync, createWriteStream } from "fs";
import path from "path";

let synced = false;

export default function viteS3SyncPublicDirPlugin({
    s3Bucket,
    s3Endpoint,
    awsRegion,
    awsAccessKeyId,
    awsSecretAccessKey,
}) {
    return {
        name: "vite-s3-sync-public-dir",
        apply: "build",
        async buildStart() {
            // Validate the props
            if (!s3Bucket) {
                throw new Error("S3 Bucket not defined");
            } else if (!s3Endpoint) {
                throw new Error("S3 Endpoint not defined");
            } else if (!awsRegion) {
                throw new Error("AWS Region not defined");
            } else if (!awsAccessKeyId) {
                throw new Error("AWS Access Key ID not defined");
            } else if (!awsSecretAccessKey) {
                throw new Error("AWS Secret Access Key not defined");
            }

            if (synced) {
                return;
            }

            const client = new S3Client({
                region: awsRegion,
                endpoint: s3Endpoint,
                credentials: { accessKeyId: awsAccessKeyId, secretAccessKey: awsSecretAccessKey },
            });

            console.log("Syncing S3 bucket to public folder...");

            const listCommand = new ListObjectsV2Command({ Bucket: s3Bucket });
            const { Contents } = await client.send(listCommand);

            if (!Contents) {
                console.log("No files found in R2 bucket.");
                return;
            }

            for (const file of Contents) {
                console.log(`Downloading: ${file.Key}`);

                const getCommand = new GetObjectCommand({ Bucket: s3Bucket, Key: file.Key });
                const { Body } = await client.send(getCommand);

                if (!Body) continue;

                mkdirSync(path.dirname(file.Key), { recursive: true });

                const fileStream = createWriteStream(file.Key);
                await new Promise((resolve, reject) => {
                    Body.pipe(fileStream).on("finish", resolve).on("error", reject);
                });
            }

            console.log("R2 sync complete.");
            synced = true;
        },
    };
}
