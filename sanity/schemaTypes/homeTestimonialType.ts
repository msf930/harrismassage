import {defineField, defineType} from 'sanity'

export const homeTestimonialType = defineType({
  name: 'homeTestimonial',
  title: 'Home Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'testimonial',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({  
      name: 'author',
      type: 'string',
      validation: (rule) => rule.required(),
    })
  ],
})