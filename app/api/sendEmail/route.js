import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import EmailTemplate from '@/emails';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const result = await req.json();

  const {
    UserName,
    Email,
    DoctorName,
    Date: appointmentDate, // ✅ Rename to avoid conflict
  } = result.data;

  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: Email,
      subject: 'Appointment Booking Confirmation',
      react: EmailTemplate({
        userFirstname: UserName,
        doctorName: DoctorName,
        appointmentDate: new Date(appointmentDate).toDateString(), // ✅ Now safe
      }),
    });

    console.log('✅ Email sent:', data);
    return NextResponse.json({ data: 'Email Sent!' });
  } catch (error) {
    console.error('❌ Resend error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
