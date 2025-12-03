import { NextRequest, NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client'

// GET all potluck items
export async function GET(request: NextRequest) {
  if (!isSupabaseConfigured || !supabase) {
    return NextResponse.json(
      { error: 'Database not configured. Please set up Supabase environment variables.' },
      { status: 503 }
    )
  }

  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')

    let query = supabase
      .from('potluck_items')
      .select('*, attendees(*)')
      .order('created_at', { ascending: false })

    if (category) {
      query = query.eq('category', category)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Error fetching potluck items:', error)
    return NextResponse.json(
      { error: 'Failed to fetch potluck items' },
      { status: 500 }
    )
  }
}

// POST create potluck item
export async function POST(request: NextRequest) {
  if (!isSupabaseConfigured || !supabase) {
    return NextResponse.json(
      { error: 'Database not configured. Please set up Supabase environment variables.' },
      { status: 503 }
    )
  }

  try {
    const body = await request.json()
    const { name, email, dish_name, category, dietary_notes } = body

    if (!name || !dish_name || !category) {
      return NextResponse.json(
        { error: 'Name, dish name, and category are required' },
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

    // Then create potluck item
    const { data, error } = await supabase
      .from('potluck_items')
      .insert([
        {
          attendee_id: attendee.id,
          dish_name,
          category,
          dietary_notes,
        },
      ])
      .select('*, attendees(*)')
      .single()

    if (error) throw error

    return NextResponse.json({ data }, { status: 201 })
  } catch (error) {
    console.error('Error creating potluck item:', error)
    return NextResponse.json(
      { error: 'Failed to create potluck item' },
      { status: 500 }
    )
  }
}
