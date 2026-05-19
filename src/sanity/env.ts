// Sanity project configuration.
// Project ID and dataset are not secret (they ship in the client bundle), so
// they fall back to literals — but Netlify/local env vars can still override.
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "4uhc6klk";
