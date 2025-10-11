"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Pause, Play } from "lucide-react"

interface GameScreenProps {
  selectedCar: string
  carColor: string
  level: number
  onGameEnd: () => void
}

interface CarPosition {
  x: number
  y: number
  angle: number
  speed: number
}

interface AIOpponent {
  id: number
  x: number
  y: number
  angle: number
  speed: number
  color: string
  type: string
  lapProgress: number
}

export function GameScreen({ selectedCar, carColor, level, onGameEnd }: GameScreenProps) {
  const [playerCar, setPlayerCar] = useState<CarPosition>({ x: 50, y: 85, angle: 0, speed: 0 })
  const [aiOpponents, setAiOpponents] = useState<AIOpponent[]>([])
  const [gameRunning, setGameRunning] = useState(true)
  const [gameOver, setGameOver] = useState(false)
  const [raceComplete, setRaceComplete] = useState(false)
  const [currentLap, setCurrentLap] = useState(1)
  const [lapTime, setLapTime] = useState(0)
  const [bestLapTime, setBestLapTime] = useState<number | null>(null)
  const [position, setPosition] = useState(1)
  const [lapProgress, setLapProgress] = useState(0)
  const [keys, setKeys] = useState({ up: false, down: false, left: false, right: false })

  const carStats = {
    sports: { maxSpeed: 8, acceleration: 0.3, handling: 0.15 },
    racing: { maxSpeed: 10, acceleration: 0.25, handling: 0.12 },
    classic: { maxSpeed: 6, acceleration: 0.2, handling: 0.18 },
  }

  const carEmojis = {
    sports: "🏎️",
    racing: "🏁",
    classic: "🚗",
  }

  useEffect(() => {
    const opponents: AIOpponent[] = [
      { id: 1, x: 45, y: 85, angle: 0, speed: 0, color: "#ef4444", type: "sports", lapProgress: 0 },
      { id: 2, x: 55, y: 85, angle: 0, speed: 0, color: "#3b82f6", type: "racing", lapProgress: 0 },
      { id: 3, x: 40, y: 85, angle: 0, speed: 0, color: "#10b981", type: "classic", lapProgress: 0 },
    ]
    setAiOpponents(opponents)
  }, [])

  const getTrackPosition = (progress: number) => {
    const normalizedProgress = progress % 1
    const angle = normalizedProgress * Math.PI * 2

    // City circuit with curves and straights
    const baseRadius = 35
    const radiusVariation = 10 * Math.sin(angle * 3)
    const radius = baseRadius + radiusVariation

    const centerX = 50
    const centerY = 50

    const x = centerX + radius * Math.cos(angle)
    const y = centerY + radius * Math.sin(angle)

    return { x, y, angle: angle + Math.PI / 2 }
  }

  useEffect(() => {
    if (!gameRunning || gameOver || raceComplete) return

    const gameLoop = setInterval(() => {
      const stats = carStats[selectedCar as keyof typeof carStats]

      // Update player car physics
      setPlayerCar((prev) => {
        let newSpeed = prev.speed
        let newAngle = prev.angle
        let newX = prev.x
        let newY = prev.y

        // Acceleration/Deceleration
        if (keys.up) {
          newSpeed = Math.min(stats.maxSpeed, newSpeed + stats.acceleration)
        } else if (keys.down) {
          newSpeed = Math.max(-stats.maxSpeed * 0.5, newSpeed - stats.acceleration * 1.5)
        } else {
          newSpeed *= 0.95 // Natural deceleration
        }

        // Steering (only when moving)
        if (Math.abs(newSpeed) > 0.1) {
          if (keys.left) {
            newAngle -= stats.handling * (newSpeed / stats.maxSpeed)
          }
          if (keys.right) {
            newAngle += stats.handling * (newSpeed / stats.maxSpeed)
          }
        }

        // Movement
        newX += Math.cos(newAngle) * newSpeed * 0.5
        newY += Math.sin(newAngle) * newSpeed * 0.5

        // Keep car on screen
        newX = Math.max(5, Math.min(95, newX))
        newY = Math.max(5, Math.min(95, newY))

        return { x: newX, y: newY, angle: newAngle, speed: newSpeed }
      })

      // Update AI opponents
      setAiOpponents((prev) =>
        prev.map((ai) => {
          const targetPos = getTrackPosition(ai.lapProgress)
          const dx = targetPos.x - ai.x
          const dy = targetPos.y - ai.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          const aiStats = carStats[ai.type as keyof typeof carStats]
          const targetSpeed = Math.min(aiStats.maxSpeed * 0.8, distance * 0.3)

          let newSpeed = ai.speed
          if (newSpeed < targetSpeed) {
            newSpeed = Math.min(targetSpeed, newSpeed + aiStats.acceleration * 0.8)
          } else {
            newSpeed = Math.max(targetSpeed, newSpeed - aiStats.acceleration)
          }

          const moveX = (dx / distance) * newSpeed * 0.5
          const moveY = (dy / distance) * newSpeed * 0.5

          return {
            ...ai,
            x: ai.x + (moveX || 0),
            y: ai.y + (moveY || 0),
            speed: newSpeed,
            angle: Math.atan2(dy, dx),
            lapProgress: ai.lapProgress + 0.002 + Math.random() * 0.001,
          }
        }),
      )

      // Update lap progress and timing
      setLapProgress((prev) => {
        const newProgress = prev + 0.003
        if (newProgress >= 1 && prev < 1) {
          // Lap completed
          setCurrentLap((lap) => {
            const newLap = lap + 1
            if (newLap > 3) {
              setRaceComplete(true)
              setGameRunning(false)
            }
            return newLap
          })

          if (bestLapTime === null || lapTime < bestLapTime) {
            setBestLapTime(lapTime)
          }
          setLapTime(0)
          return 0
        }
        return newProgress
      })

      setLapTime((prev) => prev + 0.05)

      // Calculate position
      const allProgress = [
        { id: "player", progress: lapProgress + (currentLap - 1) },
        ...aiOpponents.map((ai) => ({ id: ai.id, progress: ai.lapProgress + Math.floor(ai.lapProgress) })),
      ].sort((a, b) => b.progress - a.progress)

      const playerPos = allProgress.findIndex((p) => p.id === "player") + 1
      setPosition(playerPos)
    }, 50)

    return () => clearInterval(gameLoop)
  }, [
    gameRunning,
    gameOver,
    raceComplete,
    keys,
    selectedCar,
    lapProgress,
    currentLap,
    lapTime,
    bestLapTime,
    aiOpponents,
  ])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          setKeys((prev) => ({ ...prev, up: true }))
          break
        case "ArrowDown":
        case "s":
        case "S":
          setKeys((prev) => ({ ...prev, down: true }))
          break
        case "ArrowLeft":
        case "a":
        case "A":
          setKeys((prev) => ({ ...prev, left: true }))
          break
        case "ArrowRight":
        case "d":
        case "D":
          setKeys((prev) => ({ ...prev, right: true }))
          break
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          setKeys((prev) => ({ ...prev, up: false }))
          break
        case "ArrowDown":
        case "s":
        case "S":
          setKeys((prev) => ({ ...prev, down: false }))
          break
        case "ArrowLeft":
        case "a":
        case "A":
          setKeys((prev) => ({ ...prev, left: false }))
          break
        case "ArrowRight":
        case "d":
        case "D":
          setKeys((prev) => ({ ...prev, right: false }))
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  const togglePause = () => {
    setGameRunning(!gameRunning)
  }

  const restartRace = () => {
    setPlayerCar({ x: 50, y: 85, angle: 0, speed: 0 })
    setCurrentLap(1)
    setLapTime(0)
    setLapProgress(0)
    setPosition(1)
    setGameOver(false)
    setRaceComplete(false)
    setGameRunning(true)

    // Reset AI
    const opponents: AIOpponent[] = [
      { id: 1, x: 45, y: 85, angle: 0, speed: 0, color: "#ef4444", type: "sports", lapProgress: 0 },
      { id: 2, x: 55, y: 85, angle: 0, speed: 0, color: "#3b82f6", type: "racing", lapProgress: 0 },
      { id: 3, x: 40, y: 85, angle: 0, speed: 0, color: "#10b981", type: "classic", lapProgress: 0 },
    ]
    setAiOpponents(opponents)
  }

  return (
    <Card className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onGameEnd}>
          <ArrowLeft className="w-4 h-4 mr-1" />
          Menu
        </Button>
        <div className="text-center">
          <div className="text-lg font-bold">City Circuit</div>
          <div className="text-sm text-muted-foreground">
            Lap {currentLap}/3 • Position: {position}/4
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={togglePause}>
          {gameRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
      </div>

      {/* Race Info */}
      <div className="grid grid-cols-3 gap-2 text-center text-sm">
        <div>
          <div className="font-semibold">Lap Time</div>
          <div>{lapTime.toFixed(1)}s</div>
        </div>
        <div>
          <div className="font-semibold">Best Lap</div>
          <div>{bestLapTime ? `${bestLapTime.toFixed(1)}s` : "--"}</div>
        </div>
        <div>
          <div className="font-semibold">Speed</div>
          <div>{Math.abs(playerCar.speed * 10).toFixed(0)} km/h</div>
        </div>
      </div>

      {/* Game Area - City Track */}
      <div className="relative w-full h-96 bg-gradient-to-b from-gray-700 to-gray-800 rounded-lg overflow-hidden">
        {/* Track outline */}
        <div className="absolute inset-4 border-4 border-yellow-400 rounded-full opacity-30" />
        <div className="absolute inset-8 border-2 border-white border-dashed rounded-full opacity-20" />

        {/* City buildings background */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-gray-400"
              style={{
                left: `${10 + i * 10}%`,
                top: `${5 + (i % 3) * 10}%`,
                width: "8%",
                height: `${20 + (i % 4) * 10}%`,
              }}
            />
          ))}
        </div>

        {/* Player Car */}
        <div
          className="absolute text-2xl transition-all duration-100 z-10"
          style={{
            left: `${playerCar.x}%`,
            top: `${playerCar.y}%`,
            transform: `translate(-50%, -50%) rotate(${playerCar.angle}rad)`,
            color: carColor,
            filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.5))",
          }}
        >
          {carEmojis[selectedCar as keyof typeof carEmojis]}
        </div>

        {/* AI Opponents */}
        {aiOpponents.map((ai) => (
          <div
            key={ai.id}
            className="absolute text-xl transition-all duration-100"
            style={{
              left: `${ai.x}%`,
              top: `${ai.y}%`,
              transform: `translate(-50%, -50%) rotate(${ai.angle}rad)`,
              color: ai.color,
              filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.5))",
            }}
          >
            {carEmojis[ai.type as keyof typeof carEmojis]}
          </div>
        ))}

        {/* Race Complete Overlay */}
        {raceComplete && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
            <div className="text-center text-white space-y-4">
              <div className="text-3xl font-bold">🏁 Race Complete!</div>
              <div className="text-xl">Final Position: {position}/4</div>
              {bestLapTime && <div className="text-lg">Best Lap: {bestLapTime.toFixed(1)}s</div>}
              <div className="space-x-2">
                <Button onClick={restartRace} variant="secondary">
                  Race Again
                </Button>
                <Button onClick={onGameEnd}>Main Menu</Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="space-y-4">
        <div className="grid grid-cols-4 gap-2 max-w-64 mx-auto">
          <Button
            onMouseDown={() => setKeys((prev) => ({ ...prev, up: true }))}
            onMouseUp={() => setKeys((prev) => ({ ...prev, up: false }))}
            onTouchStart={() => setKeys((prev) => ({ ...prev, up: true }))}
            onTouchEnd={() => setKeys((prev) => ({ ...prev, up: false }))}
            className="game-button h-12 text-xs"
            disabled={!gameRunning}
          >
            Accelerate
          </Button>

          <Button
            onMouseDown={() => setKeys((prev) => ({ ...prev, left: true }))}
            onMouseUp={() => setKeys((prev) => ({ ...prev, left: false }))}
            onTouchStart={() => setKeys((prev) => ({ ...prev, left: true }))}
            onTouchEnd={() => setKeys((prev) => ({ ...prev, left: false }))}
            className="game-button h-12 text-xs"
            disabled={!gameRunning}
          >
            Steer Left
          </Button>

          <Button
            onMouseDown={() => setKeys((prev) => ({ ...prev, right: true }))}
            onMouseUp={() => setKeys((prev) => ({ ...prev, right: false }))}
            onTouchStart={() => setKeys((prev) => ({ ...prev, right: true }))}
            onTouchEnd={() => setKeys((prev) => ({ ...prev, right: false }))}
            className="game-button h-12 text-xs"
            disabled={!gameRunning}
          >
            Steer Right
          </Button>

          <Button
            onMouseDown={() => setKeys((prev) => ({ ...prev, down: true }))}
            onMouseUp={() => setKeys((prev) => ({ ...prev, down: false }))}
            onTouchStart={() => setKeys((prev) => ({ ...prev, down: true }))}
            onTouchEnd={() => setKeys((prev) => ({ ...prev, down: false }))}
            className="game-button h-12 text-xs"
            disabled={!gameRunning}
          >
            Brake
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Use controls or keyboard (WASD/Arrow keys) • 3 laps to win
        </div>
      </div>
    </Card>
  )
}
