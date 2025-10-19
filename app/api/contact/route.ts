import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validation';
import { sanitizeInput, validateEmail, rateLimitCheck } from '@/lib/security';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    if (!rateLimitCheck(clientIP, 5, 300000)) { // 5 requests per 5 minutes
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    }

    const body = await request.json();
    
    // Validate input
    const validatedData = contactFormSchema.parse(body);
    
    // Additional validation
    if (!validateEmail(validatedData.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(validatedData.name),
      email: sanitizeInput(validatedData.email),
      subject: sanitizeInput(validatedData.subject),
      message: sanitizeInput(validatedData.message)
    };

    // TODO: Send email using your preferred email service
    // For now, just log the data
    console.log('Contact form submission:', sanitizedData);

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid form data' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
