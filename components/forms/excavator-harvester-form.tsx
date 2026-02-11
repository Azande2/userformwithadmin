"use client"

import React from "react"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChecklistRadioGroup } from "@/components/checklist-radio-group"
import { excavatorHarvesterItems, type CheckStatus } from "@/lib/types"
import { AlertTriangle, CheckCircle2, Send, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function ExcavatorHarvesterForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    operatorName: "",
    documentNo: "",
    shift: "",
    date: new Date().toISOString().split("T")[0],
    hourMeterStart: "",
    hourMeterStop: "",
    validTrainingCard: "",
    unitNumber: "",
  })

  const [items, setItems] = useState<Record<string, CheckStatus>>(
    Object.fromEntries(excavatorHarvesterItems.map((item) => [item, null]))
  )

  const [defectDetails, setDefectDetails] = useState("")
  const [signature, setSignature] = useState("")

  const hasDefects = useMemo(() => Object.values(items).some((s) => s === "def"), [items])
  const allItemsChecked = useMemo(() => Object.values(items).every((s) => s !== null), [items])
  const checkedCount = useMemo(() => Object.values(items).filter((s) => s !== null).length, [items])

  const handleItemChange = (label: string, value: CheckStatus) => {
    setItems((prev) => ({ ...prev, [label]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.operatorName || !formData.unitNumber) {
      toast.error("Please fill in all required fields")
      return
    }

    if (!allItemsChecked) {
      toast.error("Please check all inspection items")
      return
    }

    if (hasDefects && !defectDetails.trim()) {
      toast.error("Please provide details for the defects")
      return
    }

    if (!signature.trim()) {
      toast.error("Please provide your signature")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "excavator-harvester",
          formTitle: "Excavator Harvester Pre-Shift Inspection Checklist",
          submittedBy: formData.operatorName,
          hasDefects,
          data: {
            ...formData,
            items,
            hasDefects,
            defectDetails,
            signature,
          },
        }),
      })

      if (response.ok) {
        toast.success("Checklist submitted successfully!")
        router.push("/")
      } else {
        toast.error("Failed to submit checklist")
      }
    } catch {
      toast.error("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-6 p-4 pb-12 lg:p-8 lg:pb-16">
      <div className="flex items-center gap-3">
        <Button type="button" variant="ghost" size="sm" asChild className="gap-2 text-muted-foreground">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </Button>
      </div>

      {/* Header */}
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-3">
            <Image src="/images/ringomode-logo.png" alt="Ringomode DSP logo" width={160} height={50} className="object-contain" />
          </div>
          <div className="mb-1 text-xs font-medium text-muted-foreground">HSE Management System</div>
          <CardTitle className="text-xl text-foreground">Excavator Harvester Pre-Shift Inspection Checklist</CardTitle>
          <CardDescription>
            Document Ref: HSEMS/8.1.19/REG/001 | Rev. 5 | 27.03.2020
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Operator Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base text-foreground">Operator Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="operatorName" className="text-foreground">Operator Name & Surname <span className="text-destructive">*</span></Label>
            <Input
              id="operatorName"
              value={formData.operatorName}
              onChange={(e) => setFormData((p) => ({ ...p, operatorName: e.target.value }))}
              placeholder="Enter operator name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="documentNo" className="text-foreground">Document No.</Label>
            <Input
              id="documentNo"
              value={formData.documentNo}
              onChange={(e) => setFormData((p) => ({ ...p, documentNo: e.target.value }))}
              placeholder="e.g. DOC-001"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="shift" className="text-foreground">Shift</Label>
            <Select value={formData.shift} onValueChange={(val) => setFormData((p) => ({ ...p, shift: val }))}>
              <SelectTrigger id="shift">
                <SelectValue placeholder="Select shift" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Day Shift</SelectItem>
                <SelectItem value="night">Night Shift</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="date" className="text-foreground">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData((p) => ({ ...p, date: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hourMeterStart" className="text-foreground">Hour Meter Start</Label>
            <Input
              id="hourMeterStart"
              type="number"
              value={formData.hourMeterStart}
              onChange={(e) => setFormData((p) => ({ ...p, hourMeterStart: e.target.value }))}
              placeholder="e.g. 1250"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hourMeterStop" className="text-foreground">Hour Meter Stop</Label>
            <Input
              id="hourMeterStop"
              type="number"
              value={formData.hourMeterStop}
              onChange={(e) => setFormData((p) => ({ ...p, hourMeterStop: e.target.value }))}
              placeholder="e.g. 1262"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="validTrainingCard" className="text-foreground">Valid Training Card (Exp. Date)</Label>
            <Input
              id="validTrainingCard"
              type="date"
              value={formData.validTrainingCard}
              onChange={(e) => setFormData((p) => ({ ...p, validTrainingCard: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="unitNumber" className="text-foreground">Unit Number <span className="text-destructive">*</span></Label>
            <Input
              id="unitNumber"
              value={formData.unitNumber}
              onChange={(e) => setFormData((p) => ({ ...p, unitNumber: e.target.value }))}
              placeholder="e.g. EXC-H-001"
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <h3 className="mb-2 text-sm font-semibold text-foreground">Instructions for checklist:</h3>
          <ol className="space-y-1 text-sm text-muted-foreground">
            <li>{"1. Select \"Ok\" if in order."}</li>
            <li>{"2. Select \"Def\" for any defect."}</li>
            <li>{"3. Select \"N/A\" if not applicable."}</li>
          </ol>
        </CardContent>
      </Card>

      {/* Progress */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          Progress: {checkedCount} / {excavatorHarvesterItems.length} items checked
        </span>
        {allItemsChecked && (
          <span className="flex items-center gap-1 text-[hsl(142,76%,36%)]">
            <CheckCircle2 className="h-4 w-4" />
            All items checked
          </span>
        )}
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${(checkedCount / excavatorHarvesterItems.length) * 100}%` }}
        />
      </div>

      {/* Checklist Items */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base text-foreground">Inspection Items</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {excavatorHarvesterItems.map((item, idx) => (
            <ChecklistRadioGroup
              key={item}
              label={item}
              value={items[item]}
              onChange={(val) => handleItemChange(item, val)}
              index={idx}
            />
          ))}
        </CardContent>
      </Card>

      {/* Defects Section */}
      {hasDefects && (
        <Card className="border-destructive/30 bg-destructive/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Defects Detected
            </CardTitle>
            <CardDescription>
              Please provide details for all defects identified above.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={defectDetails}
              onChange={(e) => setDefectDetails(e.target.value)}
              placeholder="Describe the defects in detail..."
              rows={4}
              className="resize-none"
              required
            />
          </CardContent>
        </Card>
      )}

      {/* Signature */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base text-foreground">Signature</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signature" className="text-foreground">Type your full name as signature <span className="text-destructive">*</span></Label>
            <Input
              id="signature"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              placeholder="Type your full name"
              required
            />
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Submit */}
      <div className="flex items-center justify-end gap-4">
        <Button type="button" variant="outline" asChild>
          <Link href="/">Cancel</Link>
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Send className="h-4 w-4" />
          {isSubmitting ? "Submitting..." : "Submit Checklist"}
        </Button>
      </div>
    </form>
  )
}

