export const cta = {
  name: "cta",
  title: "Call to Action",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "buttonText",
      title: "Button Text",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "buttonUrl",
      title: "Button URL",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "variant",
      title: "Button Variant",
      type: "string",
      options: {
        list: [
          { title: "Primary", value: "primary" },
          { title: "Secondary", value: "secondary" },
          { title: "Outline", value: "outline" },
        ],
      },
      initialValue: "primary",
    },
    {
      name: "image",
      title: "Background Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      title: "title",
      buttonText: "buttonText",
      media: "image",
    },
    prepare({ title, buttonText }: { title: string; buttonText: string }) {
      return {
        title: title || "Call to Action",
        subtitle: buttonText,
      };
    },
  },
};
