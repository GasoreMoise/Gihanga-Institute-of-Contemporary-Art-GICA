import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with null check
const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY environment variable is not set');
    return null;
  }
  return new Resend(apiKey);
};

// GET endpoint for testing
export async function GET(request: NextRequest) {
  return NextResponse.json({
    apiKeySet: !!process.env.RESEND_API_KEY,
    apiKeyFormat: process.env.RESEND_API_KEY?.startsWith('re_'),
    apiKeyLength: process.env.RESEND_API_KEY?.length || 0,
  });
}

export async function POST(request: NextRequest) {
  try {
    // Check if API key is set
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Check if API key is valid format
    if (!process.env.RESEND_API_KEY.startsWith('re_')) {
      console.error('Invalid API key format. Should start with re_');
      return NextResponse.json(
        { error: 'Invalid email configuration' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { name, email, message, type = 'contact' } = body;

    // Validate required fields
    if (!email || (!message && type === 'contact')) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const resend = getResend();
    if (!resend) {
      return NextResponse.json(
        { error: 'Email service not configured. Please set RESEND_API_KEY' },
        { status: 500 }
      );
    }

    // Send email based on type
    if (type === 'contact') {
      // Contact form submission
      const { data, error } = await resend.emails.send({
        from: 'GICA Contact <onboarding@resend.dev>',
        to: 'gasorenshuti34@gmail.com',
        subject: `Contact Form: ${name || 'Anonymous'}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name || 'Not provided'}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
        replyTo: email,
      });

      if (error) {
        console.error('Resend error:', error);
        return NextResponse.json(
          { error: `Failed to send email: ${error.message || JSON.stringify(error)}` },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true, data });
    } else if (type === 'newsletter') {
      // Newsletter subscription
      const { data, error } = await resend.emails.send({
        from: 'GICA Newsletter <onboarding@resend.dev>',
        to: 'gasorenshuti34@gmail.com',
        subject: 'Newsletter Subscription',
        html: `
          <h2>New Newsletter Subscription</h2>
          <p><strong>Email:</strong> ${email}</p>
        `,
      });

      if (error) {
        console.error('Resend error:', error);
        return NextResponse.json(
          { error: 'Failed to subscribe' },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true, data });
    }

    return NextResponse.json(
      { error: 'Invalid request type' },
      { status: 400 }
    );
  } catch (error) {
    console.error('API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error details:', errorMessage);
    return NextResponse.json(
      { error: `Internal server error: ${errorMessage}` },
      { status: 500 }
    );
  }
}
