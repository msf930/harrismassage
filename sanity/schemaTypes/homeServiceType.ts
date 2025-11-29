import {defineField, defineType} from 'sanity'

export const homeServiceType = defineType({
  name: 'homeService',
  title: 'Home Service',
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
    })
  ],
})