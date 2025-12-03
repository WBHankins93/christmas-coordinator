'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { GiftExchangeWithAttendee } from '@/types'

interface ParticipantsListProps {
  participants: GiftExchangeWithAttendee[]
}

export default function ParticipantsList({ participants }: ParticipantsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Participants</span>
          <Badge variant="secondary" className="text-lg">
            {participants.length} {participants.length === 1 ? 'person' : 'people'}
          </Badge>
        </CardTitle>
        <CardDescription>
          Everyone who's bringing a gift
        </CardDescription>
      </CardHeader>
      <CardContent>
        {participants.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No one has signed up yet. Be the first!
          </p>
        ) : (
          <div className="space-y-3">
            {participants.map((participant) => (
              <div
                key={participant.id}
                className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent/50 transition-colors"
              >
                <div>
                  <p className="font-semibold">{participant.attendees.name}</p>
                  {participant.notes && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {participant.notes}
                    </p>
                  )}
                </div>
                <span className="text-2xl">🎁</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
