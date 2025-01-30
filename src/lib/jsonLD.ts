import type { Person, BlogPosting, WebSite, WithContext } from "schema-dts";
import SiteConfig, { type ContentType } from "@/site.config.ts";
import type { Post, Media } from "@/lib/payload/payload-types.ts";
import { getImageSrc } from "@/lib/payload/utils.ts";

export type JsonLDProps = {
    type: ContentType;
    pageURL: URL;
    post?: Post;
};

export default function generateJsonLD(props: JsonLDProps) {
    const { type, pageURL } = props;
    if (type === "post") {
        const { post } = props;
        const author: WithContext<Person> = {
            "@context": "https://schema.org",
            "@type": "Person",
            name: SiteConfig.authorName,
            url: pageURL.origin,
        };

        const blogposting: WithContext<BlogPosting> = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `${pageURL}`,
            },
            headline: `${post?.title}`,
            description: `${post?.description}`,
            author: JSON.stringify(author),
            datePublished: `${post?.createdAt}`,
            dateModified: `${post?.updatedAt}`,
        };

        if (post?.heroImage) {
            blogposting["image"] = getImageSrc((post?.heroImage as Media).url as string);
        }

        return blogposting;
    }

    const website: WithContext<WebSite> = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: `${SiteConfig.title}`,
        url: pageURL.origin,
    };

    return website;
}
