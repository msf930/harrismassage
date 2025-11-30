import {defineField, defineType} from 'sanity'

export const packageSectionType = defineType({
  name: 'packageSection',
  title: 'Package Section',
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
      of: [{type: 'block'}]
    }),
    defineField({
        name: 'packages',
        type: 'array',
        of: [{type: 'reference', to: [{type: 'package'}]}]
        
      }),
  ],
})