import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export async function POST(request: Request) {
  try {
    const { data } = await request.json()
    const id = Date.now().toString()
    await kv.set(`funmeter:${id}`, data)
    
    const keys = await kv.keys('funmeter:*')
    const submissionCount = keys.length

    return NextResponse.json({ 
      success: true, 
      id,
      submissionCount
    })
  } catch (error) {
    console.error('Error saving data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save data' },
      { status: 500 }
    )
  }
} 