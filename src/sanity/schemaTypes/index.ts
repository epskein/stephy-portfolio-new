import type { SchemaTypeDefinition } from "sanity";

import { show } from "./show";
import { galleryImage } from "./galleryImage";
import { musicRelease } from "./musicRelease";
import { socialLink } from "./socialLink";
import { aboutPage } from "./aboutPage";

export const schemaTypes: SchemaTypeDefinition[] = [
  show,
  galleryImage,
  musicRelease,
  socialLink,
  aboutPage,
];
