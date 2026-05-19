import type { StructureResolver } from "sanity/structure";

// Custom Studio sidebar: friendly groupings, with the About Page as a
// single editable document (singleton) rather than a list.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Upcoming Shows")
        .schemaType("show")
        .child(S.documentTypeList("show").title("Upcoming Shows")),
      S.listItem()
        .title("Gallery")
        .schemaType("galleryImage")
        .child(S.documentTypeList("galleryImage").title("Gallery")),
      S.listItem()
        .title("Music Releases")
        .schemaType("musicRelease")
        .child(S.documentTypeList("musicRelease").title("Music Releases")),
      S.listItem()
        .title("Social Links")
        .schemaType("socialLink")
        .child(S.documentTypeList("socialLink").title("Social Links")),
      S.divider(),
      S.listItem()
        .title("About Page")
        .id("aboutPage")
        .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
    ]);
