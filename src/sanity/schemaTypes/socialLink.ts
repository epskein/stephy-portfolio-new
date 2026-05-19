import { defineType, defineField } from "sanity";

export const socialLink = defineType({
  name: "socialLink",
  title: "Social Link",
  type: "document",
  fields: [
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      options: {
        list: [
          { title: "Instagram", value: "Instagram" },
          { title: "TikTok", value: "TikTok" },
          { title: "Spotify", value: "Spotify" },
          { title: "SoundCloud", value: "SoundCloud" },
          { title: "Apple Music", value: "Apple Music" },
          { title: "YouTube", value: "YouTube" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "Profile URL",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "handle",
      title: "Handle / Display name",
      description: 'e.g. "@stephylongueira"',
      type: "string",
    }),
    defineField({
      name: "order",
      title: "Display order",
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
    select: { title: "platform", subtitle: "handle" },
  },
});
