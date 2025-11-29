import {defineField, defineType} from 'sanity'

export const servicesPageType = defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
 
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      initialValue: 'Services Page',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'vagaroUrl',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'serviceSections',
        type: 'array',
        of: [{type: 'reference', to: [{type: 'serviceSection'}]}]
        
      }),
  ],
})