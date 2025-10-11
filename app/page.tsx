"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CategorySelection } from "@/components/category-selection"
import QuizScreen from "@/components/quiz-screen"
import { ResultsScreen } from "@/components/results-screen"

type AppState = "home" | "categories" | "quiz" | "results"

export default function KnowEverythingApp() {
  const [appState, setAppState] = useState<AppState>("home")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [quizResults, setQuizResults] = useState({ score: 0, total: 0, category: "" })

  const handleStartQuiz = (category: string) => {
    setSelectedCategory(category)
    setAppState("quiz")
  }

  const handleQuizComplete = (score: number, total: number) => {
    setQuizResults({ score, total, category: selectedCategory })
    setAppState("results")
  }

  const handleBackToHome = () => {
    setAppState("home")
    setSelectedCategory("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        {appState === "home" && (
          <Card className="p-8 text-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-primary">Know Everything</h1>
              <p className="text-xl text-muted-foreground">Test your knowledge across multiple fields</p>
              <p className="text-muted-foreground">
                Challenge yourself with questions from Science, History, Sports, and more!
              </p>
            </div>

            <div className="space-y-4">
              <Button onClick={() => setAppState("categories")} className="quiz-button text-lg py-6 px-8">
                Start Quiz
              </Button>

              <div className="text-sm text-muted-foreground">
                Choose from 8+ categories • Multiple difficulty levels
              </div>
            </div>
          </Card>
        )}

        {appState === "categories" && (
          <CategorySelection onCategorySelect={handleStartQuiz} onBack={handleBackToHome} />
        )}

        {appState === "quiz" && (
          <QuizScreen
            category={selectedCategory}
            onQuizComplete={handleQuizComplete}
            onBack={() => setAppState("categories")}
          />
        )}

        {appState === "results" && (
          <ResultsScreen
            results={quizResults}
            onPlayAgain={() => setAppState("categories")}
            onBackToHome={handleBackToHome}
          />
        )}
      </div>
    </div>
  )
}
