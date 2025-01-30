import generateOGImage from "@lib/generateOGImage.ts";
import SiteConfig from "@/site.config.ts";
import { getAllPosts, getAllTags, getPostsByTag } from "@lib/payload/utils.ts";

export async function GET({ params }: { params: { page: number; tag: string } }) {
    const { page } = params;
    const png = await generateOGImage({
        title: `blog posts — page ${page}`,
        subtitle: "various blog posts about web development, 3D printing, gaming, and more",
        tag: "blog posts",
    });

    return new Response(png, {
        status: 200,
        headers: {
            "Content-Type": "image/png",
            "Cache-Control": "public, max-age=31536000",
        },
    });
}

export async function getStaticPaths() {
    const postPages = await getAllPosts();

    return postPages.map((page) => ({
        params: { page: page.page },
    }));
}
