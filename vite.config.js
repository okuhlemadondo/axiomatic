import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeHighlight from 'rehype-highlight'
import rehypeKatex from 'rehype-katex'

import { remarkReadingTime } from './src/utils/remark-reading-time.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [remarkFrontmatter, remarkReadingTime, [remarkMdxFrontmatter, { name: 'frontmatter' }], remarkGfm, remarkMath],
        rehypePlugins: [rehypeHighlight, rehypeKatex],
        providerImportSource: "@mdx-js/react",
      })
    },
    react()
  ],
  server: {
    historyApiFallback: true,
  }
})
