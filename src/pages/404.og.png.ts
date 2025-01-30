import generateOGImage from "@lib/generateOGImage.ts";
import SiteConfig from "@/site.config.ts";

export async function GET() {
    const png = await generateOGImage({
        title: "404: not found",
        subtitle: "page does not exist",
        tag: "error",
    });

    return new Response(png, {
        status: 200,
        headers: {
            "Content-Type": "image/png",
            "Cache-Control": "public, max-age=31536000",
        },
    });
}
