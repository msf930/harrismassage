import {defineField, defineType} from 'sanity'
import {CropIcon} from '@sanity/icons'
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
      description: `Important: Crop using the crop icon in the top right corner  of the image and resize the image to a square.`,
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
      type: 'array',
      of: [{type: 'block'}],
      validation: (rule) => rule.required(),
    }),
  
  ],
})