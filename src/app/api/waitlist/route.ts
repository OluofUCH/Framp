import { NextResponse } from "next/server";
import { Resend } from "resend";
import crypto from "crypto";
import { NextRequest } from 'next/server';

// API configuration
const API_URL = 'https://framp-backend.vercel.app/api/waitlist';
const API_KEY = 'framp_6565fde02c6f0f3b052cf3b02daaea77cf8bd71247b0dae5939c3f7a9272af6f';

// Initialize Resend when function is called
const getResend = () => {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    throw new Error("Resend API key must be provided");
  }
  return new Resend(resendApiKey);
};

function generateToken(email: string) {
  return crypto.createHash("sha256").update(email).digest("hex");
}

// GET: Fetch waitlist entries with optional filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'created_at';
    const order = searchParams.get('order') || 'desc';
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '50';

    // Construct query parameters
    const queryParams = new URLSearchParams({
      status: status || '',
      search: search || '',
      sort,
      order,
      page,
      limit
    }).toString();

    const response = await fetch(`${API_URL}?${queryParams}`, {
      headers: {
        'x-frontend-key': API_KEY
      }
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.error || 'Failed to fetch waitlist data' }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}

// PATCH: Update waitlist entry status
export async function PATCH(request: NextRequest) {
  try {
    const { ids, status } = await request.json();

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'Invalid or missing ids' }, { status: 400 });
    }

    if (!status || !['pending', 'confirmed'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status value' }, { status: 400 });
    }

    const response = await fetch(API_URL, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-frontend-key': API_KEY
      },
      body: JSON.stringify({ ids, status })
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.error || 'Failed to update waitlist entries' }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}

// POST: Add new waitlist entry
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, wallet, referral } = body;

    // Input validation
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email is required" },
        { status: 400 }
      );
    }

    // Send data to API
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-frontend-key': API_KEY
      },
      body: JSON.stringify({
        email,
        name: name || null,
        wallet: wallet || null,
        referral: referral || null,
        status: "pending",
        created_at: new Date().toISOString(),
      })
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle specific error cases
      if (response.status === 400 && data.error?.includes('already')) {
        return NextResponse.json(
          { error: "This email is already on our waitlist." },
          { status: 400 }
        );
      }
      
      return NextResponse.json(
        { error: data.error || "Failed to save waitlist data" },
        { status: response.status }
      );
    }

    // Send confirmation email
    try {
      const token = generateToken(email);
      const confirmUrl = `${process.env.NEXT_PUBLIC_FRAMP_BASE_URL}/api/confirm?token=${token}`;

      const resend = getResend();
      await resend.emails.send({
        from: "Framp <hello@framp.xyz>",
        to: email,
        subject: "Confirm your Framp waitlist signup",
        html: `
        <!doctype html>
        <!-- ... (email template HTML remains the same) ... -->
        `,
      });
    } catch (emailError) {
      console.error("Failed to send confirmation email", emailError);
      // Continue with success response even if email fails
    }

    return NextResponse.json({
      message: "Waitlist signup received. Please check your email!",
      success: true,
    });
  } catch (error) {
    console.error("Waitlist API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}