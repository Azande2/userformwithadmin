import { LightDeliveryForm } from "@/components/forms/light-delivery-form"
import { SiteHeader } from "@/components/site-header"

export const metadata = {
  title: "Light Delivery Vehicle Daily Checklist | Ringomode HSE",
  description: "Complete your daily light delivery vehicle inspection checklist.",
}

export default function LightDeliveryPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader role="user" />
      <LightDeliveryForm />
    </div>
  )
}
