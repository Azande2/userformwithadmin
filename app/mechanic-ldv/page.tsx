import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { MechanicLDVForm } from "@/components/forms/mechanic-ldv-form"

export const metadata: Metadata = {
  title: "Mechanic LDV Daily Checklist | Ringomode HSE",
  description: "Complete the mechanic light delivery vehicle daily inspection checklist.",
}

export default function MechanicLDVPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader role="user" />
      <MechanicLDVForm />
    </div>
  )
}