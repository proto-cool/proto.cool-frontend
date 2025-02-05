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
};

export default SiteConfig;
