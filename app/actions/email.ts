'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendAuditEmail(formData: {
    name: string;
    business?: string;
    website: string;
    phone: string;
    industry?: string;
}) {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Mutant Audit Funnel <onboarding@resend.dev>',
            to: ['prince.khimani@mutanttechnologies.com'], // Using a likely email based on directory name
            subject: `New Website Audit Request: ${formData.name}`,
            html: `
                <div style="font-family: sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: #E8281A;">New Audit Request</h2>
                    <p><strong>Name:</strong> ${formData.name}</p>
                    <p><strong>Business:</strong> ${formData.business || 'N/A'}</p>
                    <p><strong>Website:</strong> <a href="${formData.website}">${formData.website}</a></p>
                    <p><strong>WhatsApp:</strong> ${formData.phone}</p>
                    <p><strong>Industry:</strong> ${formData.industry || 'N/A'}</p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p style="font-size: 12px; color: #999;">This lead was captured via the Website Audit Funnel.</p>
                </div>
            `,
        });

        if (error) {
            console.error('Resend Error:', error);
            return { success: false, error };
        }

        return { success: true, data };
    } catch (err) {
        console.error('Email Action Error:', err);
        return { success: false, error: err };
    }
}
