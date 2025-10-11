"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Trophy, RotateCcw, Home, Star } from "lucide-react"

interface ResultsScreenProps {
  results: {
    score: number
    total: number
    category: string
  }
  onPlayAgain: () => void
  onBackToHome: () => void
}

export function ResultsScreen({ results, onPlayAgain, onBackToHome }: ResultsScreenProps) {
  const percentage = Math.round((results.score / results.total) * 100)

  const getPerformanceMessage = () => {
    if (percentage >= 90) return { message: "Outstanding! You're a genius!", color: "text-green-600", stars: 5 }
    if (percentage >= 80) return { message: "Excellent work! Well done!", color: "text-blue-600", stars: 4 }
    if (percentage >= 70) return { message: "Good job! Keep it up!", color: "text-yellow-600", stars: 3 }
    if (percentage >= 60) return { message: "Not bad! Room for improvement.", color: "text-orange-600", stars: 2 }
    return { message: "Keep practicing! You'll get better!", color: "text-red-600", stars: 1 }
  }

  const performance = getPerformanceMessage()

  return (
    <Card className="p-8 text-center space-y-6 max-w-md mx-auto">
      <div className="space-y-4">
        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto">
          <Trophy className="h-10 w-10 text-primary-foreground" />
        </div>

        <div>
          <h2 className="text-3xl font-bold">Quiz Complete!</h2>
          <p className="text-muted-foreground capitalize">{results.category} Category</p>
        </div>

        <div className="space-y-2">
          <div className="text-4xl font-bold text-primary">
            {results.score}/{results.total}
          </div>
          <div className="text-2xl font-semibold">{percentage}%</div>

          <div className="flex justify-center gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={`h-6 w-6 ${i < performance.stars ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
        </div>

        <p className={`text-lg font-medium ${performance.color}`}>{performance.message}</p>
      </div>

      <div className="space-y-3">
        <Button onClick={onPlayAgain} className="w-full quiz-button">
          <RotateCcw className="h-4 w-4 mr-2" />
          Try Another Category
        </Button>

        <Button onClick={onBackToHome} variant="outline" className="w-full bg-transparent">
          <Home className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
      </div>
    </Card>
  )
}
