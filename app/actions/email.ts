'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendAuditEmail(formData: {
    name: string;
    business?: string;
    website: string;
    phone: string;
    industry?: string;
    mode?: 'audit' | 'new-project';
}) {
    try {
        const isBlueprint = formData.mode === 'new-project';
        const subject = isBlueprint
            ? `New Project Blueprint Request: ${formData.name}`
            : `New Website Audit Request: ${formData.name}`;

        const { data, error } = await resend.emails.send({
            from: 'Mutant Service <onboarding@resend.dev>',
            to: ['prince@mutanttechnologies.com'],
            subject: subject,
            html: `
                <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eee; border-radius: 12px;">
                    <h2 style="color: ${isBlueprint ? '#3151b5' : '#E8281A'}; margin-top: 0;">
                        ${isBlueprint ? 'New Project Blueprint Request' : 'New Website Audit Request'}
                    </h2>
                    <p style="font-size: 16px; margin: 20px 0;">A new lead has been captured through the funnel.</p>
                    
                    <div style="background: #fdfdfd; padding: 20px; border-radius: 8px; border-left: 4px solid ${isBlueprint ? '#3151b5' : '#E8281A'};">
                        <p style="margin: 8px 0;"><strong>Name:</strong> ${formData.name}</p>
                        <p style="margin: 8px 0;"><strong>Business:</strong> ${formData.business || 'N/A'}</p>
                        <p style="margin: 8px 0;"><strong>${isBlueprint ? 'Project Objective' : 'Website'}:</strong> 
                            ${isBlueprint ? formData.website : `<a href="${formData.website}" style="color: #3151b5;">${formData.website}</a>`}
                        </p>
                        <p style="margin: 8px 0;"><strong>WhatsApp/Phone:</strong> <a href="https://wa.me/${formData.phone.replace(/\D/g, '')}" style="color: #3151b5;">${formData.phone}</a></p>
                        <p style="margin: 8px 0;"><strong>Industry:</strong> ${formData.industry || 'N/A'}</p>
                    </div>
                    
                    <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
                    <p style="font-size: 12px; color: #999; text-align: center;">
                        Automated lead notification from the <strong>${isBlueprint ? 'Project Blueprint' : 'Website Audit'}</strong> channel.
                    </p>
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
