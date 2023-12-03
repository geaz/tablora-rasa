import mdx from '@mdx-js/rollup'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import remarkGfm from 'remark-gfm'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        {enforce: 'pre', ...mdx({ remarkPlugins: [ remarkGfm ] })},
        react()
    ]
})
