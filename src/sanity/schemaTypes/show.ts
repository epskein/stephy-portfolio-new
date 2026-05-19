import { defineType, defineField } from "sanity";

export const show = defineType({
  name: "show",
  title: "Upcoming Show",
  type: "document",
  fields: [
    defineField({
      name: "venue",
      title: "Venue / Event name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "startDate",
      title: "Start date",
      type: "date",
      options: { dateFormat: "YYYY-MM-DD" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "End date",
      description: "Only needed for multi-day events.",
      type: "date",
      options: { dateFormat: "YYYY-MM-DD" },
    }),
    defineField({
      name: "location",
      title: "Location",
      description: 'Shown under the venue, e.g. "POD Karoo (WC, RSA)".',
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "flag",
      title: "Country",
      description: "Pick the country — its flag icon shows next to the location.",
      type: "string",
      options: {
        list: [
          { title: "South Africa 🇿🇦", value: "🇿🇦" },
          { title: "Australia 🇦🇺", value: "🇦🇺" },
          { title: "United Kingdom 🇬🇧", value: "🇬🇧" },
          { title: "United States 🇺🇸", value: "🇺🇸" },
          { title: "Germany 🇩🇪", value: "🇩🇪" },
          { title: "Netherlands 🇳🇱", value: "🇳🇱" },
          { title: "Spain 🇪🇸", value: "🇪🇸" },
          { title: "France 🇫🇷", value: "🇫🇷" },
          { title: "Portugal 🇵🇹", value: "🇵🇹" },
          { title: "Italy 🇮🇹", value: "🇮🇹" },
          { title: "Greece 🇬🇷", value: "🇬🇷" },
          { title: "Croatia 🇭🇷", value: "🇭🇷" },
          { title: "United Arab Emirates 🇦🇪", value: "🇦🇪" },
          { title: "Thailand 🇹🇭", value: "🇹🇭" },
          { title: "Indonesia 🇮🇩", value: "🇮🇩" },
          { title: "Mexico 🇲🇽", value: "🇲🇽" },
          { title: "Brazil 🇧🇷", value: "🇧🇷" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Date (soonest first)",
      name: "dateAsc",
      by: [{ field: "startDate", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "venue", date: "startDate", location: "location" },
    prepare({ title, date, location }) {
      return { title, subtitle: [date, location].filter(Boolean).join(" — ") };
    },
  },
});
