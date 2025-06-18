// app/api/sendEmail/route.js

import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import EmailTemplate from '@/emails';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const response = await req.json();
  const result = response.data;

  try {
    const data = await resend.emails.send({
      from: 'Doctor-Appointment-Booking@tubeguruji-app.tubeguruji.com',
      to: [result.Email],
      subject: 'Appointment Booking Confirmation',
      react: EmailTemplate({
        userFirstname: result.Name,
        doctorName: result.DoctorName,
        appointmentDate: result.Date,
      }),
    });

    return NextResponse.json({ data: "Email Sent!" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
