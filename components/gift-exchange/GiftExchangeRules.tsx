import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { GIFT_EXCHANGE_RULES } from '@/lib/constants'

export default function GiftExchangeRules() {
  return (
    <Card className="border-blue-200 bg-blue-50/50">
      <CardHeader>
        <CardTitle>Gift Exchange Rules 📋</CardTitle>
        <CardDescription>
          Please read before bringing your gift!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {GIFT_EXCHANGE_RULES.map((rule, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
