import type {StructureResolver} from 'sanity/structure'
import {InfoFilledIcon} from '@sanity/icons' 
import {StarFilledIcon} from '@sanity/icons'
import { FaHandHolding } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
/**
 * Configure which document types appear in the Sanity Studio dashboard
 * 
 * Option 1: Use VISIBLE_TYPES to show only specific types (whitelist)
 * Option 2: Use HIDDEN_TYPES to hide specific types (blacklist)
 * 
 * Note: Only use ONE approach at a time. Comment out the one you're not using.
 */

// Option 1: Whitelist - Only show these document types in the dashboard
// Uncomment and customize this list to show only specific types
// const VISIBLE_TYPES = [
//   'homePage',
//   // Add other types you want to show: 'servicesPage', 'aboutPage', etc.
// ]

// Option 2: Blacklist - Hide these document types from the dashboard
// These types can still be referenced by other documents but won't appear in the main list
const HIDDEN_TYPES = [
  'homeService',
  'homeConditions',
  'homeTestimonial',
  'service',
  'servicePrice',
  'packagePrice',
  'package',
  'packageSection',
  'serviceSection',
  'aboutSection',
  // Add other reference-only types here that you want to hide
]

// List of singleton document types - these should appear as single document items
// Format: [documentTypeId, iconComponent]
// Index 0 = document type ID (string)
// Index 1 = icon component
type SingletonConfig = [string, React.ComponentType]
const SINGLETON_TYPES: SingletonConfig[] = [
  ['homePage', FaHome],
  ['servicesPage', FaHandHolding], 
  ['aboutPage', InfoFilledIcon], 
  ['packagesPage', StarFilledIcon]
]

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) => {
  const allItems = S.documentTypeListItems()
  
  // Option 1: Filter to show only visible types (whitelist)
  // Uncomment this block if you want to use the whitelist approach
  // const visibleItems = allItems.filter((listItem) => {
  //   const id = listItem.getId()
  //   return id && VISIBLE_TYPES.includes(id)
  // })
  // return S.list().title('Content').items(visibleItems)
  
  // Option 2: Filter to hide specific types (blacklist)
  // This is the default approach - hides types in HIDDEN_TYPES array
  const visibleItems = allItems.filter((listItem) => {
    const id = listItem.getId()
    return !id || !HIDDEN_TYPES.includes(id)
  })
  
  // Transform singleton types to show as single document items
  const transformedItems = visibleItems.map((listItem) => {
    const id = listItem.getId()
    if (id) {
      // Check if this is a singleton type
      const singletonConfig = SINGLETON_TYPES.find(([typeId]) => typeId === id)
      
      if (singletonConfig) {
        const typeId = singletonConfig[0] // Document type ID from index 0
        const icon = singletonConfig[1] // Icon component from index 1
        // Show singleton as a single document item instead of a list
        // This ensures only one document can exist and it's directly accessible
        return S.listItem()
          .title(listItem.getTitle() || typeId)
          .id(typeId)
          .icon(icon)
          .child(
            S.document()
              .schemaType(typeId)
              .documentId(typeId)
              .views([
                S.view.form(),
              ])
          )
      }
    }
    return listItem
  })
  
  return S.list().title('Content').items(transformedItems)
}
