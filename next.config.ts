import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Configure webpack to properly handle pdfjs-dist ESM module
    if (!isServer) {
      // Tell webpack to handle pdfjs-dist as an ESM module without transforming it
      config.module.rules.push({
        test: /node_modules[\\/]pdfjs-dist/,
        resolve: {
          fullySpecified: false,
        },
      });
    }

    // Configure webpack to handle html-encoding-sniffer ES module compatibility
    // This module is a dependency of jsdom/isomorphic-dompurify and has issues
    // with require() of ES modules. Dynamic imports in code handle this at runtime.
    if (isServer) {
      config.resolve = config.resolve || {};
      config.resolve.extensionAlias = {
        ...config.resolve.extensionAlias,
        ".js": [".js", ".ts", ".tsx"],
      };
    }

    return config;
  },
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: "mission-mike",
  project: "ampdresume",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  sourcemaps: {
    // Prevents source maps from being available to users.
    deleteSourcemapsAfterUpload: true,
  },

  webpack: {
    // Automatically annotate React components to show their full name in breadcrumbs and session replay
    reactComponentAnnotation: {
      enabled: true,
    },

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    treeshake: {
      removeDebugLogging: true,
    },

    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  },
});
