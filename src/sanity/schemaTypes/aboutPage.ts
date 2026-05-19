import { defineType, defineField, defineArrayMember } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "profileImage",
      title: "Profile photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      title: "Biography",
      description: "The main 'About Stephy' paragraphs — add one block per paragraph.",
      type: "array",
      of: [defineArrayMember({ type: "text" })],
    }),
    defineField({
      name: "stats",
      title: "Stats",
      description: "The small number boxes (e.g. Shows 100+, Venues 50+).",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "stat",
          fields: [
            { name: "value", title: "Value", type: "string" },
            { name: "label", title: "Label", type: "string" },
          ],
          preview: {
            select: { title: "value", subtitle: "label" },
          },
        }),
      ],
    }),
    defineField({
      name: "journey",
      title: "The Journey",
      description: "Timeline milestones.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "milestone",
          fields: [
            { name: "year", title: "Year", type: "string" },
            { name: "title", title: "Title", type: "string" },
            { name: "description", title: "Description", type: "text", rows: 2 },
          ],
          preview: {
            select: { title: "title", subtitle: "year" },
          },
        }),
      ],
    }),
    defineField({
      name: "styleDescription",
      title: "Musical style — description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "genres",
      title: "Genres",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
  ],
  preview: {
    prepare() {
      return { title: "About Page" };
    },
  },
});
