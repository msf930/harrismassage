import {defineField, defineType} from 'sanity'

export const packageType = defineType({
  name: 'package',
  title: 'Package',
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
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      description: 'Optional',
      type: 'array',
      of: [{ type: 'block' }]
    }),
    defineField({
        name: 'packagePrices',
        type: 'array',
        of: [{type: 'reference', to: [{type: 'packagePrice'}]}]
        
      }),
  ],
})