'use client'

import { useEffect, useState } from 'react'
import GiftExchangeForm from '@/components/gift-exchange/GiftExchangeForm'
import ParticipantsList from '@/components/gift-exchange/ParticipantsList'
import GiftExchangeRules from '@/components/gift-exchange/GiftExchangeRules'
import type { GiftExchangeWithAttendee } from '@/types'

export default function GiftExchangePage() {
  const [participants, setParticipants] = useState<GiftExchangeWithAttendee[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchParticipants = async () => {
    try {
      const response = await fetch('/api/gift-exchange')
      const result = await response.json()
      if (response.ok) {
        setParticipants(result.data || [])
      }
    } catch (error) {
      console.error('Failed to fetch participants:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchParticipants()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold sm:text-4xl">
          Gift Exchange 🎁
        </h1>
        <p className="text-lg text-muted-foreground">
          RSVP and see who else is bringing gifts!
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <GiftExchangeForm onSuccess={fetchParticipants} />
          <GiftExchangeRules />
        </div>
        <div>
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <p className="text-muted-foreground">Loading participants...</p>
            </div>
          ) : (
            <ParticipantsList participants={participants} />
          )}
        </div>
      </div>
    </div>
  )
}
