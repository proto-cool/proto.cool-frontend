import fs from "node:fs";
import tailwindConfig from "@lib/tailwind.ts";
import type { Media } from "@lib/payload/payload-types.ts";
import satori from "satori";
import sharp from "sharp";
import { getImageSrc } from "@lib/payload/utils.ts";
import SiteConfig from "@/site.config.ts";

const generateOGImage = async ({
    title,
    subtitle,
    tag,
    bgImage,
}: {
    title: string;
    tag: string;
    subtitle?: string | null | undefined;
    bgImage?: number | Media | null | undefined;
}) => {
    const hasImage = bgImage && (bgImage as Media).url !== "";
    let imageSrc: string = "";
    let ogBGWidth = 1200;
    let ogBGHeight = 630;

    if (hasImage) {
        const bgImageMedia = bgImage as Media;
        imageSrc = getImageSrc(bgImageMedia.url as string);

        // keep the BG height relative to aspect ratio
        ogBGHeight = Math.round(
            (ogBGWidth / (bgImageMedia.width ?? ogBGWidth)) * (bgImageMedia.height ?? ogBGHeight),
        );
    }

    // Define the SVG template as a plain JavaScript object.
    // Satori expects a ReactNode element, but we don't need that to render a basic OpenGraph image
    const markup = {
        type: "div",
        props: {
            style: {
                fontFamily: "'Public Sans', sans-serif",
                fontSize: "24px",
                backgroundColor: tailwindConfig.theme.colors.base["900"],
                color: tailwindConfig.theme.colors.base["200"],
                padding: "64px",
                width: "1200px",
                height: "630px",
                textTransform: "lowercase",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
            },
            children: [
                {
                    type: "h1",
                    props: {
                        style: {
                            fontFamily: "'Chinook', sans-serif",
                            fontSize: "77px",
                            marginTop: "-16px",
                            marginBottom: "-8px",
                            color: tailwindConfig.theme.colors.green["500"],
                        },
                        children: SiteConfig.name,
                    },
                },
                {
                    type: "div",
                    props: {
                        style: {
                            width: "100%",
                            height: "auto",
                            marginTop: "auto",
                            maxHeight: "314px",
                            marginBottom: "auto",
                            backgroundColor: tailwindConfig.theme.colors.base["800"],
                            borderRadius: "36px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            paddingTop: "32px",
                            paddingBottom: "32px",
                        },
                        children: [
                            hasImage
                                ? {
                                      type: "div",
                                      props: {
                                          style: {
                                              position: "absolute",
                                              top: "0",
                                              bottom: "0",
                                              left: "0",
                                              right: "0",
                                              backgroundImage: `url(${imageSrc})`,
                                              backgroundPosition: "center",
                                              backgroundRepeat: "no-repeat",
                                              backgroundSize: `${ogBGWidth}px ${ogBGHeight}px`,
                                              opacity: "0.2",
                                              borderRadius: "36px",
                                          },
                                      },
                                  }
                                : null,
                            {
                                type: "h1",
                                props: {
                                    style: {
                                        fontSize: "72px",
                                        marginTop: "-8px",
                                        marginBottom: "8px",
                                        fontWeight: "600",
                                        textWrap: "balance",
                                    },
                                    children: title,
                                },
                            },
                            subtitle && {
                                type: "p",
                                props: {
                                    style: {
                                        fontSize: "48px",
                                        color: tailwindConfig.theme.colors.base["400"],
                                        marginTop: "16px",
                                        marginBottom: "4px",
                                        textOverflow: "ellipsis",
                                        textWrap: "balance",
                                    },
                                    children: subtitle,
                                },
                            },
                        ],
                    },
                },
                {
                    type: "div",
                    props: {
                        style: {
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                        },
                        children: [
                            {
                                type: "div",
                                props: {
                                    style: {
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        fontFamily: "'Monaspace Neon', sans-serif",
                                        fontSize: "32px",
                                        gap: "8px",
                                        borderRadius: "12px",
                                        padding: "8px 16px",
                                        backgroundColor: tailwindConfig.theme.colors.base["800"],
                                        color: tailwindConfig.theme.colors.base["400"],
                                    },
                                    children: [`#${tag}`],
                                },
                            },
                            {
                                type: "div",
                                props: {
                                    style: {
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        fontSize: "32px",
                                        gap: "8px",
                                        alignSelf: "flex-end",
                                        color: tailwindConfig.theme.colors.base["500"],
                                    },
                                    children: [
                                        {
                                            type: "fragment",
                                            props: {
                                                children: "by",
                                            },
                                        },
                                        SiteConfig.authorPhoto && {
                                            type: "img",
                                            props: {
                                                src: getImageSrc(SiteConfig.authorPhoto!.url!),
                                                alt: "profile picture",
                                                style: {
                                                    width: "48px",
                                                    height: "48px",
                                                    borderRadius: "999px",
                                                },
                                            },
                                        },
                                        {
                                            type: "span",
                                            props: {
                                                style: {
                                                    fontWeight: "600",
                                                },
                                                children: SiteConfig.authorName,
                                            },
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                },
            ],
        },
    };

    // Satori expects a ReactNode element, but this is Astro, not React.
    // Suppresses the warning on the `markup` type
    // @ts-ignore
    const svg = await satori(markup, {
        width: 1200,
        height: 630,
        fonts: [
            {
                name: "Public Sans",
                data: Buffer.from(fs.readFileSync("./public/fonts/PublicSans-Regular.woff").buffer),
                weight: 400,
            },
            {
                name: "Public Sans",
                data: Buffer.from(fs.readFileSync("./public/fonts/PublicSans-Bold.woff").buffer),
                weight: 600,
            },
            {
                name: "Chinook",
                data: Buffer.from(
                    fs.readFileSync("./public/fonts/chinook-regular-webfont.woff").buffer,
                ),
                weight: 400,
            },
            {
                name: "Monaspace Neon",
                data: Buffer.from(
                    fs.readFileSync("./public/fonts/MonaspaceNeon-Regular.woff").buffer,
                ),
                weight: 400,
            },
        ],
    });

    // Convert the SVG output to PNG
    return await sharp(Buffer.from(svg)).png().toBuffer();
};

export default generateOGImage;
