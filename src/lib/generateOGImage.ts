import fs from "node:fs";
import type { Media } from "@lib/payload/payload-types.ts";
import satori from "satori";
import sharp from "sharp";
import { getImageSrc } from "@lib/payload/utils.ts";
import SiteConfig from "@/site.config.ts";

const colors = {
    base: {
        50: "rgb(250,250,250)",
        100: "rgb(244,244,245)",
        200: "rgb(228,228,231)",
        300: "rgb(212,212,216)",
        400: "rgb(161,161,170)",
        500: "rgb(113,113,122)",
        600: "rgb(82,82,91)",
        700: "rgb(63,63,70)",
        800: "rgb(39,39,42)",
        900: "rgb(24,24,27)",
        950: "rgb(9,9,11)",
    },
    green: {
        50: "rgb(244,253,232)",
        100: "rgb(208,246,167)",
        200: "rgb(173,242,105)",
        300: "rgb(150,241,59)",
        400: "rgb(126,241,19)",
        500: "rgb(109,212,12)",
        600: "rgb(87,169,10)",
        700: "rgb(69,134,9)",
        800: "rgb(55,108,9)",
        900: "rgb(37,74,7)",
        950: "rgb(18,37,4)",
    },
};

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
                fontFamily: "'Bio Sans', sans-serif",
                fontSize: "24px",
                backgroundColor: colors.base["900"],
                color: colors.base["200"],
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
                            color: colors.green["500"],
                        },
                        children: SiteConfig.name,
                    },
                },
                {
                    type: "div",
                    props: {
                        style: {
                            width: "100%",
                            flexGrow: "1",
                            margin: "32px 0",
                            maxHeight: "314px",
                            backgroundColor: colors.base["800"],
                            borderRadius: "64px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            padding: "32px",
                            position: "relative",
                            overflow: "hidden",
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
                                              opacity: "0.1",
                                              borderRadius: "64px",
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
                                        fontWeight: "500",
                                        textWrap: "balance",
                                        lineHeight: "1.3",
                                    },
                                    children: title,
                                },
                            },
                            subtitle && {
                                type: "p",
                                props: {
                                    style: {
                                        fontSize: "48px",
                                        color: colors.base["400"],
                                        marginTop: "16px",
                                        marginBottom: "4px",
                                        textOverflow: "ellipsis",
                                        textWrap: "balance",
                                        lineHeight: "1.4",
                                    },
                                    children: subtitle,
                                },
                            },
                        ].filter(Boolean),
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
                                        fontSize: "32px",
                                        gap: "8px",
                                        borderRadius: "999px",
                                        padding: "8px 24px",
                                        backgroundColor: colors.base["800"],
                                        color: colors.base["400"],
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
                                        color: colors.base["500"],
                                    },
                                    children: [
                                        "by",
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
                                                    fontWeight: "500",
                                                },
                                                children: SiteConfig.authorName,
                                            },
                                        },
                                    ].filter(Boolean),
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
                name: "Bio Sans",
                data: fs.readFileSync("./public/fonts/biosans-regular-webfont.woff"),
                weight: 400,
            },
            {
                name: "Bio Sans",
                data: fs.readFileSync("./public/fonts/biosans-bold-webfont.woff"),
                weight: 600,
            },
            {
                name: "Chinook",
                data: fs.readFileSync("./public/fonts/chinook-regular-webfont.woff"),
                weight: 400,
            },
        ],
    });

    // Convert the SVG output to PNG
    return await sharp(Buffer.from(svg)).png().toBuffer();
};

export default generateOGImage;
