import { PotluckCategory } from '@/types'

// Party Details
export const PARTY_DATE = new Date('2024-12-19T19:00:00')
export const PARTY_TIME = '7:00 PM'
export const PARTY_LOCATION = "Ben & Lauryn's Place, Metairie"
export const PARTY_THEME = 'Candy Land Christmas Party'
export const DRESS_CODE = 'Christmas Pajamas or Festive Sweater'

// Gift Exchange Rules
export const GIFT_VALUE_RANGE = '$20-30'
export const GIFT_EXCHANGE_RULES = [
  'Gift value: $20-30',
  'No weed-related gifts (not everyone can partake)',
  'Funny gifts must include a real gift too',
  'Bring a backup gift just in case!'
]

// Potluck Categories
export const POTLUCK_CATEGORIES: {
  id: PotluckCategory
  name: string
  emoji: string
  color: string
}[] = [
  {
    id: 'appetizers',
    name: 'Appetizers',
    emoji: '🥨',
    color: 'bg-red-100 border-red-300'
  },
  {
    id: 'mains',
    name: 'Main Dishes',
    emoji: '🍗',
    color: 'bg-green-100 border-green-300'
  },
  {
    id: 'sides',
    name: 'Side Dishes',
    emoji: '🥗',
    color: 'bg-blue-100 border-blue-300'
  },
  {
    id: 'desserts',
    name: 'Desserts',
    emoji: '🍰',
    color: 'bg-pink-100 border-pink-300'
  },
  {
    id: 'drinks',
    name: 'Drinks',
    emoji: '🥤',
    color: 'bg-yellow-100 border-yellow-300'
  }
]

// Colors for Candy Land theme
export const THEME_COLORS = {
  primary: {
    red: '#DC2626',
    green: '#16A34A',
    blue: '#2563EB',
    pink: '#DB2777',
    yellow: '#FACC15'
  }
}
