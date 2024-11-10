# Nuxt MiniApp Project USE AS A TEMPLATE ONLY

This project is a Nuxt mini-app using `pnpm` as the package manager. It includes proxy settings for API requests and support for an HTTPS environment. Follow these steps to get started.

## Getting Started

1. **Environment Setup**

   - Create a `.env` file in the root directory.
   - Copy the contents from `.env.example` to `.env` to set up required environment variables.
   - This is needed for starting the app.

2. **Running the Project**
   - Start the development server with:
     ```bash
     pnpm dev
     ```
   - To run the project in HTTPS mode, use the following command:
     ```bash
     pnpm devssl
     ```
     **Note**: For HTTPS, we recommend using [mkcert](https://github.com/FiloSottile/mkcert) to generate SSL certificates.

## Proxy Configuration

To handle API requests securely and avoid CORS issues, configure a proxy in `nuxt.config.js`.

## Important Packages

- **@nuxt/content**: For managing content and providing markdown support.
- **@nuxt/image**: Optimizes images and provides responsive support.
- **@nuxtjs/i18n**: Adds internationalization support.
- **@pinia/nuxt** and **pinia**: State management for Vue 3 applications.
- **@nuxtjs/google-fonts**: Loads Google Fonts into the project.
- **@rive-app/canvas**: Adds support for animations with Rive.
- **lodash**: Provides utility functions to simplify complex operations.
- **vite-plugin-node-polyfills**: Polyfills for Node.js modules in Vite.

## Scripts

- **dev**: Starts the development server.
- **devssl**: Starts the development server with HTTPS using `mkcert` SSL certificates.
- **generate**: Builds static files for deployment.
- **postinstall**: Prepares the environment after installing dependencies.

## Package Manager

This project uses `pnpm@8.15.7`.
