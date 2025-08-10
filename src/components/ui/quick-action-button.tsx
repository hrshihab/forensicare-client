import React from "react"
import { Button } from "@/components/ui/button"

interface QuickActionButtonProps {
  icon: React.ReactNode
  label: string
  color: "blue" | "purple" | "green" | "amber" | "indigo" | "rose"
}

const colorMap = {
  blue: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/20 hover:shadow-blue-600/30",
  purple:
    "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-lg shadow-purple-500/20 hover:shadow-purple-600/30",
  green:
    "from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-600/30",
  amber:
    "from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-lg shadow-amber-500/20 hover:shadow-amber-600/30",
  indigo:
    "from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-600/30",
  rose: "from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 shadow-lg shadow-rose-500/20 hover:shadow-rose-600/30",
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({ icon, label, color }) => (
  <Button
    className={`flex flex-col h-24 bg-gradient-to-br ${colorMap[color]} transition-all duration-300 ease-in-out transform hover:scale-105`}
  >
    <div className="bg-white/20 rounded-full p-2 mb-2">{icon}</div>
    <span>{label}</span>
  </Button>
)

export default QuickActionButton 