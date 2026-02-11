import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

type Status = "ok" | "def" | "na" | null

interface ChecklistStatusBadgeProps {
  status: Status
  className?: string
}

export function ChecklistStatusBadge({ status, className }: ChecklistStatusBadgeProps) {
  if (!status) return null

  const statusConfig = {
    ok: {
      label: "OK",
      className: "bg-[hsl(142,76%,36%)] text-[hsl(0,0%,100%)] hover:bg-[hsl(142,76%,32%)]",
    },
    def: {
      label: "Defect",
      className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    },
    na: {
      label: "N/A",
      className: "bg-muted text-muted-foreground hover:bg-muted/80",
    },
  }

  const config = statusConfig[status]

  return (
    <Badge className={cn(config.className, className)}>
      {config.label}
    </Badge>
  )
}
