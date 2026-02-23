import { readdirSync } from 'node:fs'
import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { viteBundler } from '@vuepress/bundler-vite'
import markdownItAttrs from 'markdown-it-attrs'
import markdownItBracketedSpans from 'markdown-it-bracketed-spans'
import markdownItInsert from 'markdown-it-ins'
import markdownItImsize from 'markdown-it-imsize'
import markdownItMultimdTable from 'markdown-it-multimd-table'
import { collapsibleTopLevelSidebar } from 'vuepress-collapsible-toplevel-sidebar'

// ['Part0', 'Part1', 'Part2', ...]
const parts = readdirSync("./docs/parts/").map((partName) =>
  partName.replace(/.md$/g, ""),
);

const config = defineUserConfig({
  lang: "zh-CN",
  title: "Shizu's HRT Guide",
  description: "Shizu's HRT Guide for transfemale",

  // 关键：显式指定 Vite bundler，并给 Sass 现代 API
  bundler: viteBundler({
    viteOptions: {
      css: {
        preprocessorOptions: {
          scss: {
            api: "modern-compiler",
            silenceDeprecations: ['legacy-js-api', 'import'],
          },
        },
      },
    },
  }),

  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["link", { rel: "stylesheet", href: "/custom.css", type: "text/css" }],
  ],
  theme: defaultTheme({
    logo: "/logo.png",
    repo: "BBleae/hrt-book",
    repoLabel: "GitHub",
    docsRepo: "BBleae/hrt-book",
    docsDir: "docs",
    docsBranch: "main",
    editLink: true,
    editLinkText: "编辑本页面",
    contributors: true,
    contributorsText: "贡献者",
    lastUpdated: false,
    themePlugins: {
      externalLinkIcon: true,
    },
    sidebar: {
      "/cafe/": [
        "HOME",
        "DONATE",
        "Estradiol",
        "Progesterone",
        "Anti-Androgens",
        "HairLoss",
        "SERMs",
        "Miscellaneous",
        "RESOURCES",
        "CONTACT",
      ],
      "/": [""],
    },
    navbar: [
      { text: "首页", link: "/" },
      { text: "目录", link: "/menu/" },
      { text: "Cafe", link: "/cafe/" },
      { text: "工具", link: "/tools/" },
      { text: "链接", link: "/link/" },
      { text: "Credits", link: "/credits/" },
    ],
  }),
  extendsMarkdown: (md) => {
    md.use(markdownItBracketedSpans);
    md.use(markdownItAttrs);
    md.use(markdownItInsert);
    md.use(markdownItImsize);
    md.use(markdownItMultimdTable, { rowspan: true });
  },
  plugins: [
    collapsibleTopLevelSidebar("/parts/", parts),
  ],
});

export default config;
