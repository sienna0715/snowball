// import { defineField, defineType } from "sanity";

// export const jobType = defineType({
//     name: 'job',
//     title: 'Job',
//     type: 'document',
//     fields: [
//         defineField({
//             name: 'slug',
//             title: 'Slug',
//             type: 'slug',
//             options: {
//                 source: 'company',
//                 slugify: (input: string) =>
//                 input
//                     .toLowerCase()
//                     .trim()
//                     .replace(/[^a-z0-9]+/g, '-')
//                     .replace(/(^-|-$)+/g, '')
//                     .slice(0, 96)  || `${Date.now()}`,
//                 isUnique: (value, context) => context.defaultIsUnique(value, context),
//             },
//             validation: (Rule) => Rule.required(),
//         }),
//         defineField({
//             name: 'owner',
//             title: 'Owner',
//             type: 'reference',
//             to: [{ type: 'user' }],
//             validation: (Rule) => Rule.required(), // 선택: 필수화
//         }),
//         defineField({
//             name: 'company',
//             title: 'Company',
//             type: 'string',
//         }),
//         defineField({
//             name: 'url',
//             title: 'URL',
//             type: 'url'
//         }),
//         defineField({
//             name: 'introduce',
//             title: 'Introduce',
//             type: 'string',
//         }),
//         defineField({
//             name: 'location',
//             title: 'Location',
//             type: 'string',
//         }),
//         defineField({
//             name: 'industry',
//             title: 'Industry',
//             type: 'string',
//         }),
//         defineField({
//             name: 'year',
//             title: 'Year',
//             type: 'string',
//         }),
//         defineField({
//             name: 'employees',
//             title: 'Employees',
//             type: 'string',
//         }),
//         defineField({
//             name: 'ceo',
//             title: 'CEO',
//             type: 'string',
//         }),
//         defineField({
//             name: 'employmentType',
//             title: 'employmentType',
//             type: 'string',
//             options: {
//                 list: [
//                 { title: '정규직(full-time)', value: '정규직' },
//                 { title: '계약직(contract)', value: '계약직' },
//                 { title: '인턴(intern)', value: '인턴' },
//                 { title: '파트타임(part-time)', value: '파트타임' },
//                 ],
//                 layout: 'dropdown', // 필요시 'radio'로 변경 가능
//             },
//             validation: (Rule) => Rule.required().error('근무 형태를 선택하세요.'),
//         }),
//         defineField({
//             name: 'workLocation',
//             title: 'WorkLocation',
//             type: 'string',
//         }),
//         defineField({
//             name: 'salary',
//             title: 'Salary',
//             type: 'string',
//         }),
//         defineField({
//             name: 'other',
//             title: 'Other',
//             type: 'string',
//         }),
//         defineField({
//             name: 'deadline',
//             title: 'Deadline',
//             type: 'date',
//             options: {
//             dateFormat: 'YYYY-MM-DD',
//             },
//         }),
//         defineField({
//             name: 'status',
//             title: 'Status',
//             type: 'string',
//             options: {
//                 list: [
//                 { title: '원서접수', value: '원서접수' },
//                 { title: '1차전형', value: '1차전형' },
//                 { title: '2차전형', value: '2차전형' },
//                 { title: '면접전형', value: '면접전형' },
//                 { title: '최종합격', value: '최종합격' },
//                 { title: '불합격', value: '불합격' },
//                 ],
//                 layout: 'dropdown', // 필요시 'radio'로 변경 가능
//             },
//             validation: (Rule) => Rule.required().error('현재 채용 단계를 선택하세요.'),
//         }),
//     ],
//     preview: {
//         select: {
//             title: 'company',
//             ownerName: 'owner.name',
//             ownerEmail: 'owner.email',
//         },
//         prepare({ title, ownerName, ownerEmail }) {
//             return {
//                 title,
//                 subtitle: ownerName || ownerEmail || '(no owner)',
//             }
//         },
//     }
// })