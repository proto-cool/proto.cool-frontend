import { getAllPosts, getPostBySlug } from "@lib/payload/utils.ts";
import type { Post, Tag } from "@lib/payload/payload-types.ts";
import generateOGImage from "@lib/generateOGImage.ts";

export async function GET({ params }: { params: { slug: string } }) {
    const { slug } = params;

    const post: Post | null = await getPostBySlug(slug);

    if (!post) return new Response("Not found", { status: 404 });

    const png = await generateOGImage({
        title: post.title,
        subtitle: post.subtitle,
        tag: (post.tag as Tag).text,
        bgImage: post.heroImage,
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

    const posts = postPages.map((page) => page.docs).flat();

    return posts.map((post) => ({
        params: { slug: post.slug },
    }));
}
