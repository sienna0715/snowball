"use server"

import {client} from './client'
import {auth} from '../../../middleware/auth'
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

    const session = await auth()
    if (!session?.user?.email) redirect('/auth/signin')

    const id = formData.get('_id')?.toString()
    if (!id) throw new Error('`_id` is required to update a coverletter')

    // 로그인 유저의 Sanity user 문서 _id 확인
    const owner = await client.fetch<{ _id: string } | null>(
        `*[_type == "user" && email == $email][0]{ _id }`,
        { email: session.user.email }
    )
    if (!owner?._id) throw new Error('User document not found in Sanity')

    // 수정 대상 문서가 내 문서인지 검증 + 현재 slug 조회
    const current = await client.fetch<{
        _id: string
        slug?: { current?: string }
    } | null>(
        `*[_type == "coverletter" && _id == $id && owner._ref == $ownerId][0]{ _id, slug }`,
        { id, ownerId: owner._id }
    )
    if (!current?._id) throw new Error('Coverletter not found or not owned by current user')

    // FormData → 업데이트 payload 구성
    const read = (key: string) => {
        const v = formData.get(key)
        return v === null ? undefined : v.toString()
    }

    const updatePayload: Record<string, any> = {}
    const fields = ['company', 'date', 'title', 'content'] as const
    for (const f of fields) {
        const value = read(f)
        if (value !== undefined) updatePayload[f] = value
    }

    // 회사명이 변경되면 slug 재생성 (company가 폼에 있을 때만)
    let newSlug = current.slug?.current || ''
    if (typeof updatePayload.company === 'string' && updatePayload.company.trim() !== '') {
        const company = updatePayload.company as string
        const slugCurrent = company
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
        .slice(0, 96) || `${Date.now()}`

        updatePayload.slug = { _type: 'slug', current: slugCurrent }
        newSlug = slugCurrent
    }

    // 업데이트 반영
    await client.patch(id).set(updatePayload).commit()

    // 완료 후 상세 페이지로 이동 (slug가 없다면 목록으로 fallback)
    if (newSlug && typeof newSlug === 'string') {
        redirect(`/app/coverletter/${newSlug}`)
    } else {
        redirect('/app/coverletter')
    }
}


export async function deleteCoverletter(formData: FormData) {
    const session = await auth()
    if (!session?.user?.email) redirect('/auth/signin')

    const id = formData.get('_id')?.toString()
    if (!id) throw new Error('`_id` is required to delete a coverletter')

    const owner = await client.fetch<{ _id: string } | null>(
        `*[_type == "user" && email == $email][0]{ _id }`,
        { email: session.user.email }
    )
    if (!owner?._id) throw new Error('User document not found in Sanity')

    // 삭제 대상이 내 문서인지 검증
    const current = await client.fetch<{ _id: string } | null>(
        `*[_type == "coverletter" && _id == $id && owner._ref == $ownerId][0]{ _id }`,
        { id, ownerId: owner._id }
    )
    if (!current?._id) throw new Error('Coverletter not found or not owned by current user')

    await client.delete(id)

    redirect('/app/coverletter')
}