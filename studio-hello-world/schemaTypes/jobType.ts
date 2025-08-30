import { defineField, defineType } from "sanity";

export const jobType = defineType({
    name: 'job',
    title: 'Job',
    type: 'document',
    fields: [
        defineField({
            name: 'Company',
            type: 'string',
        }),
        defineField({
            name: 'URL',
            type: 'url'
        }),
        defineField({
            name: 'Introduce',
            type: 'string',
        }),
        defineField({
            name: 'Location',
            type: 'string',
        }),
        defineField({
            name: 'Industry',
            type: 'string',
        }),
        defineField({
            name: 'Year',
            type: 'string',
        }),
        defineField({
            name: 'Employees',
            type: 'string',
        }),
        defineField({
            name: 'CEO',
            type: 'string',
        }),
        defineField({
            name: 'EmplymentType',
            type: 'string',
        }),
        defineField({
            name: 'WorkLocation',
            type: 'string',
        }),
        defineField({
            name: 'Salary',
            type: 'string',
        }),
    ],
})