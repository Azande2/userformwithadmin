// ============================================
// CHECK STATUS TYPES
// ============================================
export type CheckStatus = "ok" | "def" | "na" | null

export interface ChecklistItem {
  id: string
  label: string
  status: CheckStatus
}

// ============================================
// FORM DATA TYPES - EXACT FIELDS FROM YOUR FORMS
// ============================================
export interface LightDeliveryFormData {
  driverName: string
  documentNo: string
  vehicleRegistration: string
  date: string
  validTrainingCard: string
  driversLicenseAvailable: string
  odometerStart: string
  odometerStop: string
  items: Record<string, CheckStatus>
  hasDefects: boolean
  defectDetails: string
  signature: string
}

export interface ExcavatorLoaderFormData {
  operatorName: string
  documentNo: string
  shift: string
  date: string
  hourMeterStart: string
  hourMeterStop: string
  validTrainingCard: string
  unitNumber: string
  items: Record<string, CheckStatus>
  hasDefects: boolean
  defectDetails: string
  signature: string
}

export interface ExcavatorHarvesterFormData {
  operatorName: string
  documentNo: string
  shift: string
  date: string
  hourMeterStart: string
  hourMeterStop: string
  validTrainingCard: string
  unitNumber: string
  items: Record<string, CheckStatus>
  hasDefects: boolean
  defectDetails: string
  signature: string
}

// Union type for all form data
export type FormDataUnion = 
  | LightDeliveryFormData 
  | ExcavatorLoaderFormData 
  | ExcavatorHarvesterFormData

// ============================================
// FORM TYPE CONSTANTS
// ============================================
export type FormType = "light-delivery" | "excavator-loader" | "excavator-harvester"

// ============================================
// SUBMISSION TYPE - WITH NOTIFICATION FIELDS
// ============================================
export interface Submission {
  id: string
  formType: FormType
  formTitle: string
  submittedBy: string
  submittedAt: string
  data: FormDataUnion  // Using the union type
  hasDefects: boolean
  // Notification tracking fields
  isRead?: boolean      // Whether admin has viewed this submission
  viewedAt?: string     // When admin viewed it
}

// ============================================
// NOTIFICATION TYPES
// ============================================
export interface Notification {
  id: string
  title: string
  message: string
  time: string
  formType: FormType
  hasDefects: boolean
  isRead: boolean
  submissionId: string
}

// ============================================
// FILTER OPTIONS
// ============================================
export interface FilterOptions {
  formType?: FormType | 'all'
  hasDefects?: boolean
  unreadOnly?: boolean
  search?: string
  dateRange?: 'today' | 'week' | 'month' | 'all'
  startDate?: string
  endDate?: string
}

// ============================================
// STATISTICS TYPES
// ============================================
export interface SubmissionStats {
  total: number
  unread: number
  withDefects: number
  clean: number
  today: number
  weekly: number
  monthly: number
  byType: Record<FormType, number>
  byStatus: {
    ok: number
    def: number
    na: number
  }
}

// ============================================
// CHECKLIST ITEMS - ARRAYS FOR EACH FORM TYPE
// ============================================
export const lightDeliveryItems = [
  "Drivers license available",
  "Valid training card",
  "Vehicle registration document",
  "Windscreen (cracks/chips)",
  "Wipers and washers",
  "Mirrors (rear view/side)",
  "Lights (head/tail/brake/indicator)",
  "Horn",
  "Seat belt",
  "Seats (condition/adjustment)",
  "Fire extinguisher (serviced/sealed)",
  "First aid kit",
  "Warning triangle",
  "Jack and wheel spanner",
  "Spare wheel (condition/pressure)",
  "Tyres (condition/pressure/wear)",
  "Brakes (foot/handbrake)",
  "Steering (play/condition)",
  "Oil level",
  "Coolant level",
  "Battery (condition/terminals)",
  "Exhaust system (leaks/condition)",
  "Body (dents/damage)",
  "Doors (locks/handles)",
  "Fuel level",
  "General cleanliness",
] as const

export const excavatorLoaderItems = [
  "Fire extinguisher (serviced/sealed)",
  "First aid kit",
  "Seat belt",
  "Mirrors",
  "Lights (head/tail/work)",
  "Horn / reverse alarm",
  "Windscreen / wipers",
  "Steps / handrails",
  "Guards / covers in place",
  "Cabin (clean/undamaged)",
  "Engine oil level",
  "Hydraulic oil level",
  "Coolant level",
  "Fuel level",
  "Air filter indicator",
  "Battery (condition/terminals)",
  "Tracks / undercarriage",
  "Bucket (teeth/cutting edge)",
  "Boom / stick / linkage pins",
  "Hydraulic hoses / fittings",
  "Slew ring / bearing",
  "Swing mechanism",
  "Exhaust system",
  "Instruments / gauges",
  "Controls (levers/pedals)",
  "Brakes (service/park)",
  "Steering",
  "Tyres / wheels (if applicable)",
  "Grease points",
  "No leaks (oil/fuel/coolant)",
  "Loader arms / linkage",
  "Quick hitch (if fitted)",
  "Attachments secure",
] as const

