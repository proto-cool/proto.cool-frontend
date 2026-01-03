import { getSiteSettings } from "@lib/payload/utils.ts";
import type { Media, Site, User } from "@lib/payload/payload-types";

type SocialPlatform = NonNullable<Site["social"]>[number]["platform"];

export interface SocialLinkProps {
    platform: SocialPlatform;
    link: string;
    text: string;
}

interface NavLink {
    text: string;
    href: string;
    newTab?: boolean; // adds target="_blank" rel="noopener noreferrer" to link
}

export interface NavLinkProps extends NavLink {
    type: "normal" | "mobile";
}

export interface Theme {
    name: string;
    label: string;
    preview: {
        bg: string;
        fg: string;
        accent: string;
    };
}

export interface SiteConfigProps {
    name: string;
    title: string;
    description: string;
    socialLinks: SocialLinkProps[];
    authorName: string;
    authorPhoto: Media | null;
    timezone: string;
    useViewTransitions?: boolean;
    useAnimations?: boolean;
    navLinks: NavLink[];
    codeInjection: string | null;
    themes: Theme[];
}

export type ContentType = "base" | "post" | "page";

const payloadSiteSettings = (await getSiteSettings()) as Required<Site>;

const SiteConfig: SiteConfigProps = {
    // Meta fields
    name: payloadSiteSettings.name,
    title: payloadSiteSettings.title,
    description: payloadSiteSettings.description,
    useViewTransitions: payloadSiteSettings.siteSettings.useViewTransitions ?? true,
    useAnimations: payloadSiteSettings.siteSettings.useAnimations ?? true,

    // Social links
    socialLinks:
        payloadSiteSettings.social?.map((social) => ({
            platform: social.platform,
            link: social.link,
            text: social.label,
        })) ?? [],

    // What to display as your name throughout the site
    authorName: (payloadSiteSettings.author as User).displayName,
    authorPhoto: (payloadSiteSettings.author as User).avatar as Media | null,

    // Site navigation
    navLinks:
        payloadSiteSettings.nav?.map((nav) => ({
            href: nav.link,
            text: nav.label,
        })) ?? [],

    // used for analytics, etc
    codeInjection: payloadSiteSettings.codeInjection,

    // Used to calculate the date correctly for the site
    timezone: payloadSiteSettings.siteSettings.timezone,

    // Themes
    themes: [
        {
            name: "lime",
            label: "Lime",
            preview: {
                bg: "#f4f4f5",
                fg: "#3f3f46",
                accent: "#57a90a",
            },
        },
        {
            name: "obsidian",
            label: "Obsidian",
            preview: {
                bg: "#18181b",
                fg: "#e4e4e7",
                accent: "#6dd40c",
            },
        },
        {
            name: "nordic",
            label: "Nordic",
            preview: {
                bg: "#f8fafc",
                fg: "#334155",
                accent: "#0284c7",
            },
        },
        {
            name: "abyss",
            label: "Abyss",
            preview: {
                bg: "#0b1120",
                fg: "#f1f5f9",
                accent: "#38bdf8",
            },
        },
        {
            name: "everglade",
            label: "Everglade",
            preview: {
                bg: "#0a1a12",
                fg: "#e0f2f1",
                accent: "#34d399",
            },
        },
        {
            name: "latte",
            label: "Latte",
            preview: {
                bg: "#fffaf3",
                fg: "#57534e",
                accent: "#a85400",
            },
        },
        {
            name: "ember",
            label: "Ember",
            preview: {
                bg: "#1a1210",
                fg: "#fff7ed",
                accent: "#fb923c",
            },
        },
        {
            name: "void",
            label: "Void",
            preview: {
                bg: "#000000",
                fg: "#ffffff",
                accent: "#d4d4d8",
            },
        },
    ],
};

export default SiteConfig;
