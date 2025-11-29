import {defineField, defineType} from 'sanity'
import {InfoFilledIcon} from '@sanity/icons'    

export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: InfoFilledIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      initialValue: 'About Page',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'aboutSections',
      type: 'array',
      icon: InfoFilledIcon,
      of: [{type: 'reference', to: [{type: 'aboutSection'}]}]
      
    })
  ],
})