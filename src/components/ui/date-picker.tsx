"use client"

import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

export interface DatePickerProps {
  value?: Date | string
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  id?: string
  className?: string
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  disabled = false,
  id,
  className,
  ...props
}: DatePickerProps) {
  const [displayValue, setDisplayValue] = React.useState<string>("")

  React.useEffect(() => {
    if (value) {
      const date = typeof value === 'string' ? value : format(value, 'yyyy-MM-dd')
      setDisplayValue(date)
    } else {
      setDisplayValue("")
    }
  }, [value])

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value
    setDisplayValue(dateValue)
    
    if (dateValue) {
      const date = new Date(dateValue)
      if (!isNaN(date.getTime())) {
        onChange?.(date)
      }
    } else {
      onChange?.(undefined)
    }
  }

  return (
    <div className="relative">
      <div className="relative">
        <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none z-10" />
        <Input
          type="date"
          id={id}
          value={displayValue}
          onChange={handleDateChange}
          disabled={disabled}
          className={cn(
            "pl-10 h-11 text-base border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200",
            className
          )}
          placeholder={placeholder}
          {...props}
        />
      </div>
    </div>
  )
}
