import {defineField, defineType} from 'sanity'

export const homeConditionsType = defineType({
  name: 'homeConditions',
  title: 'Home Conditions',
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
      of: [{type: 'block'}],
      validation: (rule) => rule.required(),
    })
  ],
})