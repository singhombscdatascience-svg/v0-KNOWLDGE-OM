"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Trophy, Clock } from "lucide-react"

interface LevelSelectionProps {
  currentLevel: number
  onLevelSelect: (level: number) => void
  onBack: () => void
  onStart: () => void
}

const tracks = [
  { id: 1, name: "City Circuit", difficulty: "Beginner", laps: 3, description: "Downtown street racing" },
  { id: 2, name: "Harbor Loop", difficulty: "Easy", laps: 3, description: "Coastal racing circuit" },
  { id: 3, name: "Mountain Pass", difficulty: "Medium", laps: 4, description: "Winding mountain roads" },
  { id: 4, name: "Industrial Zone", difficulty: "Medium", laps: 4, description: "Factory district racing" },
  { id: 5, name: "Highway Sprint", difficulty: "Hard", laps: 5, description: "High-speed highway racing" },
]

export function LevelSelection({ currentLevel, onLevelSelect, onBack, onStart }: LevelSelectionProps) {
  const maxUnlockedLevel = Math.min(currentLevel + 1, tracks.length)
  const currentTrack = tracks.find((track) => track.id === currentLevel) || tracks[0]

  const getTrackStatus = (trackId: number) => {
    if (trackId < currentLevel) return "completed"
    if (trackId === currentLevel) return "current"
    if (trackId <= maxUnlockedLevel) return "unlocked"
    return "locked"
  }

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl font-bold">Select Track</h2>
        <div className="w-16" />
      </div>

      <div className="text-center space-y-2">
        <div className="text-4xl font-bold text-primary">{currentTrack.name}</div>
        <div className="text-sm text-muted-foreground">
          {currentTrack.difficulty} • {currentTrack.laps} Laps
        </div>
      </div>

      {/* Track Selection */}
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {tracks.map((track) => {
          const status = getTrackStatus(track.id)
          return (
            <Button
              key={track.id}
              variant={track.id === currentLevel ? "default" : "outline"}
              className={`w-full h-16 flex justify-between items-center p-4 ${
                status === "locked" ? "opacity-50 cursor-not-allowed" : ""
              } ${status === "completed" ? "bg-green-50 border-green-200" : ""}`}
              onClick={() => status !== "locked" && onLevelSelect(track.id)}
              disabled={status === "locked"}
            >
              <div className="text-left">
                <div className="font-semibold flex items-center space-x-2">
                  <span>{track.name}</span>
                  {status === "completed" && <Trophy className="w-4 h-4 text-green-600" />}
                </div>
                <div className="text-sm text-muted-foreground">{track.description}</div>
              </div>
              <div className="text-right text-sm">
                <div>{track.difficulty}</div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{track.laps} laps</span>
                </div>
              </div>
            </Button>
          )
        })}
      </div>

      {/* Track Info */}
      <div className="bg-muted p-4 rounded-lg space-y-2">
        <div className="flex justify-between">
          <span className="font-semibold">Track:</span>
          <span>{currentTrack.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Difficulty:</span>
          <span>{currentTrack.difficulty}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Laps to Win:</span>
          <span>{currentTrack.laps}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">AI Opponents:</span>
          <span>3</span>
        </div>
      </div>

      <Button onClick={onStart} className="w-full game-button text-lg py-6">
        Start Race: {currentTrack.name}
      </Button>
    </Card>
  )
}
