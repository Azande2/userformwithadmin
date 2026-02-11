import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { LowbedTrailerForm } from "@/components/forms/lowbed-trailer-form"

export const metadata: Metadata = {
  title: "Lowbed & Roll Back Trailer Pre-Shift Inspection | Ringomode HSE",
  description: "Complete the lowbed and roll back trailer pre-shift use inspection checklist.",
}

export default function LowbedTrailerPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader role="user" />
      <LowbedTrailerForm />
    </div>
  )
}
