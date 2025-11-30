import {defineField, defineType} from 'sanity'
import { RiPagesLine } from "react-icons/ri";

export const blogPostType = defineType({
  name: 'blogPost',
  title: 'Blog Posts',
  type: 'document',
  icon: RiPagesLine,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .slice(0, 96),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'keywords',
      type: 'array',
      of: [{type: 'string'}],
      
    }),
    defineField({
      name: 'image',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [{type: 'block'}]
    })
  ],
  orderings: [
    {
      title: 'Date',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
      media: 'image',
    },
  },
})