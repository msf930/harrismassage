import { defineField, defineType } from 'sanity'

export const serviceSectionType = defineType({
  name: 'serviceSection',
  title: 'Service Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      
      type: 'array',
      of: [{ type: 'block' }]
    }),
    defineField({
      name: 'services',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }]

    }),
  ],
})