export const video = {
  name: "video",
  title: "Video Block",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "url",
      title: "Video URL",
      type: "url",
      description: "URL to the video (YouTube, Vimeo, etc.)",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "poster",
      title: "Poster Image",
      type: "image",
      description: "Image to show before the video plays",
      options: {
        hotspot: true,
      },
    },
    {
      name: "autoplay",
      title: "Autoplay",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "loop",
      title: "Loop",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "muted",
      title: "Muted",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "controls",
      title: "Show Controls",
      type: "boolean",
      initialValue: true,
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
      title: "title",
      media: "poster",
    },
    prepare({ title }: { title: string }) {
      return {
        title: title || "Video Block",
        media: "🎥",
      };
    },
  },
};
