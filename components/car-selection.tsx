"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface CarSelectionProps {
  selectedCar: string
  carColor: string
  onCarSelect: (car: string) => void
  onColorSelect: (color: string) => void
  onBack: () => void
  onNext: () => void
}

const cars = [
  {
    id: "sports",
    name: "Sports Car",
    emoji: "🏎️",
    stats: { speed: "★★★★☆", acceleration: "★★★☆☆", handling: "★★★★☆" },
  },
  {
    id: "racing",
    name: "Racing Car",
    emoji: "🏁",
    stats: { speed: "★★★★★", acceleration: "★★★☆☆", handling: "★★★☆☆" },
  },
  {
    id: "classic",
    name: "Classic Car",
    emoji: "🚗",
    stats: { speed: "★★★☆☆", acceleration: "★★☆☆☆", handling: "★★★★★" },
  },
  {
    id: "truck",
    name: "Monster Truck",
    emoji: "🚛",
    stats: { speed: "★★☆☆☆", acceleration: "★★★★☆", handling: "★★★☆☆" },
  },
]

const colors = [
  "#ea580c", // Orange
  "#dc2626", // Red
  "#2563eb", // Blue
  "#16a34a", // Green
  "#7c3aed", // Purple
  "#000000", // Black
  "#ffffff", // White
  "#fbbf24", // Yellow
]

export function CarSelection({ selectedCar, carColor, onCarSelect, onColorSelect, onBack, onNext }: CarSelectionProps) {
  const selectedCarData = cars.find((car) => car.id === selectedCar)

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl font-bold">Choose Your Car</h2>
        <div className="w-16" />
      </div>

      {/* Car Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Car Type</h3>
        <div className="grid grid-cols-2 gap-3">
          {cars.map((car) => (
            <Button
              key={car.id}
              variant={selectedCar === car.id ? "default" : "outline"}
              className="h-20 flex-col space-y-2"
              onClick={() => onCarSelect(car.id)}
            >
              <span className="text-2xl">{car.emoji}</span>
              <span className="text-sm">{car.name}</span>
              {selectedCar === car.id && (
                <div className="text-xs text-right">
                  <div>Speed: {car.stats.speed}</div>
                  <div>Accel: {car.stats.acceleration}</div>
                  <div>Handle: {car.stats.handling}</div>
                </div>
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Color Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Car Color</h3>
        <div className="grid grid-cols-4 gap-3">
          {colors.map((color) => (
            <button
              key={color}
              className={`w-12 h-12 rounded-full border-4 transition-all ${
                carColor === color ? "border-primary scale-110" : "border-border hover:scale-105"
              }`}
              style={{ backgroundColor: color }}
              onClick={() => onColorSelect(color)}
            />
          ))}
        </div>
      </div>

      {/* Preview with Stats */}
      <div className="text-center space-y-4">
        <div className="text-6xl" style={{ color: carColor }}>
          {selectedCarData?.emoji}
        </div>
        <div className="space-y-2">
          <p className="font-semibold">{selectedCarData?.name}</p>
          {selectedCarData && (
            <div className="text-sm text-muted-foreground space-y-1">
              <div>Speed: {selectedCarData.stats.speed}</div>
              <div>Acceleration: {selectedCarData.stats.acceleration}</div>
              <div>Handling: {selectedCarData.stats.handling}</div>
            </div>
          )}
        </div>
      </div>

      <Button onClick={onNext} className="w-full game-button text-lg py-6">
        Next
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </Card>
  )
}
