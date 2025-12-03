'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { POTLUCK_CATEGORIES } from '@/lib/constants'
import type { PotluckItemWithAttendee } from '@/types'

interface CategoryCardsProps {
  items: PotluckItemWithAttendee[]
}

export default function CategoryCards({ items }: CategoryCardsProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {POTLUCK_CATEGORIES.map((category) => {
        const categoryItems = items.filter((item) => item.category === category.id)
        
        return (
          <Card key={category.id} className={`border-2 ${category.color}`}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="text-2xl">{category.emoji}</span>
                  <span>{category.name}</span>
                </span>
                <Badge variant="secondary">
                  {categoryItems.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {categoryItems.length === 0 ? (
                <p className="text-center text-sm text-muted-foreground py-4">
                  No dishes yet!
                </p>
              ) : (
                <ul className="space-y-3">
                  {categoryItems.map((item) => (
                    <li key={item.id} className="rounded-lg border bg-background p-3">
                      <p className="font-semibold">{item.dish_name}</p>
                      <p className="text-sm text-muted-foreground">
                        by {item.attendees.name}
                      </p>
                      {item.dietary_notes && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.dietary_notes}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
