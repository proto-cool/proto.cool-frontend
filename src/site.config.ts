import { getSiteSettings } from "@lib/payload/utils.ts";
import type { Media, Site } from "@lib/payload/payload-types";

export interface SocialLinkProps {
    platform:
        | "github"
        | "bluesky"
        | "mastodon"
        | "linkedin"
        | "instagram"
        | "threads"
        | "facebook"
        | "youtube"
        | "twitch"
        | "tiktok"
        | "snapchat"
        | "reddit"
        | "pinterest"
        | "medium"
        | "dev"
        | "dribbble"
        | "behance"
        | "codepen"
        | "producthunt"
        | "discord"
        | "slack"
        | "whatsapp"
        | "telegram"
        | "email";
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
}

export type ContentType = "base" | "post" | "page";

const payloadSiteSettings = (await getSiteSettings()) as Required<Site>;

const SiteConfig: SiteConfigProps = {
    // Meta fields
    name: payloadSiteSettings.name,
    title: payloadSiteSettings.title,
    description: payloadSiteSettings.description,
    useViewTransitions: payloadSiteSettings["site-settings"]["use-view-transitions"] ?? true,
    useAnimations: payloadSiteSettings["site-settings"]["use-animations"] ?? true,

    // Social links
    socialLinks:
        payloadSiteSettings.social?.map((social) => ({
            platform: social.platform,
            link: social.link,
            text: social.label,
        })) ?? [],

    // What to display as your name throughout the site
    authorName: payloadSiteSettings.author,
    authorPhoto: payloadSiteSettings["author-photo"] as Media | null,

    // Site navigation
    navLinks:
        payloadSiteSettings.nav?.map((nav) => ({
            href: nav.link,
            text: nav.label,
        })) ?? [],

    // used for analytics, etc
    codeInjection: payloadSiteSettings["code-injection"],

    // Used to calculate the date correctly for the site
    timezone: payloadSiteSettings["site-settings"].timezone,
};

export default SiteConfig;
