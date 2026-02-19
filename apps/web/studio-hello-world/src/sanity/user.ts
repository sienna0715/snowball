// import { client } from './client'

// export type OAuthUser = {
//     id: string
//     email: string
//     name: string
//     username: string
//     image?: string | null
//     provider?: string
//     providerAccountId?: string
// }

// export default async function addUser({
//     id,
//     name,
//     email,
//     image,
//     username,
//     provider,
//     providerAccountId,
//     }: OAuthUser) {
//     // Build a stable, valid Sanity _id
//    // provider+providerAccountId 조합을 최우선 사용
//     const baseId =
//         (provider && providerAccountId)
//             ? `user.${provider}:${providerAccountId}`
//             : `user.email.${email}`;

//     const sanityId = sanitizeId(baseId); 

//     function sanitizeId(input: string) {
//         return input.replace(/[^A-Za-z0-9_.-]/g, '-');
//     }
            
//     // Build patch set without undefined values
//     const set: Record<string, any> = {
//         email,
//         name,
//         username,
//         image,
//         provider,
//         providerAccountId,
//     }

//     // console.log("[sanity] writing to:", {
//     //     projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
//     //     dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
//     // });
    
//     // console.log("[sanity] upsert id:", sanityId);

//     return client
//         .transaction()
//         .createIfNotExists({
//         _id: sanityId,
//         _type: 'user',
//         email,
//         name,
//         username,
//         ...(image ? { image } : {}),
//         provider,
//         providerAccountId,
//         })
//         .patch(sanityId, (p) => p.set(set))
//         .commit()
// }
