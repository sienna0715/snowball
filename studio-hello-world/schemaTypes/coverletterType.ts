import { defineField, defineType } from "sanity";

export const coverletterType = defineType({
    name: 'coverletter',
    title: 'Coverletter',
    type: 'document',
    fields: [
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'company',
                slugify: (input: string) =>
                input
                    .toLowerCase()
                    .trim()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)+/g, '')
                    .slice(0, 96)  || `${Date.now()}`,
                isUnique: (value, context) => context.defaultIsUnique(value, context),
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'owner',
            title: 'Owner',
            type: 'reference',
            to: [{ type: 'user' }],
            validation: (Rule) => Rule.required(), // 선택: 필수화
        }),
        defineField({
            name: 'date',
            title: 'Date',
            type: 'date',
            options: {
                dateFormat: 'YYYY-MM-DD',
            },
            initialValue: () => new Date().toISOString().split('T')[0],
        }),
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'company',
            title: 'Company',
            type: 'string',
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'text',
            rows: 10,
        }),
    ],
    preview: {
        select: {
            title: 'title',
            ownerName: 'owner.name',
            ownerEmail: 'owner.email',
        },
        prepare({ title, ownerName, ownerEmail }) {
            return {
                title,
                subtitle: ownerName || ownerEmail || '(no owner)',
            }
        },
    }
})