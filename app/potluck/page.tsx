'use client'

import { useEffect, useState } from 'react'
import PotluckForm from '@/components/potluck/PotluckForm'
import CategoryCards from '@/components/potluck/CategoryCards'
import type { PotluckItemWithAttendee } from '@/types'

export default function PotluckPage() {
  const [items, setItems] = useState<PotluckItemWithAttendee[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/potluck')
      const result = await response.json()
      if (response.ok) {
        setItems(result.data || [])
      }
    } catch (error) {
      console.error('Failed to fetch potluck items:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold sm:text-4xl">
          Potluck Sign-Up 🍽️
        </h1>
        <p className="text-lg text-muted-foreground">
          Claim a dish and see what everyone else is bringing!
        </p>
      </div>

      <div className="mb-8 max-w-2xl mx-auto">
        <PotluckForm onSuccess={fetchItems} />
      </div>

      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-center">
          What's Being Brought
        </h2>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-8">
          <p className="text-muted-foreground">Loading dishes...</p>
        </div>
      ) : (
        <CategoryCards items={items} />
      )}
    </div>
  )
}
