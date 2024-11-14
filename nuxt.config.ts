// https://nuxt.com/docs/api/configuration/nuxt-config
import { nodePolyfills } from "vite-plugin-node-polyfills";
export default defineNuxtConfig({
  app: {
    head: {
      title: "Social Game", // Change the title to reflect the app name
      htmlAttrs: {
        lang: "en", // Retain the language attribute as English
      },
      script: [
        ...(process.env.NUXT_PUBLIC_MODE !== "dev"
          ? [
              //   {
              //     src: "https://sad.adsgram.ai/js/sad.min.js",
              //     type: "text/javascript",
              //   },
              //   {
              //     src: "https://tganalytics.xyz/index.js",
              //     type: "text/javascript",
              //   },
              //   {
              //     src: `https://static.sonartech.io/lib/1.0.0/sonar.js?appId=${process.env.SONAR_APP_ID}`,
              //     type: "text/javascript",
              //   },
            ]
          : []),
      ],
      meta: [
        { charset: "utf8" },
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no",
        },
        {
          hid: "description",
          name: "description",
          content: "Join the ultimate social gaming experience!",
        }, // Add an app-specific description
        { name: "format-detection", content: "telephone=no" },
        { name: "og:title", content: "Social Game" }, // Open Graph title for social media sharing
        {
          name: "og:description",
          content: "Join the ultimate social gaming experience!",
        }, // Open Graph description
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  runtimeConfig: {
    BOT_TOKEN: process.env.BOT_TOKEN,
    DISCORD_URL: process.env.DISCORD_URL,
    WORKER_API_KEY: process.env.WORKER_API_KEY,
    public: {
      TGA_TOKEN: process.env.NUXT_PUBLIC_TGA_TOKEN,
      RETURN_URL: process.env.NUXT_PUBLIC_RETURN_URL,
      NUXT_MODE: process.env.NUXT_PUBLIC_MODE,
      PUBLIC_URL: process.env.NUXT_PUBLIC_URL,
      DISABLED_BACKEND: process.env.NUXT_PUBLIC_DISABLE_BACKEND,
      API_URL: process.env.NUXT_PUBLIC_API_URL,
    },
  },

  icon: {
    provider: "server",
    clientBundle: {
      scan: true,
      icons: [
        // add new icons here from quests better RECOMMENDATION: use OLD icons // rest is caught from the scan
        "ant-design:login-outlined",
        "akar-icons:check-in",
        "akar-icons:youtube",
        "ic:baseline-tiktok",
        "akar-icons:x-fill",
        "akar-icons:discord-fill",
        "mingcute:telegram-fill",
        "mdi:web-check",
        "token:ton",
        "ic:baseline-star-rate",
        "icon-park-outline:radar-three",
        "mingcute:game-1-fill",
        "akar-icons:instagram-fill",
        "mdi:gamepad-variant",
        "mingcute:emoji-2-fill",
        "mdi:linkedin",
        "mdi:information",
        "maki:watermill-11",
        "ri:water-flash-fill",
      ],
      sizeLimitKb: 256,
    },
  },

  css: ["@/assets/css/main.css"],
  devtools: { enabled: true },

  modules: [
    "@nuxt/ui",
    "@vueuse/nuxt",
    "@nuxtjs/device",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "nuxt-marquee",
    "@nuxtjs/google-fonts",
    "@nuxtjs/i18n",
    "@nuxt/image",
  ],

  typescript: {
    typeCheck: true,
  },

  googleFonts: {
    preconnect: true,
    preload: true,
    prefetch: true,
    display: "swap",
    families: {
      Inter: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      Roboto: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      "Luckiest Guy": [400],
      "Londrina Solid": [100, 300, 400, 900],
    },
  },

  ssr: false,

  i18n: {
    vueI18n: "./nuxt-i18n.ts",
  },

  vite: {
    define: {
      global: {}, // global tanımı (örneğin, Buffer için)
    },
    plugins: [nodePolyfills()],
    server: {
      proxy: {
        // "/events": { // may be needed if bridge error. check if needed
        //   target: "https://bridge.ton.space",
        //   changeOrigin: true,
        //   rewrite: (path: string) =>
        //     path.replace(/^\/events/, "/bridge/events"),
        // },
        "/backend/social": {
          target: `${process.env.NUXT_PUBLIC_API_URL}`,
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/backend/, ""),
        },
        "/workerapi": {
          target: "https://calm-waterfall-ffad.leirapcom.workers.dev",
          changeOrigin: true,
        },
      },
    },
    optimizeDeps: {
      include: [
        "@tonconnect/ui",
        "vue3-lottie",
        "lodash/debounce",
        "driver.js",
        "@rive-app/canvas",
        "@ton/core",
      ],
    },
  },

  nitro: {
    routeRules: {
      //   "/events": {
      //     proxy: "https://bridge.ton.space/bridge/events", // needed if bridge error
      //   },
      "/backend/**": { proxy: `${process.env.NUXT_PUBLIC_API_URL}/social/**` },
      "/workerapi": {
        proxy: "https://calm-waterfall-ffad.leirapcom.workers.dev",
      },
    },
    devProxy: {
      "/workerapi": {
        target: "https://calm-waterfall-ffad.leirapcom.workers.dev", // hashes api worker
        changeOrigin: true,
      },
    },
  },

  compatibilityDate: "2024-11-10",
});
