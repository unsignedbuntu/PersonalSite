// src/app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tag, secret } = body;

    // Güvenlik için secret key kontrolü
    const expectedSecret = process.env.REVALIDATE_SECRET || 'your-super-secret-revalidate-key-2024';
    if (secret !== expectedSecret) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    // Tag'e göre cache'i temizle
    if (tag === 'blog-posts') {
      revalidateTag('blog-posts', { expire: 0 });
      console.log('✅ Blog posts cache revalidated');
    } else if (tag === 'projects') {
      revalidateTag('projects', { expire: 0 });
      console.log('✅ Projects cache revalidated');
    } else if (tag === 'all') {
      // Next 16: second argument is required; expire: 0 makes admin edits show up immediately
      revalidateTag('blog-posts', { expire: 0 });
      revalidateTag('projects', { expire: 0 });
      console.log('✅ All cache revalidated');
    } else {
      return NextResponse.json({ message: 'Invalid tag' }, { status: 400 });
    }

    return NextResponse.json({ 
      revalidated: true, 
      tag,
      now: Date.now() 
    });

  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json({ 
      message: 'Error revalidating cache' 
    }, { status: 500 });
  }
}
