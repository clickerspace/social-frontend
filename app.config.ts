export default defineAppConfig({
  ui: {
    primary: "nile-blue",
    gray: "voodoo", // change to match your design
    notifications: {
      position: "top-4 right-0 bottom-auto left-auto",
      container: "space-y-3 px-4 py-0 sm:py-0  overflow-y-auto hide-scrollbar",
    },
    modal: {
      base: "overflow-hidden",
    },
    card: {
      base: "select-none",
    },
    notification: {
      background: "bg-primary-700 dark:bg-primary-700",
      ring: "ring-0",
      description: "text-primary-200 dark:text-primary-200",
      title: "text-white dark:text-white",
      default: {
        closeButton: {
          color: "gray",
        },
      },
    },
    button: {
      color: {
        primary: {
          solid:
            "text-primary-900 dark:text-brown-900 bg-primary-200 hover:bg-primary-100 disabled:bg-brown-700 dark:bg-primary-200 dark:hover:bg-primary-100 dark:disabled:bg-primary-700",
          ghost:
            "text-primary-900 dark:text-primary-200 hover:bg-primary-100 dark:hover:bg-primary-100!",
        },
      },
    },
    input: {
      color: {},
    },
    skeleton: {
      background: "bg-primary-800 dark:bg-primary-800",
    },
  },
});
