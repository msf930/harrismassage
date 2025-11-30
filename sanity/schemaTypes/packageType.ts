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
      description: `Important: Crop using the crop icon in the top right corner of the image and resize the image to a square.`,
      options: {
        hotspot: {
          previews: [
            {title: 'Square', aspectRatio: 1 / 1},
            
          ]
        }
        
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