import { defineType, defineField } from "sanity";

export const galleryImage = defineType({
  name: "galleryImage",
  title: "Gallery Image",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Live", value: "live" },
          { title: "Portraits", value: "portraits" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featuredOnHome",
      title: "Show in homepage carousel",
      description: "Tick to include this photo in the home 'Moments Captured' strip.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display order",
      description: "Lower numbers appear first. Leave blank for automatic order.",
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
    select: { media: "image", title: "category", order: "order" },
    prepare({ media, title, order }) {
      return {
        media,
        title: title === "live" ? "Live" : "Portraits",
        subtitle: order != null ? `Order: ${order}` : undefined,
      };
    },
  },
});
