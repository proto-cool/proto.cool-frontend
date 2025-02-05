# proto.cool - an Astro blog site powered by Payload CMS

This is an Astro website built with Tailwind V4 that is meant to be paired with this accompanying Payload CMS repository: https://github.com/proto-cool/proto.cool-payload-cms

Together, they both provide a comprehensive blog publishing workflow with Payload CMS on the backend that allows you to author content for the blog without writing a line of code, while leveraging the fully static benefits of Astro.

For the developers, both the Astro frontend and Payload backend are fully open-source, and both basically as customizable as you see fit (and within your comfort level, of course).

I personally host the site at https://proto.cool with these repositories, but the content is safe in my Payload CMS instance (and backed up!)

## 🚀 Project Structure

Inside of this project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

You will not see traditional static assets in `public/` or content as Markdown files; this project was designed to be powered by a headless CMS like Payload instead.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                    | Action                                           |
| :------------------------- | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm run dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm run build`           | Build your production site to `./dist/`          |
| `pnpm run preview`         | Preview your build locally, before deploying     |
| `pnpm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm run astro -- --help` | Get help using the Astro CLI                     |

### S3 Sync Vite Plugin

I have commercial fonts I use for my own website I can't share via this repository as it would be a violation of the license agreement. To remedy this, I have the `public/` directory for my build in a Cloudflare R2 Storage bucket, and I wrote the plugin you can find at `plugins/vite-s3-sync-public-dir.js` to facilitate synchronizing these commercial assets at build time, i.e. for Cloudflare pages.

**Please note that there are some `.gitignore` rules for `public/` as a result!**

### Attributions

Brand icons used for the social links are from Simple Icons: https://simpleicons.org/
Remaining UI icons are from Heroicons: https://heroicons.com/
Webfonts were licensed from Fontspring: https://www.fontspring.com/
... except for Public Sans: https://github.com/uswds/public-sans

Made with love using:
Astro: https://astro.build/
Payload CMS: https://payloadcms.com/
Tailwind CSS: https://tailwindcss.com/
