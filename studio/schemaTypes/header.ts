import {defineType, defineField} from 'sanity'

export const header = defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'The main logo image for the header',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'logoAlt',
      title: 'Logo Alt Text',
      type: 'string',
      description: 'Alternative text for the logo image',
    }),
    defineField({
      name: 'navigation',
      title: 'Navigation Items',
      type: 'array',
      of: [
        {
          type: 'navigationItem',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'logoAlt',
    },
    prepare({title}) {
      return {
        title: title || 'Header Configuration',
      }
    },
  },
})

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Link Type',
      type: 'string',
      options: {
        list: [
          {title: 'URL', value: 'url'},
          {title: 'Internal', value: 'reference'},
        ],
      },
      // validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'internationalizedArrayString',
      hidden: ({parent}) => parent?.type !== 'url',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      hidden: ({parent}) => parent?.type !== 'url',
      // validation: (Rule) =>
      //   Rule.required().custom((value, context) => {
      //     if (context.parent?.type === 'url' && !value) {
      //       return 'URL is required when link type is URL'
      //     }
      //     return true
      //   }),
    }),
    defineField({
      name: 'reference',
      title: 'Internal',
      type: 'reference',
      to: [{type: 'page'}, {type: 'category'}],
      hidden: ({parent}) => parent?.type !== 'reference',
      // validation: (Rule) =>
      //   Rule.required().custom((value, context) => {
      //     if (context.parent?.type === 'reference' && !value) {
      //       return 'Reference is required when link type is Internal Page'
      //     }
      //     return true
      //   }),
    }),
  ],
})

export const submenuItem = defineType({
  name: 'submenuItem',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'internationalizedArrayString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'internationalizedArrayLink',
    }),
  ],
})

export const navigationItem = defineType({
  name: 'navigationItem',
  type: 'object',
  fields: [
    defineField({
      name: 'visibility',
      title: 'Visibility',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      options: {
        list: ['JP', 'EU', 'NA', 'APAC'],
        layout: 'grid',
      },
    }),

    defineField({
      name: 'link',
      title: 'Link',
      type: 'internationalizedArrayLink',
    }),
    defineField({
      name: 'children',
      title: 'Submenu Items',
      type: 'array',
      of: [
        {
          type: 'navigationItem',
        },
      ],
    }),
  ],
  preview: {
    select: {
      linkType: 'link.0.type',
      linkUrl: 'link.0.value.title.0.value',
      linkReference: 'link.0.value.reference.title',
    },
    prepare({linkType, linkUrl, linkReference}) {
      const title = linkType === 'url' ? linkUrl : linkReference
      return {title: title || 'Navigation Item'}
    },
  },
})
