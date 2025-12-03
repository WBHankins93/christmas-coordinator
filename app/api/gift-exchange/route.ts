import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'

// GET all gift exchange participants
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('gift_exchange')
      .select('*, attendees(*)')
      .eq('bringing_gift', true)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Error fetching gift exchange participants:', error)
    return NextResponse.json(
      { error: 'Failed to fetch participants' },
      { status: 500 }
    )
  }
}

// POST create gift exchange entry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, bringing_gift, notes } = body

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }

    // First, create or get attendee
    const { data: attendee, error: attendeeError } = await supabase
      .from('attendees')
      .insert([{ name, email }])
      .select()
      .single()

    if (attendeeError) throw attendeeError

    // Then create gift exchange entry
    const { data, error } = await supabase
      .from('gift_exchange')
      .insert([
        {
          attendee_id: attendee.id,
          bringing_gift,
          notes,
        },
      ])
      .select('*, attendees(*)')
      .single()

    if (error) throw error

    return NextResponse.json({ data }, { status: 201 })
  } catch (error) {
    console.error('Error creating gift exchange entry:', error)
    return NextResponse.json(
      { error: 'Failed to create gift exchange entry' },
      { status: 500 }
    )
  }
}
