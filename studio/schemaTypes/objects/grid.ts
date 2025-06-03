export const grid = {
  name: "grid",
  title: "Grid",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "columns",
      title: "Number of Columns",
      type: "number",
      initialValue: 3,
      validation: (Rule: any) => Rule.min(1).max(4),
    },
    {
      name: "items",
      title: "Grid Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
            },
            {
              name: "description",
              title: "Description",
              type: "text",
            },
            {
              name: "image",
              title: "Image",
              type: "image",
              options: {
                hotspot: true,
              },
            },
            {
              name: "link",
              title: "Link",
              type: "object",
              fields: [
                {
                  name: "text",
                  title: "Link Text",
                  type: "string",
                },
                {
                  name: "url",
                  title: "URL",
                  type: "string",
                },
              ],
            },
          ],
          preview: {
            select: {
              title: "title",
              media: "image",
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "items",
    },
    prepare({ title, subtitle }: { title: string; subtitle: any[] }) {
      return {
        title: title || "Grid",
        subtitle: `${subtitle?.length || 0} items`,
      };
    },
  },
};
