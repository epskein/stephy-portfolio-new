import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

// Source type is inferred from the builder so we don't depend on internal paths.
export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}
