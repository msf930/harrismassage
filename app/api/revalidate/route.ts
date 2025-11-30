import { revalidatePath, revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

type WebhookPayload = {
  _type: string
  slug?: {
    current: string
  }
}

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    )

    if (!isValidSignature) {
      return new Response('Invalid signature', { status: 401 })
    }

    if (!body?._type) {
      return new Response('Bad Request', { status: 400 })
    }

    // Revalidate all pages that might be affected
    revalidatePath('/', 'layout')
    revalidatePath('/about')
    revalidatePath('/services')
    revalidatePath('/blog')
    
    // If it's a blog post, revalidate that specific post
    if (body._type === 'blogPost' && body.slug?.current) {
      revalidatePath(`/blog/${body.slug.current}`)
    }

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    })
  } catch (err: any) {
    console.error('Error revalidating:', err)
    return new Response(err.message, { status: 500 })
  }
}

