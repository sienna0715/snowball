"use server"

import {client} from './client'
import {auth} from '../../../auth'
import {redirect} from 'next/navigation'

function sanitizeId(input: string) {
    return input.replace(/[^A-Za-z0-9_.-]/g, '-')
}

export default async function addCoverletter(formData: FormData) {
    const session = await auth()
    if (!session?.user?.email) redirect('/auth/signin')
    
    const owner = await client.fetch<{ _id: string } | null>(
        `*[_type == "user" && email == $email][0]{ _id }`, 
        { email: session!.user!.email, }
    )
    if (!owner?._id) throw new Error('User document not found in Sanity')
    
    const ownerId = sanitizeId(owner._id as string)
    const suffix = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    const coverletterId = `coverletter.${ownerId}.${suffix}`

    // slug 생성
    const company = formData.get('company')?.toString() || ''
    const slug = {
        _type: 'slug',
        current:
        company
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '')
            .slice(0, 96) || `${Date.now()}`,
    }

    const data = {
        _id: coverletterId,
        _type: 'coverletter',
        slug,
        owner: { _type: 'reference', _ref: owner._id },
        date: formData.get('date')?.toString() || '',
        company,
        title: formData.get('title')?.toString() || '',
        content:  formData.get('content')?.toString() || '',
    }

    await client.create(data)
    redirect('/app/coverletter')
}

export async function updateCoverletter(formData: FormData) {
    const id = formData.get('_id')?.toString()
    const company = formData.get('company')?.toString()
    const date = formData.get('date')?.toString()
    const title = formData.get('title')?.toString()
    const content = formData.get('content')?.toString()

    await client.patch(id!).set({ company, date, title, content }).commit()
}