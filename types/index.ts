// Database types based on Supabase schema

export interface Attendee {
  id: string
  name: string
  email?: string
  created_at: string
  updated_at: string
}

export interface GiftExchange {
  id: string
  attendee_id: string
  bringing_gift: boolean
  notes?: string
  created_at: string
  updated_at: string
}

export interface GiftExchangeWithAttendee extends GiftExchange {
  attendees: Attendee
}

export interface PotluckItem {
  id: string
  attendee_id: string
  dish_name: string
  category: PotluckCategory
  dietary_notes?: string
  created_at: string
  updated_at: string
}

export interface PotluckItemWithAttendee extends PotluckItem {
  attendees: Attendee
}

// Potluck categories
export type PotluckCategory = 
  | 'appetizers'
  | 'mains'
  | 'sides'
  | 'desserts'
  | 'drinks'

// Form types
export interface AttendeeFormData {
  name: string
  email?: string
}

export interface GiftExchangeFormData {
  name: string
  email?: string
  bringing_gift: boolean
  notes?: string
}

export interface PotluckFormData {
  name: string
  email?: string
  dish_name: string
  category: PotluckCategory
  dietary_notes?: string
}

// API Response types
export interface ApiResponse<T> {
  data?: T
  error?: string
}
