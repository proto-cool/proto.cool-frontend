/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
    auth: {
        users: UserAuthOperations;
    };
    collections: {
        tags: Tag;
        posts: Post;
        media: Media;
        users: User;
        projects: Project;
        "payload-locked-documents": PayloadLockedDocument;
        "payload-preferences": PayloadPreference;
        "payload-migrations": PayloadMigration;
    };
    collectionsJoins: {};
    collectionsSelect: {
        tags: TagsSelect<false> | TagsSelect<true>;
        posts: PostsSelect<false> | PostsSelect<true>;
        media: MediaSelect<false> | MediaSelect<true>;
        users: UsersSelect<false> | UsersSelect<true>;
        projects: ProjectsSelect<false> | ProjectsSelect<true>;
        "payload-locked-documents":
            | PayloadLockedDocumentsSelect<false>
            | PayloadLockedDocumentsSelect<true>;
        "payload-preferences": PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
        "payload-migrations": PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
    };
    db: {
        defaultIDType: number;
    };
    globals: {
        site: Site;
    };
    globalsSelect: {
        site: SiteSelect<false> | SiteSelect<true>;
    };
    locale: null;
    user: User & {
        collection: "users";
    };
    jobs: {
        tasks: unknown;
        workflows: unknown;
    };
}
export interface UserAuthOperations {
    forgotPassword: {
        email: string;
        password: string;
    };
    login: {
        email: string;
        password: string;
    };
    registerFirstUser: {
        email: string;
        password: string;
    };
    unlock: {
        email: string;
        password: string;
    };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tags".
 */
export interface Tag {
    id: number;
    text: string;
    slug?: string | null;
    slugLock?: boolean | null;
    description?: string | null;
    postCount?: number | null;
    updatedAt: string;
    createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "posts".
 */
export interface Post {
    id: number;
    title: string;
    slug?: string | null;
    slugLock?: boolean | null;
    subtitle?: string | null;
    tag: number | Tag;
    description: string;
    readTime?: string | null;
    heroImage?: (number | null) | Media;
    content: {
        root: {
            type: string;
            children: {
                type: string;
                version: number;
                [k: string]: unknown;
            }[];
            direction: ("ltr" | "rtl") | null;
            format: "left" | "start" | "center" | "right" | "end" | "justify" | "";
            indent: number;
            version: number;
        };
        [k: string]: unknown;
    };
    updatedAt: string;
    createdAt: string;
    _status?: ("draft" | "published") | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
    id: number;
    alt: string;
    updatedAt: string;
    createdAt: string;
    url?: string | null;
    thumbnailURL?: string | null;
    filename?: string | null;
    mimeType?: string | null;
    filesize?: number | null;
    width?: number | null;
    height?: number | null;
    focalX?: number | null;
    focalY?: number | null;
    sizes?: {
        thumbnail?: {
            url?: string | null;
            width?: number | null;
            height?: number | null;
            mimeType?: string | null;
            filesize?: number | null;
            filename?: string | null;
        };
        medium?: {
            url?: string | null;
            width?: number | null;
            height?: number | null;
            mimeType?: string | null;
            filesize?: number | null;
            filename?: string | null;
        };
    };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
    id: number;
    updatedAt: string;
    createdAt: string;
    email: string;
    resetPasswordToken?: string | null;
    resetPasswordExpiration?: string | null;
    salt?: string | null;
    hash?: string | null;
    loginAttempts?: number | null;
    lockUntil?: string | null;
    password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "projects".
 */
export interface Project {
    id: number;
    name: string;
    slug?: string | null;
    slugLock?: boolean | null;
    url: string;
    description: string;
    content: {
        root: {
            type: string;
            children: {
                type: string;
                version: number;
                [k: string]: unknown;
            }[];
            direction: ("ltr" | "rtl") | null;
            format: "left" | "start" | "center" | "right" | "end" | "justify" | "";
            indent: number;
            version: number;
        };
        [k: string]: unknown;
    };
    updatedAt: string;
    createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
    id: number;
    document?:
        | ({
              relationTo: "tags";
              value: number | Tag;
          } | null)
        | ({
              relationTo: "posts";
              value: number | Post;
          } | null)
        | ({
              relationTo: "media";
              value: number | Media;
          } | null)
        | ({
              relationTo: "users";
              value: number | User;
          } | null)
        | ({
              relationTo: "projects";
              value: number | Project;
          } | null);
    globalSlug?: string | null;
    user: {
        relationTo: "users";
        value: number | User;
    };
    updatedAt: string;
    createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
    id: number;
    user: {
        relationTo: "users";
        value: number | User;
    };
    key?: string | null;
    value?:
        | {
              [k: string]: unknown;
          }
        | unknown[]
        | string
        | number
        | boolean
        | null;
    updatedAt: string;
    createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
    id: number;
    name?: string | null;
    batch?: number | null;
    updatedAt: string;
    createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tags_select".
 */
export interface TagsSelect<T extends boolean = true> {
    text?: T;
    slug?: T;
    slugLock?: T;
    description?: T;
    postCount?: T;
    updatedAt?: T;
    createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "posts_select".
 */
export interface PostsSelect<T extends boolean = true> {
    title?: T;
    slug?: T;
    slugLock?: T;
    subtitle?: T;
    tag?: T;
    description?: T;
    readTime?: T;
    heroImage?: T;
    content?: T;
    updatedAt?: T;
    createdAt?: T;
    _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
    alt?: T;
    updatedAt?: T;
    createdAt?: T;
    url?: T;
    thumbnailURL?: T;
    filename?: T;
    mimeType?: T;
    filesize?: T;
    width?: T;
    height?: T;
    focalX?: T;
    focalY?: T;
    sizes?:
        | T
        | {
              thumbnail?:
                  | T
                  | {
                        url?: T;
                        width?: T;
                        height?: T;
                        mimeType?: T;
                        filesize?: T;
                        filename?: T;
                    };
              medium?:
                  | T
                  | {
                        url?: T;
                        width?: T;
                        height?: T;
                        mimeType?: T;
                        filesize?: T;
                        filename?: T;
                    };
          };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
    updatedAt?: T;
    createdAt?: T;
    email?: T;
    resetPasswordToken?: T;
    resetPasswordExpiration?: T;
    salt?: T;
    hash?: T;
    loginAttempts?: T;
    lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "projects_select".
 */
export interface ProjectsSelect<T extends boolean = true> {
    name?: T;
    slug?: T;
    slugLock?: T;
    url?: T;
    description?: T;
    content?: T;
    updatedAt?: T;
    createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
    document?: T;
    globalSlug?: T;
    user?: T;
    updatedAt?: T;
    createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
    user?: T;
    key?: T;
    value?: T;
    updatedAt?: T;
    createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
    name?: T;
    batch?: T;
    updatedAt?: T;
    createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "site".
 */
export interface Site {
    id: number;
    name: string;
    title: string;
    description: string;
    author: string;
    "author-photo"?: (number | null) | Media;
    nav?:
        | {
              label: string;
              link: string;
              id?: string | null;
          }[]
        | null;
    social?:
        | {
              platform:
                  | "behance"
                  | "bluesky"
                  | "codepen"
                  | "dev"
                  | "discord"
                  | "dribbble"
                  | "email"
                  | "facebook"
                  | "github"
                  | "instagram"
                  | "linkedin"
                  | "mastodon"
                  | "medium"
                  | "pinterest"
                  | "producthunt"
                  | "reddit"
                  | "slack"
                  | "snapchat"
                  | "telegram"
                  | "threads"
                  | "tiktok"
                  | "twitch"
                  | "whatsapp"
                  | "youtube";
              label: string;
              link: string;
              id?: string | null;
          }[]
        | null;
    "code-injection"?: string | null;
    "site-settings": {
        timezone:
            | "Africa/Abidjan"
            | "Africa/Cairo"
            | "Africa/Nairobi"
            | "America/New_York"
            | "America/Toronto"
            | "America/Mexico_City"
            | "America/Chicago"
            | "America/Denver"
            | "America/Phoenix"
            | "America/Los_Angeles"
            | "America/Anchorage"
            | "America/Adak"
            | "Pacific/Honolulu"
            | "Pacific/Midway"
            | "Pacific/Kiritimati"
            | "Asia/Tokyo"
            | "Asia/Shanghai"
            | "Asia/Bangkok"
            | "Asia/Dhaka"
            | "Asia/Kolkata"
            | "Asia/Tehran"
            | "Asia/Dubai"
            | "Asia/Kabul"
            | "Europe/London"
            | "Europe/Dublin"
            | "Europe/Paris"
            | "Europe/Berlin"
            | "Europe/Rome"
            | "Europe/Madrid"
            | "Europe/Moscow"
            | "Australia/Sydney"
            | "Australia/Melbourne"
            | "Australia/Brisbane"
            | "Australia/Adelaide"
            | "Australia/Perth"
            | "Antarctica/Palmer"
            | "Antarctica/McMurdo";
        "enable-builds"?: boolean | null;
        "use-view-transitions"?: boolean | null;
        "use-animations"?: boolean | null;
    };
    updatedAt?: string | null;
    createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "site_select".
 */
export interface SiteSelect<T extends boolean = true> {
    name?: T;
    title?: T;
    description?: T;
    author?: T;
    "author-photo"?: T;
    nav?:
        | T
        | {
              label?: T;
              link?: T;
              id?: T;
          };
    social?:
        | T
        | {
              platform?: T;
              label?: T;
              link?: T;
              id?: T;
          };
    "code-injection"?: T;
    "site-settings"?:
        | T
        | {
              timezone?: T;
              "enable-builds"?: T;
              "use-view-transitions"?: T;
              "use-animations"?: T;
          };
    updatedAt?: T;
    createdAt?: T;
    globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "CodeBlock".
 */
export interface CodeBlock {
    language?:
        | ("typescript" | "javascript" | "html" | "css" | "python" | "bash" | "powershell")
        | null;
    code: string;
    id?: string | null;
    blockName?: string | null;
    blockType: "code";
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ImageBlock".
 */
export interface ImageBlock {
    image: number | Media;
    id?: string | null;
    blockName?: string | null;
    blockType: "image";
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
    [k: string]: unknown;
}
