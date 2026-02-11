import { ExcavatorLoaderForm } from "@/components/forms/excavator-loader-form"
import { SiteHeader } from "@/components/site-header"

export const metadata = {
  title: "Excavator Loader Pre-Shift Inspection | Ringomode HSE",
  description: "Complete your pre-shift excavator loader inspection checklist.",
}

export default function ExcavatorLoaderPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader role="user" />
      <ExcavatorLoaderForm />
    </div>
  )
}
