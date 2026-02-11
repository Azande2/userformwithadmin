import { ExcavatorHarvesterForm } from "@/components/forms/excavator-harvester-form"
import { SiteHeader } from "@/components/site-header"

export const metadata = {
  title: "Excavator Harvester Pre-Shift Inspection | Ringomode HSE",
  description: "Complete your pre-shift excavator harvester inspection checklist.",
}

export default function ExcavatorHarvesterPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader role="user" />
      <ExcavatorHarvesterForm />
    </div>
  )
}
