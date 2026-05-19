import { defineType, defineField } from "sanity";

export const musicRelease = defineType({
  name: "musicRelease",
  title: "Music Release",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "releaseType",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Single", value: "Single" },
          { title: "EP", value: "EP" },
          { title: "Album", value: "Album" },
          { title: "Remix", value: "Remix" },
          { title: "Mix / Set", value: "Mix" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
    }),
    defineField({
      name: "coverArt",
      title: "Cover art",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "link",
      title: "Listen link",
      description: "Spotify, SoundCloud, Apple Music, YouTube, etc.",
      type: "url",
    }),
    defineField({
      name: "order",
      title: "Display order",
      description: "Lower numbers appear first.",
      type: "number",
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", type: "releaseType", year: "year", media: "coverArt" },
    prepare({ title, type, year, media }) {
      return { title, subtitle: [type, year].filter(Boolean).join(" · "), media };
    },
  },
});
