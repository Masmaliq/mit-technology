import type {ComponentType} from 'react'
import {DocumentIcon} from '@sanity/icons'
import {structureTool} from 'sanity/structure'

type SingletonEditor = {
  documentId: string
  name: string
  schemaType: string
  title: string
}

type CollectionEditor = {
  icon?: ComponentType
  name: string
  schemaType: string
  title: string
}

const singletonEditors: SingletonEditor[] = [
  {name: 'homepage-editor', title: 'Homepage', schemaType: 'homepage', documentId: 'homepage'},
  {name: 'work-page-editor', title: 'Work', schemaType: 'caseStudiesPageSettings', documentId: 'caseStudiesPageSettings'},
  {name: 'service-page-editor', title: 'Service', schemaType: 'solutionsPage', documentId: 'solutionsPage'},
  {name: 'pricing-page-editor', title: 'Pricing', schemaType: 'packagesPageSettings', documentId: 'packagesPageSettings'},
  {name: 'about-page-editor', title: 'About', schemaType: 'about', documentId: 'about'},
  {name: 'navigation-editor', title: 'Navigation', schemaType: 'navbar', documentId: 'navbar'},
  {name: 'footer-editor', title: 'Footer', schemaType: 'footer', documentId: 'footer'},
  {name: 'global-cta-editor', title: 'Global CTA', schemaType: 'globalCta', documentId: 'globalCta'},
  {name: 'contact-information-editor', title: 'Contact Information', schemaType: 'contactInformation', documentId: 'contactInformation'},
  {name: 'social-media-editor', title: 'Social Media', schemaType: 'socialMedia', documentId: 'socialMedia'},
  {name: 'site-identity-editor', title: 'Site Identity', schemaType: 'siteIdentity', documentId: 'siteIdentity'},
  {name: 'seo-defaults-editor', title: 'SEO Defaults', schemaType: 'seoDefaults', documentId: 'seoDefaults'},
  {name: 'site-settings-editor', title: 'Site Settings', schemaType: 'siteSettings', documentId: 'siteSettings'},
]

const collectionEditors: CollectionEditor[] = [
  {name: 'content-services', title: 'Services', schemaType: 'solution'},
  {name: 'content-work', title: 'Work', schemaType: 'project'},
  {name: 'content-pricing', title: 'Pricing', schemaType: 'package'},
]

export const mitEditorTools = [
  ...singletonEditors.map(({documentId, name, schemaType, title}) =>
    structureTool({
      name,
      title,
      icon: DocumentIcon,
      structure: (S) => name === 'homepage-editor'
        ? S.list()
            .id('homepage-editor-root')
            .title(title)
            .items([
              S.listItem()
                .id('homepage')
                .title(title)
                .child(
                  S.document()
                    .id('homepage-editor-document')
                    .title(title)
                    .schemaType(schemaType)
                    .documentId(documentId),
                ),
            ])
        : S.document()
            .id(`${name}-document`)
            .title(title)
            .schemaType(schemaType)
            .documentId(documentId),
    }),
  ),
  ...collectionEditors.map(({icon, name, schemaType, title}) =>
    structureTool({
      name,
      title,
      icon: icon ?? DocumentIcon,
      structure: (S) => S.documentTypeList(schemaType).id(`${name}-list`).title(title),
    }),
  ),
  structureTool({
    name: 'case-study-document',
    title: 'Case Study',
    icon: DocumentIcon,
    structure: (S) =>
      S.documentTypeList('caseStudy')
        .id('case-study-document-list')
        .title('Case Study'),
  }),
]
