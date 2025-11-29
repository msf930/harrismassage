import {defineField, defineType} from 'sanity'
import { FaHome } from "react-icons/fa";

export const homePageType = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: FaHome,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'Do not edit this field',
      initialValue: 'Home Page',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroImage',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'services',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'homeService'}]}],
      validation: (rule) => rule.required(),
    }),
    defineField({  
      name: 'conditions',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'homeConditions'}]}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'testimonials',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'homeTestimonial'}]}],
      validation: (rule) => rule.required(),
    }),
  ],
})