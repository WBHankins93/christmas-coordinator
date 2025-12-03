# Christmas Party Coordinator 🎄🎁

A web application to coordinate gift exchange and potluck for our December 19th Christmas party!

## Project Overview

**Purpose:** Coordinate gift exchange and potluck contributions for a Candy Land themed Christmas party

**Timeline:** Build over 1-2 weekends, deploy by early December

**Users:** ~20-30 party attendees accessing via mobile devices

**Live Demo:** [Coming Soon]

## Features

### 🎁 Gift Exchange Manager
- RSVP and commit to bringing a gift
- View all participants bringing gifts
- Display gift exchange rules
- Track participation count

### 🍽️ Potluck Coordinator
- Claim dishes across 5 categories (Appetizers, Mains, Sides, Desserts, Drinks)
- Visual category cards with claimed items
- Prevent duplicate dishes
- See what's still needed

### 🎨 Candy Land Theme
- Festive Christmas design
- Mobile-first responsive layout
- Fun animations and emojis
- Colorful category cards

## Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Framer Motion (optional animations)

**Backend:**
- Next.js API routes
- Supabase (PostgreSQL database)
- Supabase real-time (optional)

**Deployment:**
- Vercel (frontend + API)
- Supabase Cloud (database)

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm/pnpm/yarn
- Supabase account (free tier works)
- Git

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd christmas-party-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Supabase**

Create a new Supabase project at https://supabase.com

Run the following SQL in your Supabase SQL Editor:

```sql
-- Create attendees table
CREATE TABLE attendees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create gift_exchange table
CREATE TABLE gift_exchange (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  attendee_id UUID REFERENCES attendees(id) ON DELETE CASCADE,
  bringing_gift BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(attendee_id)
);

-- Create potluck_items table
CREATE TABLE potluck_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  attendee_id UUID REFERENCES attendees(id) ON DELETE CASCADE,
  dish_name VARCHAR(200) NOT NULL,
  category VARCHAR(50) NOT NULL,
  dietary_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_attendees_name ON attendees(name);
CREATE INDEX idx_gift_exchange_attendee ON gift_exchange(attendee_id);
CREATE INDEX idx_potluck_attendee ON potluck_items(attendee_id);
CREATE INDEX idx_potluck_category ON potluck_items(category);

-- Enable Row Level Security (RLS)
ALTER TABLE attendees ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_exchange ENABLE ROW LEVEL SECURITY;
ALTER TABLE potluck_items ENABLE ROW LEVEL SECURITY;

-- Allow all operations (since no auth for MVP)
CREATE POLICY "Allow all operations" ON attendees FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON gift_exchange FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON potluck_items FOR ALL USING (true);
```

4. **Configure environment variables**

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these values from your Supabase project settings > API

5. **Install shadcn/ui components**

```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card dialog input label select textarea badge
```

6. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
christmas-party-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Landing page
│   │   ├── globals.css             # Global styles
│   │   ├── gift-exchange/
│   │   │   └── page.tsx            # Gift exchange page
│   │   ├── potluck/
│   │   │   └── page.tsx            # Potluck page
│   │   └── api/
│   │       ├── attendees/          # Attendee endpoints
│   │       ├── gift-exchange/      # Gift exchange endpoints
│   │       └── potluck/            # Potluck endpoints
│   │
│   ├── components/
│   │   ├── ui/                     # shadcn/ui components
│   │   ├── layout/                 # Layout components
│   │   ├── gift-exchange/          # Gift exchange components
│   │   ├── potluck/                # Potluck components
│   │   └── shared/                 # Shared components
│   │
│   ├── lib/
│   │   ├── supabase/               # Supabase clients
│   │   ├── utils.ts                # Utility functions
│   │   └── constants.ts            # App constants
│   │
│   ├── types/
│   │   └── index.ts                # TypeScript types
│   │
│   └── hooks/
│       ├── useAttendees.ts         # Attendee operations
│       ├── useGiftExchange.ts      # Gift exchange data
│       └── usePotluck.ts           # Potluck data
│
├── public/                         # Static assets
├── .env.local                      # Environment variables (not committed)
├── next.config.js                  # Next.js configuration
├── tailwind.config.ts              # Tailwind configuration
└── package.json                    # Dependencies
```

## Database Schema

### Attendees Table
```typescript
{
  id: UUID (primary key)
  name: string (required)
  email: string (optional)
  created_at: timestamp
  updated_at: timestamp
}
```

### Gift Exchange Table
```typescript
{
  id: UUID (primary key)
  attendee_id: UUID (foreign key)
  bringing_gift: boolean
  notes: string (optional)
  created_at: timestamp
  updated_at: timestamp
}
```

### Potluck Items Table
```typescript
{
  id: UUID (primary key)
  attendee_id: UUID (foreign key)
  dish_name: string (required)
  category: string (required)
  dietary_notes: string (optional)
  created_at: timestamp
  updated_at: timestamp
}
```

## API Endpoints

### Attendees
- `GET /api/attendees` - Get all attendees
- `POST /api/attendees` - Create new attendee
- `GET /api/attendees/[id]` - Get specific attendee
- `PATCH /api/attendees/[id]` - Update attendee
- `DELETE /api/attendees/[id]` - Delete attendee

### Gift Exchange
- `GET /api/gift-exchange` - Get all gift exchange participants
- `POST /api/gift-exchange` - Create gift exchange entry
- `PATCH /api/gift-exchange/[id]` - Update commitment
- `DELETE /api/gift-exchange/[id]` - Remove commitment

### Potluck
- `GET /api/potluck` - Get all potluck items
- `GET /api/potluck?category=mains` - Get items by category
- `POST /api/potluck` - Claim a dish
- `PATCH /api/potluck/[id]` - Update dish
- `DELETE /api/potluck/[id]` - Remove dish

## Design System

### Color Palette

**Primary Colors:**
- Christmas Red: `#DC2626` (red-600)
- Candy Green: `#16A34A` (green-600)
- Candy Blue: `#2563EB` (blue-600)
- Candy Pink: `#DB2777` (pink-600)
- Candy Yellow: `#FACC15` (yellow-400)

