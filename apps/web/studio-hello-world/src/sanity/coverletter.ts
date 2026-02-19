'use server';

import {client} from './client'
import {cookies} from 'next/headers'
import {redirect} from 'next/navigation'
import {getMe} from '../../../src/lib/user'

type User = {
    userId: string;
    email?: string | null;
};

async function requireUser(): Promise<User> {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; ");
    const user = await getMe({ cookie: cookieHeader });

    if (!user?.id) redirect("/auth")
    
    return {
        userId: String(user.id),
        email: user.email ?? null,
    };
}

export async function addCoverletter(formData: FormData) {
    const user = await requireUser()
    const ownerId = sanitizeId(user.userId)
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
        userId: user.userId,
        date: formData.get('date')?.toString() || '',
        company,
        title: formData.get('title')?.toString() || '',
        content: formData.get('content')?.toString() || '',
    }

    await client.create(data)
    redirect('/coverletters')
}

export async function updateCoverletter(formData: FormData) {
    const user = await requireUser()
    const id = formData.get('_id')?.toString()

    if (!id) throw new Error('`_id` is required to update a coverletter')

    // 수정 대상 문서가 내 문서인지 검증 + 현재 slug 조회
    const current = await client.fetch<{
        _id: string
        slug?: {current?: string}
    } | null>(`*[_type == "coverletter" && _id == $id && userId == $userId][0]{ _id, slug }`, {
        id,
        userId: user.userId,
    })
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
        const slugCurrent =
        company
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '')
            .slice(0, 96) || `${Date.now()}`

        updatePayload.slug = {_type: 'slug', current: slugCurrent}
        newSlug = slugCurrent
    }

    // 업데이트 반영
    await client.patch(id).set(updatePayload).commit()

    // 완료 후 상세 페이지로 이동 (slug가 없다면 목록으로 fallback)
    if (newSlug && typeof newSlug === 'string') {
        redirect(`/coverletters/${newSlug}`)
    } else {
        redirect('/coverletters')
    }
}

export async function deleteCoverletter(formData: FormData) {
    const user = await requireUser()
    const id = formData.get('_id')?.toString()

    if (!id) throw new Error('`_id` is required to delete a coverletter')

    // 삭제 대상이 내 문서인지 검증
    const current = await client.fetch<{_id: string} | null>(
        `*[_type == "coverletter" && _id == $id && userId == $userId][0]{ _id }`,
        {id, userId: user.userId},
    )
    if (!current?._id) throw new Error('Coverletter not found or not owned by current user')

    await client.delete(id)
    redirect('/coverletters')
}

function sanitizeId(input: string) {
    return input.replace(/[^A-Za-z0-9_.-]/g, '-')
}
