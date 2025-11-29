import {defineField, defineType} from 'sanity'

export const aboutSectionType = defineType({
  name: 'aboutSection',
  title: 'About Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'array',
      of: [{type: 'block'}],
      validation: (rule) => rule.required(),
    }),
  
  ],
})