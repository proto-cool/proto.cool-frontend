import generateOGImage from "@lib/generateOGImage.ts";
import SiteConfig from "@/site.config.ts";
import { getAllPosts, getAllTags, getPostsByTag, getTagBySlug } from "@lib/payload/utils.ts";

export async function GET({ params }: { params: { page: number; slug: string; tag: string } }) {
    const { page, slug } = params;

    const tag = await getTagBySlug(slug);

    const png = await generateOGImage({
        title: `blog posts tagged "${tag?.text}" — page ${page}`,
        tag: tag?.text || "blog posts",
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
    const tags = await getAllTags();

    const tagPages = await Promise.all(
        tags.docs.map(async (tag) => {
            const postPages = await getPostsByTag(tag.id.toString());
            return { tag, postPages };
        }),
    );

    return tagPages.flatMap(({ tag, postPages }) =>
        postPages.map((page) => ({
            params: { page: page.page, slug: tag.slug },
        })),
    );
}
