import { createClient } from 'next-sanity'

export const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_SECRET_TOKEN,
    apiVersion: '2025-08-28',
    useCdn: false,
})
