import en from "./lang/en/index.js";

// You can use `defineI18nConfig` to get type inferences for options to pass to vue-i18n.
export default defineI18nConfig(() => {
  // MARK Add in messages for each language you want to support
  return {
    legacy: false,
    locale: "en",
    messages: {
      en,
    },
    detectBrowserLanguage: {
      useCookie: true,
      redirectOn: "root", // recommended
    },
    // defaultLocale: "en",
    strategy: "no_prefix",
  };
});
