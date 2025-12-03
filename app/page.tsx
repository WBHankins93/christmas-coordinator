import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import CountdownTimer from '@/components/shared/CountdownTimer'
import { PARTY_DATE, PARTY_TIME, PARTY_LOCATION, DRESS_CODE, PARTY_THEME } from '@/lib/constants'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          <span className="bg-gradient-to-r from-red-600 via-green-600 to-blue-600 bg-clip-text text-transparent">
            {PARTY_THEME}
          </span>
        </h1>
        <p className="mb-2 text-xl text-muted-foreground">
          December 19, 2024 at {PARTY_TIME}
        </p>
        <p className="text-lg text-muted-foreground">{PARTY_LOCATION}</p>
      </div>

      {/* Countdown Timer */}
      <div className="mb-12">
        <h2 className="mb-4 text-center text-2xl font-semibold">
          Countdown to the Party! 🎉
        </h2>
        <CountdownTimer />
      </div>

      {/* Action Cards */}
      <div className="mb-12 grid gap-6 md:grid-cols-2">
        <Card className="border-2 border-red-200 bg-red-50/50 transition-shadow hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <span className="text-3xl">🎁</span>
              Gift Exchange
            </CardTitle>
            <CardDescription className="text-base">
              RSVP and commit to bringing a gift for our exchange
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Let us know if you'll be participating in the gift exchange. Gift value: $20-30
            </p>
            <Link href="/gift-exchange">
              <Button className="w-full bg-red-600 hover:bg-red-700" size="lg">
                RSVP for Gift Exchange
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-200 bg-green-50/50 transition-shadow hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <span className="text-3xl">🍽️</span>
              Potluck Sign-Up
            </CardTitle>
            <CardDescription className="text-base">
              Claim a dish to bring to the party
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Choose from Appetizers, Mains, Sides, Desserts, or Drinks
            </p>
            <Link href="/potluck">
              <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
                Sign Up for Potluck
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Party Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Party Details ℹ️</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="font-semibold">Date & Time:</p>
            <p className="text-muted-foreground">
              December 19, 2024 at {PARTY_TIME}
            </p>
          </div>
          <div>
            <p className="font-semibold">Location:</p>
            <p className="text-muted-foreground">{PARTY_LOCATION}</p>
          </div>
          <div>
            <p className="font-semibold">Dress Code:</p>
            <p className="text-muted-foreground">{DRESS_CODE}</p>
          </div>
          <div>
            <p className="font-semibold">Theme:</p>
            <p className="text-muted-foreground">{PARTY_THEME}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
