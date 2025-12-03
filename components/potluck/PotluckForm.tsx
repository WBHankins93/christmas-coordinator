'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { POTLUCK_CATEGORIES } from '@/lib/constants'
import type { PotluckCategory } from '@/types'

interface PotluckFormProps {
  onSuccess: () => void
  initialCategory?: PotluckCategory
}

export default function PotluckForm({ onSuccess, initialCategory }: PotluckFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dish_name: '',
    category: initialCategory || ('appetizers' as PotluckCategory),
    dietary_notes: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/potluck', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit')
      }

      setSuccess(true)
      setFormData({
        name: '',
        email: '',
        dish_name: '',
        category: initialCategory || 'appetizers',
        dietary_notes: '',
      })
      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Claim Your Dish 🍽️</CardTitle>
        <CardDescription>
          Let everyone know what you're bringing!
        </CardDescription>
      </CardHeader>
      <CardContent>
        {success && (
          <div className="mb-4 rounded-lg bg-green-50 p-4 text-green-800">
            Success! Your dish has been added to the potluck.
          </div>
        )}
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-800">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="Your name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email (optional)</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your.email@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dish_name">Dish Name *</Label>
            <Input
              id="dish_name"
              value={formData.dish_name}
              onChange={(e) => setFormData({ ...formData, dish_name: e.target.value })}
              required
              placeholder="e.g., Chocolate Chip Cookies"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as PotluckCategory })}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              required
            >
              {POTLUCK_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.emoji} {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dietary_notes">Dietary Notes (optional)</Label>
            <Textarea
              id="dietary_notes"
              value={formData.dietary_notes}
              onChange={(e) => setFormData({ ...formData, dietary_notes: e.target.value })}
              placeholder="e.g., Vegetarian, Gluten-free, Contains nuts"
              rows={2}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Add My Dish! 🍽️'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
