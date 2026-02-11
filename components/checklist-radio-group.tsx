"use client"

import { cn } from "@/lib/utils"

type Status = "ok" | "def" | "na"

interface ChecklistRadioGroupProps {
  value: Status | null
  onChange: (value: Status) => void
  label: string
  index: number
}

export function ChecklistRadioGroup({ value, onChange, label, index }: ChecklistRadioGroupProps) {
  const options: { value: Status; label: string; activeClass: string }[] = [
    {
      value: "ok",
      label: "Ok",
      activeClass: "border-[hsl(142,76%,36%)] bg-[hsl(142,76%,36%)] text-[hsl(0,0%,100%)]",
    },
    {
      value: "def",
      label: "Def",
      activeClass: "border-destructive bg-destructive text-destructive-foreground",
    },
    {
      value: "na",
      label: "N/A",
      activeClass: "border-muted-foreground bg-muted text-muted-foreground",
    },
  ]

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 rounded-lg border border-border px-4 py-3",
        index % 2 === 0 ? "bg-card" : "bg-muted/50",
        value === "def" && "border-destructive/30 bg-destructive/5"
      )}
    >
      <span className="text-sm font-medium text-foreground">{label}</span>
      <div className="flex items-center gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded-md border-2 border-border px-3 py-1 text-xs font-semibold transition-all",
              value === option.value ? option.activeClass : "bg-card text-muted-foreground hover:border-primary/30"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}
