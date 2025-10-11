"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, BookOpen, Atom, Trophy, Globe, Cpu, Palette, Music, Stethoscope } from "lucide-react"

interface CategorySelectionProps {
  onCategorySelect: (category: string) => void
  onBack: () => void
}

const categories = [
  { id: "science", name: "Science", icon: Atom, color: "bg-blue-500", description: "Physics, Chemistry, Biology" },
  {
    id: "history",
    name: "History",
    icon: BookOpen,
    color: "bg-amber-500",
    description: "World History, Ancient Civilizations",
  },
  { id: "sports", name: "Sports", icon: Trophy, color: "bg-green-500", description: "Football, Cricket, Olympics" },
  {
    id: "geography",
    name: "Geography",
    icon: Globe,
    color: "bg-teal-500",
    description: "Countries, Capitals, Landmarks",
  },
  {
    id: "technology",
    name: "Technology",
    icon: Cpu,
    color: "bg-purple-500",
    description: "Computers, Internet, Innovation",
  },
  {
    id: "arts",
    name: "Arts & Literature",
    icon: Palette,
    color: "bg-pink-500",
    description: "Paintings, Books, Artists",
  },
  { id: "music", name: "Music", icon: Music, color: "bg-orange-500", description: "Classical, Pop, Instruments" },
  {
    id: "health",
    name: "Health & Medicine",
    icon: Stethoscope,
    color: "bg-red-500",
    description: "Human Body, Diseases, Wellness",
  },
]

export function CategorySelection({ onCategorySelect, onBack }: CategorySelectionProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold">Choose Your Category</h2>
          <p className="text-muted-foreground">Select a field to test your knowledge</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => {
          const IconComponent = category.icon
          return (
            <Card
              key={category.id}
              className="category-card p-6 text-center space-y-4"
              onClick={() => onCategorySelect(category.id)}
            >
              <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto`}>
                <IconComponent className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </div>
            </Card>
          )
        })}
      </div>
    </Card>
  )
}
