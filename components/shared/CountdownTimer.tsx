'use client'

import { useEffect, useState } from 'react'
import { PARTY_DATE } from '@/lib/constants'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const calculateTimeLeft = (): TimeLeft => {
      const difference = PARTY_DATE.getTime() - new Date().getTime()
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [mounted])

  if (!mounted || !timeLeft) {
    return (
      <div className="grid grid-cols-4 gap-4 text-center">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-lg bg-card p-4 shadow">
            <div className="text-3xl font-bold text-primary">--</div>
            <div className="text-sm text-muted-foreground">--</div>
          </div>
        ))}
      </div>
    )
  }

  const timeUnits = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {timeUnits.map((unit) => (
        <div key={unit.label} className="rounded-lg border-2 border-primary/20 bg-card p-4 shadow-lg">
          <div className="text-3xl font-bold text-primary sm:text-4xl">
            {String(unit.value).padStart(2, '0')}
          </div>
          <div className="text-sm font-medium text-muted-foreground">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  )
}
