import { NextResponse } from "next/server";
import { cookies } from 'next/headers';
import { addSubmission, getSubmissions } from "@/lib/submissions";
import type { Submission } from "@/lib/types";
import { deleteSubmission } from '@/lib/submissions';

// Allowed brand values
const ALLOWED_BRANDS = ['ringomode', 'cintasign'] as const;

export async function GET() {
  try {
    const submissions = await getSubmissions();
    return NextResponse.json(submissions);
  } catch (error) {
    console.error("GET /api/submissions error:", error);
    return NextResponse.json(
      { error: "Failed to fetch submissions", details: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await deleteSubmission(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/submissions/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to delete submission' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Get brand from request body first, then from cookie, then default to 'ringomode'
    const cookieStore = await cookies(); // await because cookies() is async in Next.js 15
    const brandCookie = cookieStore.get('brand')?.value;
    
    // Determine brand and validate
    let brand = body.brand || brandCookie || 'ringomode';
    // Ensure brand is one of the allowed values
    if (!ALLOWED_BRANDS.includes(brand as any)) {
      brand = 'ringomode';
    }

    // Validate required fields
    if (!body.formType || !body.formTitle || !body.submittedBy) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Ensure data is an object
    const data = typeof body.data === 'object' && body.data !== null ? body.data : {};

    const submission: Submission = {
      id: crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      formType: body.formType,
      formTitle: body.formTitle,
      submittedBy: body.submittedBy,
      submittedAt: new Date().toISOString(),
      data,
      hasDefects: body.hasDefects || false,
      brand: brand as 'ringomode' | 'cintasign', // safe after validation
    };

    await addSubmission(submission);

    return NextResponse.json({ success: true, id: submission.id }, { status: 201 });
  } catch (error) {
    console.error("POST /api/submissions error:", error);
    return NextResponse.json(
      { error: "Failed to submit form", details: String(error) },
      { status: 500 }
    );
  }
}