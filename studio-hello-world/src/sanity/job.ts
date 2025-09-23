// studio-hello-world/src/sanity/job.ts
'use server'

import {client} from './client'
import {auth} from '../../../auth'
import {redirect} from 'next/navigation'

// 로그인 세션 확인 → 유저 문서 _id 조회 → 유저별로 고유한 Job _id 생성 → client.create() 저장
// 스키마를 바꾸지 않기 위해, Job의 _id에 “소유자(owner)” 정보를 접두사로 인코딩한다.
// 이렇게 저장하면 나중에 _id match로 “내 Job만” 조회할 수 있다.

function sanitizeId(input: string) {
    // Sanity _id 허용 문자: A–Z a–z 0–9 _ . -
    return input.replace(/[^A-Za-z0-9_.-]/g, '-')
}

export default async function addJob(formData: FormData) {
    // 1) 로그인 확인
    const session = await auth()
    if (!session?.user?.email) redirect('/auth/signin')
    

    // 2) 로그인 유저의 Sanity user 문서 _id 찾기
    const owner = await client.fetch<{ _id: string } | null>(
        `*[_type == "user" && email == $email][0]{ _id }`, 
        { email: session!.user!.email, }
    )
    if (!owner?._id) throw new Error('User document not found in Sanity')
    
    // 3) 유저별 Job _id 생성 (접두사에 owner _id를 삽입)
    const ownerId = sanitizeId(owner._id as string)
    const suffix = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    const jobId = `job.${ownerId}.${suffix}`

    // slug 생성
    const company = formData.get('company')?.toString() || ''
    const slug = {
        _type: 'slug',
        current:
        company
            .toLowerCase() // 문자열 전체를 소문자로 변환
            .trim() // 공백 제거
            .replace(/[^a-z0-9]+/g, '-') // 영문+숫자 아닌 문자를 모두 -(하이픈)으로 변경
            .replace(/(^-|-$)+/g, '') // 앞뒤에 있는 하이픈만 제거
            .slice(0, 96) || `${Date.now()}`, // 문자열을 앞에서 96자까지만 자름(너무 긴 slug 방지용)
            // 만약 앞에서 만든 결과가 빈 문자열이라면 fallback으로 현재 타임스탬프(숫자 문자열)를 반환
    }

  // 4) FormData에서 키로 값 읽기 (스키마와 동일)
    const data = {
        _id: jobId,
        _type: 'job',
        slug,
        owner: { _type: 'reference', _ref: owner._id },
        company,
        url: formData.get('url')?.toString() || '',
        introduce: formData.get('introduce')?.toString() || '',
        location: formData.get('location')?.toString() || '',
        industry: formData.get('industry')?.toString() || '',
        year: formData.get('year')?.toString() || '',
        employees: formData.get('employees')?.toString() || '',
        ceo: formData.get('ceo')?.toString() || '',
        employmentType: formData.get('employmentType')?.toString() || '',
        workLocation: formData.get('workLocation')?.toString() || '',
        salary: formData.get('salary')?.toString() || '',
        other: formData.get('other')?.toString() || '',
        deadline: formData.get('deadline')?.toString() || '',
        status: formData.get('status')?.toString() || '',
    }

    // 5) 저장 후 목록으로 리다이렉트
    await client.create(data)
    redirect('/app/job')
}

export async function updateJob(formData: FormData) {

    const session = await auth()
    if (!session?.user?.email) redirect('/auth/signin')

    const id = formData.get('_id')?.toString()
    if (!id) throw new Error('`_id` is required to update a job')

    const owner = await client.fetch<{ _id: string } | null>(
        `*[_type == "user" && email == $email][0]{ _id }`,
        { email: session.user.email }
    )
    if (!owner?._id) throw new Error('User document not found in Sanity')

    const current = await client.fetch<{
        _id: string
        slug?: { current?: string }
    }| null>(
        `*[_type == "job" && _id == $id && owner._ref == $ownerId][0]{ _id }`,
        { id, ownerId: owner._id }
    )
    if (!current?._id) throw new Error('Job not found or not owned by current user')

    const read = (key: string) => {
        const v = formData.get(key)
        return v === null ? undefined : v.toString()
    }

    const updatePayload: Record<string, any> = {}
    const fields = [
        'company',
        'url',
        'introduce',
        'location',
        'industry',
        'year',
        'employees',
        'ceo',
        'employmentType',
        'workLocation',
        'salary',
        'other',
        'deadline',
        'status',
    ] as const

    for (const f of fields) {
        const value = read(f)
        if (value !== undefined) updatePayload[f] = value
    }

    // 회사명이 변경되면 slug 재생성 (company 값이 폼에 있을 때만)
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

    await client.patch(id).set(updatePayload).commit()

    if (newSlug && typeof newSlug === 'string') {
        redirect(`/app/job/${newSlug}`)
    } else {
        redirect('/app/job')
    }
}


export async function deleteJob(formData: FormData) {
    const session = await auth()
    if (!session?.user?.email) redirect('/auth/signin')

    const id = formData.get('_id')?.toString()
    if (!id) throw new Error('`_id` is required to delete a job')

    const owner = await client.fetch<{ _id: string } | null>(
        `*[_type == "user" && email == $email][0]{ _id }`,
        { email: session.user.email }
    )
    if (!owner?._id) throw new Error('User document not found in Sanity')

    const current = await client.fetch<{ _id: string } | null>(
        `*[_type == "job" && _id == $id && owner._ref == $ownerId][0]{ _id }`,
        { id, ownerId: owner._id }
    )
    if (!current?._id) throw new Error('Job not found or not owned by current user')

    await client.delete(id)

    redirect('/app/job')
}