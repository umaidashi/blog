import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy
} from '@remix-run/dev'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import wasm from 'vite-plugin-wasm'

export default defineConfig({
  plugins: [
    wasm(),
    remixCloudflareDevProxy(),
    remix({
      // future: {
      //   v3_fetcherPersist: true,
      //   v3_relativeSplatPath: true,
      //   v3_throwAbortReason: true,
      // },
    }),
    tsconfigPaths()
  ],
  optimizeDeps: {
    include: ['clsx', 'remix-themes', '@remix-run/cloudflare', 'hono/client']
  }
})
