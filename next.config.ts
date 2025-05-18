import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // The NextJS Compiler, written in Rust using SWC, allows Next.js to transform and minify your
  // JavaScript code for production.
  // This replaces Babel for individual files and Terser for minifying output bundles.
  compiler: {
    removeConsole: true
  },

  // Configure the on-screen indicator that gives context about the current route you're viewing
  // during development.
  devIndicators: {
    position: "bottom-right"
  },

  // Opt out of the x-powered-by header added by default by NextJS.
  poweredByHeader: false,

  experimental: {
    // In order to optimize applications, React Compiler automatically memoizes your code.
    // NextJS includes a custom performance optimization written in SWC that makes the React
    // Compiler more efficient. Instead of running the compiler on every file, NextJS analyzes your
    // project and only applies the React Compiler to relevant files. This avoids unnecessary work
    // and leads to faster builds compared to using the Babel plugin on its own.
    reactCompiler: true,

    /*
      Partial Prerendering (PPR) enables you to combine static and dynamic components together in
      the same route.

        (1) The server sends a shell containing the static content, ensuring a fast initial load.

        (2) The shell leaves holes for the dynamic content that will load in asynchronously.

        (3) The dynamic holes are streamed in parallel, reducing the overall load time of the page.
    */
    ppr: true,

    // Enable statically typed links.
    // NOTE : This does not work with Turbopack.
    // typedRoutes: true,

    typedEnv: true,

    // Enables the new experimental View Transitions API in React. This API allows you to leverage
    // the native View Transitions browser API to create seamless transitions between UI states.
    viewTransition: true,

    // Use Lightning CSS, a fast CSS bundler and minifier, written in Rust.
    // NOTE : This does not work with postcss plugins.
    // useLightningcss: true,

    // Some packages can export hundreds or thousands of modules, which can cause performance
    // issues in development and production.
    // Adding this will only load the modules you are actually using, while still giving you the
    // convenience of writing import statements with many named exports.
    optimizePackageImports: [],

    webpackMemoryOptimizations: true,

    // Run Webpack compilations inside a separate NodeJS worker which will decrease memory usage of
    // your application during builds.
    webpackBuildWorker: true
  }
}

// Plugin for NextJS that helps you manage the size of your application bundles.
// It generates a visual report of the size of each package and their dependencies.
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
})

export default withBundleAnalyzer(nextConfig)
