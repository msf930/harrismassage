import {defineField, defineType} from 'sanity'

export const packagePriceType = defineType({
  name: 'packagePrice',
  title: 'Package Price',
  type: 'document',
  fields: [
    defineField({
      name: 'durationInMinutes',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'packagePackQuantity',
      type: 'number'
    }),
    defineField({
      name: 'priceAmount',
      type: 'number',
      
      validation: (rule) => rule.required(),
    }),
   
  ],
})