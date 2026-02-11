import { NextResponse } from "next/server";
import { addSubmission, getSubmissions } from "@/lib/submissions"; // ✅ MUST be the same
import type { Submission } from "@/lib/types";

export async function GET() {
  const submissions = getSubmissions();
  return NextResponse.json(submissions);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const submission: Submission = {
      id: crypto.randomUUID(),
      formType: body.formType,
      formTitle: body.formTitle,
      submittedBy: body.submittedBy,
      submittedAt: new Date().toISOString(),
      data: body.data,
      hasDefects: body.hasDefects || false,
    };

    addSubmission(submission); // ✅ This adds to the SAME array

    return NextResponse.json({ success: true, id: submission.id }, { status: 201 });
  } catch (error) {
    console.error("Failed to submit form:", error);
    return NextResponse.json({ error: "Failed to submit form" }, { status: 500 });
  }
}