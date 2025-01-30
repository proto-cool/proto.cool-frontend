import generateOGImage from "@lib/generateOGImage.ts";
import SiteConfig from "@/site.config.ts";

export async function GET() {
    const png = await generateOGImage({
        title: SiteConfig.title,
        tag: "website",
    });

    return new Response(png, {
        status: 200,
        headers: {
            "Content-Type": "image/png",
            "Cache-Control": "public, max-age=31536000",
        },
    });
}
