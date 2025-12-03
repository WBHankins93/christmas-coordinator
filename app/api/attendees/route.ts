import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'

// GET all attendees
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('attendees')
      .select('*')
      .order('name')

    if (error) throw error

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Error fetching attendees:', error)
    return NextResponse.json(
      { error: 'Failed to fetch attendees' },
      { status: 500 }
    )
  }
}

// POST create new attendee
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email } = body

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('attendees')
      .insert([{ name, email }])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ data }, { status: 201 })
  } catch (error) {
    console.error('Error creating attendee:', error)
    return NextResponse.json(
      { error: 'Failed to create attendee' },
      { status: 500 }
    )
  }
}
