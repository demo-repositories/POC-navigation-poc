import {defineType} from 'sanity'
import {ProductSearch} from '../components/ProductSearch'

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'featuredProducts',
      title: 'Featured Products',
      type: 'string',
      components: {
        field: ProductSearch,
      },
    },
    {
      name: 'centraId',
      title: 'Centra ID',
      type: 'string',
    },
    {
      name: 'level',
      title: 'Level',
      type: 'number',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'content',
      title: 'content',
      type: 'array',
      of: [
        {name: 'feature', type: 'feature'},
        {name: 'grid', type: 'grid'},
        {name: 'textBlock', type: 'textBlock'},
        {name: 'cta', type: 'cta'},
        {name: 'imageWithAlt', type: 'imageWithAlt'},
        {name: 'video', type: 'video'},
      ],
    },
    {
      name: 'children',
      title: 'Children',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}]}],
    },

    {
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Whether this category should be shown in the navigation',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})