**Categories:**
- Appetizers: `bg-red-100`
- Mains: `bg-green-100`
- Sides: `bg-blue-100`
- Desserts: `bg-pink-100`
- Drinks: `bg-yellow-100`

### Typography
- Headings: bold, large sizes
- Body: normal weight, readable sizes
- Buttons: semibold

### Components
- Rounded corners (rounded-lg, rounded-xl)
- Subtle shadows
- Christmas emojis (🎄 🎁 🍬 ❄️ 🎅)
- Mobile-first design
- Touch-friendly buttons (min 44px)

## Party Details

**Date:** December 19, 2024  
**Time:** 7:00 PM  
**Location:** Ben & Lauryn's Place, Metairie  
**Dress Code:** Christmas Pajamas or Festive Sweater  
**Theme:** Candy Land Christmas Party

### Gift Exchange Rules
- Gift value: $20-30
- No weed-related gifts (not everyone can partake)
- Funny gifts must include a real gift too
- Bring a backup gift just in case!

### Potluck Categories
1. 🥨 Appetizers
2. 🍗 Main Dishes
3. 🥗 Side Dishes
4. 🍰 Desserts
5. 🥤 Drinks

## Development Workflow

### Feature Branch Strategy
```bash
# Create feature branches
git checkout -b feature/gift-exchange
git checkout -b feature/potluck
git checkout -b feature/design

# Make atomic commits
git add src/components/gift-exchange/GiftExchangeForm.tsx
git commit -m "Add GiftExchangeForm component with validation"

# Push and create PR
git push origin feature/gift-exchange
```

### Build Order (Recommended)

**Weekend 1:**
1. Setup project + Supabase (Friday evening)
2. Gift Exchange feature (Saturday)
3. Basic styling + mobile responsive (Sunday)

**Weekend 2:**
4. Potluck feature (Saturday)
5. Polish, testing, deployment (Sunday)

## Testing Checklist

### Gift Exchange
- [ ] Can submit name and commit to gift
- [ ] Form validation works
- [ ] Success message displays
- [ ] Participant list updates
- [ ] Gift count updates correctly
- [ ] Rules are visible
- [ ] Mobile responsive

### Potluck
- [ ] Can claim dish in each category
- [ ] Category cards display correctly
- [ ] Form validation works
- [ ] Dishes appear in correct category
- [ ] Empty state shows appropriately
- [ ] Modal works correctly
- [ ] Mobile responsive

### General
- [ ] Landing page loads
- [ ] Navigation works
- [ ] Countdown timer works
- [ ] Works on mobile (375px+)
- [ ] Works on tablet (768px+)
- [ ] Cross-browser compatible
- [ ] No console errors
- [ ] Fast load times

## Deployment

### Vercel Deployment

1. **Push to GitHub**
```bash
git push origin main
```

2. **Connect to Vercel**
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository
- Configure environment variables
- Deploy

3. **Environment Variables in Vercel**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Post-Deployment Checklist
- [ ] Test live URL on mobile
- [ ] Verify database connections
- [ ] Test all form submissions
- [ ] Check API endpoints
- [ ] Share with test user
- [ ] Monitor Vercel dashboard

## Nice-to-Have Features (Future)

- [ ] Edit/Delete functionality
- [ ] Real-time updates with Supabase subscriptions
- [ ] Confetti animations
- [ ] Random gift exchange order generator
- [ ] QR code for easy sharing
- [ ] Print-friendly view
- [ ] Simple analytics

## Troubleshooting

### Common Issues

**Supabase connection fails:**
- Verify environment variables are correct
- Check Supabase project is active
- Ensure RLS policies are configured

**Form submissions not working:**
- Check browser console for errors
- Verify API routes are correct
- Check database schema matches types

**Mobile layout issues:**
- Test on actual device, not just browser resize
- Check viewport meta tag in layout
- Verify touch targets are 44px minimum

## Success Criteria

The app is successful if:
- ✅ At least 10 people use it before the party
- ✅ No duplicate dishes at the party
- ✅ Gift exchange runs smoothly
- ✅ People find it helpful/cool
- ✅ You had fun building it
- ✅ No major bugs on party day

## Contributing

This is a personal party project, but if you're a guest and want to suggest features, feel free to open an issue!

## License

Personal project - feel free to use as inspiration for your own party apps!

## Contact

Built by Ben Hankins for our 2024 Christmas Party

Questions? Ask in the party group chat! 🎄

---

**Happy Holidays! Let's make this the best Christmas party yet! 🎅🎁**
