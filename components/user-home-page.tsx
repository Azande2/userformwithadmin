"use client"

import Image from "next/image"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Truck, Tractor, TreePine, ArrowRight, ClipboardList, Shield } from "lucide-react"

const forms = [
  {
    id: "light-delivery",
    title: "Light Delivery Vehicle",
    subtitle: "Daily Checklist",
    description: "Pre-trip inspection for light delivery vehicles including checks for tyres, brakes, lights, and safety equipment.",
    icon: Truck,
    href: "/forms/light-delivery",
    docRef: "HSEMS/8.1.19/REG/012",
    itemCount: 26,
  },
  {
    id: "excavator-loader",
    title: "Excavator Loader",
    subtitle: "Pre-Shift Inspection",
    description: "Comprehensive pre-shift inspection for excavator loaders covering hydraulics, tracks, controls, and safety systems.",
    icon: Tractor,
    href: "/forms/excavator-loader",
    docRef: "HSEMS/8.1.19/REG/002",
    itemCount: 33,
  },
  {
    id: "excavator-harvester",
    title: "Excavator Harvester",
    subtitle: "Pre-Shift Inspection",
    description: "Pre-shift inspection for excavator harvesters including harvester head, feed rollers, delimbing knives, and safety checks.",
    icon: TreePine,
    href: "/forms/excavator-harvester",
    docRef: "HSEMS/8.1.19/REG/001",
    itemCount: 36,
  },
]

export function UserHomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader role="user" />

      <main className="mx-auto max-w-5xl p-4 lg:p-8">
        {/* Hero Section */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4">
            <Image src="/images/ringomode-logo.png" alt="Ringomode DSP logo" width={180} height={60} className="object-contain" />
          </div>
          <h1 className="text-balance text-2xl font-bold text-foreground lg:text-3xl">
            HSE Inspection Checklists
          </h1>
          <p className="mt-2 max-w-xl text-pretty text-muted-foreground">
            Select a checklist below to begin your pre-shift or daily inspection. All submissions are recorded and reviewed by the HSE team.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-3 gap-4">
          <Card className="text-center">
            <CardContent className="pt-6">
              <ClipboardList className="mx-auto mb-2 h-6 w-6 text-primary" />
              <div className="text-2xl font-bold text-foreground">{forms.length}</div>
              <div className="text-xs text-muted-foreground">Available Forms</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Shield className="mx-auto mb-2 h-6 w-6 text-primary" />
              <div className="text-2xl font-bold text-foreground">HSE</div>
              <div className="text-xs text-muted-foreground">Compliant</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <svg className="mx-auto mb-2 h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-2xl font-bold text-foreground">Digital</div>
              <div className="text-xs text-muted-foreground">Paperless</div>
            </CardContent>
          </Card>
        </div>

        {/* Form Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {forms.map((form) => {
            const Icon = form.icon
            return (
              <Card
                key={form.id}
                className="group relative overflow-hidden transition-all hover:border-primary/30 hover:shadow-md"
              >
                <CardHeader>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg text-foreground">{form.title}</CardTitle>
                  <CardDescription className="text-xs font-medium uppercase tracking-wide text-primary">
                    {form.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{form.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{form.itemCount} inspection items</span>
                    <span>{form.docRef}</span>
                  </div>
                  <Button asChild className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                    <Link href={form.href}>
                      Start Inspection
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Footer */}
        <footer className="mt-12 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          <p>Ringomode HSE Management System</p>
          <p className="mt-1">All inspections are logged and reviewed by the HSE Manager.</p>
        </footer>
      </main>
    </div>
  )
}

