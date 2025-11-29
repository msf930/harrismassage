import {defineField, defineType} from 'sanity'
import {PackageIcon} from '@sanity/icons'

export const packagesPageType = defineType({
  name: 'packagesPage',
  title: 'Packages Page',
  type: 'document',
  icon: PackageIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      initialValue: 'Packages Page',
      validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'packageSections',
        type: 'array',
        of: [{type: 'reference', to: [{type: 'packageSection'}]}]
        
      }),
  ],
})