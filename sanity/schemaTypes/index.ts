import { type SchemaTypeDefinition } from 'sanity'
import { homePageType } from './homePageType'
import { homeServiceType } from './homeServiceType'
import { homeConditionsType } from './homeConditionsType'
import { homeTestimonialType } from './homeTestimonialType'
import { servicesPageType } from './servicesPageType'
import { serviceSectionType } from './serviceSectionType'
import { servicePriceType } from './servicePriceType'
import { packagePriceType } from './packagePriceType'
import { serviceType } from './serviceType'
import { aboutPageType } from './aboutPageType'
import { packageType } from './packageType'
import { packageSectionType } from './packageSectionType'
import { packagesPageType } from './packagesPageType'
import { aboutSectionType } from './aboutSectionType'
import { blogPostType } from './blogPostType'
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    homePageType, 
    homeServiceType, 
    homeConditionsType, 
    homeTestimonialType,
    aboutPageType,
    aboutSectionType,
    servicesPageType,
    serviceSectionType,
    serviceType,
    servicePriceType,
    packagePriceType,
    packagesPageType,
    packageType,
    packageSectionType,
    blogPostType,
  ],
}
