'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {mitDashboardTool} from './sanity/dashboardTool'
import {schema} from './sanity/schemaTypes'
import {deskStructure} from './sanity/structure'
import {mitStudioTheme} from './sanity/theme'

export default defineConfig({
  name: 'default',
  title: 'MIT Technology Studio',
  basePath: '/studio',
  projectId,
  dataset,
  theme: mitStudioTheme,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    mitDashboardTool(),
    structureTool({structure: deskStructure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
