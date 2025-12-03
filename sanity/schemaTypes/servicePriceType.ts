import {defineField, defineType} from 'sanity'

export const servicePriceType = defineType({
  name: 'servicePrice',
  title: 'Service Price',
  type: 'document',
  fields: [
    defineField({
      name: 'durationInMinutes',
      type: 'number',
      description: 'optional',
    }),
    defineField({
      name: 'priceAmount',
      type: 'number',
      
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'vagaroUrl',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
   
  ],
})