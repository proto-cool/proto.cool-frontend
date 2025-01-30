import type { Post, Media, Tag, User } from "@lib/payload/payload-types";

export interface PaginatedResponse<T extends Post | Media | Tag | User> {
    docs: T[];
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage?: number | undefined;
    page: number;
    pagingCounter: number;
    prevPage?: number | undefined;
    totalDocs: number;
    totalPages: number;
}
