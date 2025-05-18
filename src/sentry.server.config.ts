// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// REFER : https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs"

Sentry.init({
  dsn: "https://9a5ab3312d4b91323d7f195db950219f@o4509343781552128.ingest.de.sentry.io/4509343792037968",

  // Define how likely traces are sampled.
  // Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting
  // up Sentry.
  debug: false
})
