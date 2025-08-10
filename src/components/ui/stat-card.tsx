import React from "react"

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string | number
  sublabel?: string
  color?: "blue" | "green" | "amber" | "rose" | "indigo" | "purple" | "orange"
}

const colorMap: Record<string, string> = {
  blue: "bg-gradient-to-br from-blue-400 to-blue-500 text-white",
  green: "bg-gradient-to-br from-green-400 to-green-500 text-white",
  amber: "bg-gradient-to-br from-amber-400 to-amber-500 text-white",
  rose: "bg-gradient-to-br from-rose-400 to-rose-500 text-white",
  indigo: "bg-gradient-to-br from-indigo-400 to-indigo-500 text-white",
  purple: "bg-gradient-to-br from-purple-400 to-purple-500 text-white",
  orange: "bg-gradient-to-br from-orange-400 to-orange-500 text-white",
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, sublabel, color = "blue" }) => {
  return (
    <div className="rounded-2xl bg-white shadow-lg px-6 py-5 flex items-center gap-4 min-w-[240px] max-w-full border border-slate-100">
      <div className={`flex items-center justify-center w-14 h-14 rounded-full shadow ${colorMap[color]} text-2xl`}>{icon}</div>
      <div className="flex flex-col justify-center">
        <span className="text-slate-500 text-sm font-medium mb-1">{label}</span>
        <span className="text-3xl font-extrabold text-slate-800 leading-tight">{value}</span>
        {sublabel && <span className="text-xs text-slate-400 mt-1 font-medium">{sublabel}</span>}
      </div>
    </div>
  )
}

export default StatCard 