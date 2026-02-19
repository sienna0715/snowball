// import {defineField, defineType} from 'sanity'

// export const userType = defineType({
//     name: 'user',
//     title: 'User',
//     type: 'document',
//     fields: [
//         defineField({
//         name: 'username',
//         title: 'Username',
//         type: 'string',
//         }),
//         defineField({
//         name: 'name',
//         title: 'Name',
//         type: 'string',
//         }),
//         defineField({
//         name: 'email',
//         title: 'Email',
//         type: 'string',
//         }),
//         defineField({
//         name: 'image',
//         title: 'Image',
//         type: 'url',
//         }),
//         defineField({
//         name: 'provider',
//         title: 'Provider',
//         type: 'string',
//         }),
//         defineField({
//         name: 'providerAccountId',
//         title: 'Provider Account ID',
//         type: 'string',
//         }),
//     ],
//     preview: {
//         select: {
//             title: 'name',
//             email: 'email',
//         },
//         prepare(selection) {
//             const {title, email} = selection
//             return {
//                 title,
//                 subtitle: `e-mail: ${email}`
//             }
//         }
//     }
// })
