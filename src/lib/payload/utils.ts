import type { Post, Site, Tag } from "@/lib/payload/payload-types";
import type { PaginatedResponse } from "@lib/types";

const payloadUrl = import.meta.env.PAYLOAD_URL || undefined;

const fetchJson = async <T>(url: string): Promise<T> => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch from ${url}: ${response.statusText}`);
    }
    return response.json();
};

const getPayloadUrl = (pathname: string, depth: number = 1) => {
    if (!payloadUrl) {
        throw new Error("Payload URL not set");
    }
    const requestURL = new URL(payloadUrl);
    requestURL.pathname = pathname;
    requestURL.searchParams.set("depth", String(depth));
    return requestURL;
};

export const getAllPosts = async () => {
    const postPages: PaginatedResponse<Post>[] = [];

    let page = 1;
    let hasNextPage = true;

    while (hasNextPage) {
        const requestURL = getPayloadUrl("/api/posts");
        requestURL.searchParams.set("limit", "10");
        requestURL.searchParams.set("page", page.toString());
        requestURL.searchParams.set("sort", "-createdAt");

        const result = await fetchJson<PaginatedResponse<Post>>(requestURL.toString());

        postPages.push(result);
        hasNextPage = result.hasNextPage;
        page++;
    }

    return postPages;
};

export const getNPosts = async (n: number) => {
    const posts: Post[] = [];

    let page = 1;
    let hasNextPage = true;

    while (hasNextPage && posts.length < n) {
        const requestURL = getPayloadUrl("/api/posts");
        requestURL.searchParams.set("limit", n.toString());
        requestURL.searchParams.set("page", page.toString());
        requestURL.searchParams.set("sort", "-createdAt");

        const result = await fetchJson<PaginatedResponse<Post>>(requestURL.toString());

        posts.push(...result.docs);
        hasNextPage = result.hasNextPage;
        page++;
    }

    // make sure posts is only N length
    while (posts.length > n) posts.pop();

    return posts;
};

export const getPostsByTag = async (tag: string) => {
    const postPages: PaginatedResponse<Post>[] = [];

    let page = 1;
    let hasNextPage = true;

    while (hasNextPage) {
        const requestURL = getPayloadUrl("/api/posts");
        requestURL.searchParams.set("limit", "10");
        requestURL.searchParams.set("page", page.toString());
        requestURL.searchParams.set("sort", "-createdAt");
        requestURL.searchParams.set("where[tag][equals]", tag);

        const result = await fetchJson<PaginatedResponse<Post>>(requestURL.toString());

        postPages.push(result);
        hasNextPage = result.hasNextPage;
        page++;
    }

    return postPages;
};

export const getPostBySlug = async (slug: string) => {
    const requestURL = getPayloadUrl("/api/posts");
    requestURL.pathname = "/api/posts";
    requestURL.searchParams.set("limit", "1");
    requestURL.searchParams.set("where[slug][equals]", slug);

    const page = await fetchJson<PaginatedResponse<Post>>(requestURL.toString());
    if (page.docs.length === 0) return null;
    return page.docs[0];
};

export const getAllTags = async () => {
    const requestURL = getPayloadUrl("/api/tags");
    requestURL.searchParams.set("limit", "50");
    requestURL.searchParams.set("sort", "slug");
    return await fetchJson<PaginatedResponse<Tag>>(requestURL.toString());
};

export const getTagBySlug = async (slug: string) => {
    const requestURL = getPayloadUrl("/api/tags");
    requestURL.searchParams.set("limit", "1");
    requestURL.searchParams.set("where[slug][equals]", slug);

    const page = await fetchJson<PaginatedResponse<Tag>>(requestURL.toString());
    if (page.docs.length === 0) return null;
    return page.docs[0];
};

export const getSiteSettings = async () => {
    const requestURL = getPayloadUrl("/api/globals/site", 10);

    return await fetchJson<Site>(requestURL.toString());
};

export const getImageSrc = (src: string): string => {
    // Ensure that src is a valid string
    if (!src) {
        throw new Error("Invalid src provided");
    }

    const fullUrl = new URL(src, payloadUrl);
    return fullUrl.toString();
};