export const excavatorHarvesterItems = [
  "Fire extinguisher (serviced/sealed)",
  "First aid kit",
  "Seat belt",
  "Mirrors",
  "Lights (head/tail/work)",
  "Horn / reverse alarm",
  "Windscreen / wipers",
  "Steps / handrails",
  "Guards / covers in place",
  "Cabin (clean/undamaged)",
  "Engine oil level",
  "Hydraulic oil level",
  "Coolant level",
  "Fuel level",
  "Air filter indicator",
  "Battery (condition/terminals)",
  "Tracks / undercarriage",
  "Boom / stick / linkage pins",
  "Hydraulic hoses / fittings",
  "Slew ring / bearing",
  "Swing mechanism",
  "Exhaust system",
  "Instruments / gauges",
  "Controls (levers/pedals)",
  "Brakes (service/park)",
  "Steering",
  "Grease points",
  "No leaks (oil/fuel/coolant)",
  "Harvester head condition",
  "Feed rollers",
  "Delimbing knives",
  "Measuring system calibration",
  "Saw bar / chain condition",
  "Rotator / tilt function",
  "Hose routing on boom",
  "Computer / display functional",
] as const

// ============================================
// TYPE HELPERS
// ============================================
// Extract the items array type
export type LightDeliveryItem = typeof lightDeliveryItems[number]
export type ExcavatorLoaderItem = typeof excavatorLoaderItems[number]
export type ExcavatorHarvesterItem = typeof excavatorHarvesterItems[number]

// Map form type to its items type
export type FormItemsMap = {
  'light-delivery': LightDeliveryItem
  'excavator-loader': ExcavatorLoaderItem
  'excavator-harvester': ExcavatorHarvesterItem
}

// Map form type to its data type
export type FormDataMap = {
  'light-delivery': LightDeliveryFormData
  'excavator-loader': ExcavatorLoaderFormData
  'excavator-harvester': ExcavatorHarvesterFormData
}

// ============================================
// FORM CONFIGURATION
// ============================================
export interface FormConfig {
  type: FormType
  title: string
  description: string
  items: readonly string[]
}

export const formConfigs: Record<FormType, FormConfig> = {
  'light-delivery': {
    type: 'light-delivery',
    title: 'Light Delivery Vehicle Daily Checklist',
    description: 'Complete your daily light delivery vehicle inspection checklist.',
    items: lightDeliveryItems
  },
  'excavator-loader': {
    type: 'excavator-loader',
    title: 'Excavator Loader Pre-Shift Inspection',
    description: 'Complete your pre-shift excavator loader inspection checklist.',
    items: excavatorLoaderItems
  },
  'excavator-harvester': {
    type: 'excavator-harvester',
    title: 'Excavator Harvester Pre-Shift Inspection',
    description: 'Complete your pre-shift excavator harvester inspection checklist.',
    items: excavatorHarvesterItems
  }
}

// ============================================
// UTILITY FUNCTIONS (Type Guards)
// ============================================
export function isLightDeliveryFormData(data: FormDataUnion): data is LightDeliveryFormData {
  return (data as LightDeliveryFormData).vehicleRegistration !== undefined
}

export function isExcavatorLoaderFormData(data: FormDataUnion): data is ExcavatorLoaderFormData {
  return (data as ExcavatorLoaderFormData).unitNumber !== undefined && 
         (data as ExcavatorLoaderFormData).hourMeterStart !== undefined
}

export function isExcavatorHarvesterFormData(data: FormDataUnion): data is ExcavatorHarvesterFormData {
  return (data as ExcavatorHarvesterFormData).unitNumber !== undefined && 
         (data as ExcavatorHarvesterFormData).hourMeterStart !== undefined
}

// Get form title from form type
export function getFormTitle(type: FormType): string {
  return formConfigs[type].title
}

// Get form description from form type
export function getFormDescription(type: FormType): string {
  return formConfigs[type].description
}

// Get form items from form type
export function getFormItems(type: FormType): readonly string[] {
  return formConfigs[type].items
}