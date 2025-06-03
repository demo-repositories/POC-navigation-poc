export const image = {
  name: "imageWithAlt",
  title: "Image Block",
  type: "object",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "alt",
      title: "Alt Text",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "caption",
      title: "Caption",
      type: "string",
    },
    {
      name: "layout",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { title: "Full Width", value: "full" },
          { title: "Contained", value: "contained" },
          { title: "Left Aligned", value: "left" },
          { title: "Right Aligned", value: "right" },
        ],
      },
      initialValue: "full",
    },
  ],
  preview: {
    select: {
      title: "alt",
      media: "image",
    },
  },
};
