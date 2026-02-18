"use server";

import twilio from "twilio";

export async function sendWhatsAppNotification(data: {
    name: string;
    business?: string;
    website: string;
    phone: string;
    industry?: string;
    lead_type: 'audit' | 'blueprint';
}) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER;
    const toNumber = process.env.MY_WHATSAPP_NUMBER;

    console.log("--- WhatsApp Action Triggered ---");
    console.log("Config check:", {
        hasSid: !!accountSid,
        hasToken: !!authToken,
        from: fromNumber,
        to: toNumber
    });

    if (!accountSid || !authToken || !fromNumber || !toNumber) {
        console.error("❌ Twilio credentials missing in environment variables");
        return { success: false, error: "Twilio credentials missing" };
    }

    const { name, business, website, phone, industry, lead_type } = data;
    const isBlueprint = lead_type === 'blueprint';

    const message = `*New Funnel Lead Capture* 🚀\n\n` +
        `*Type:* ${isBlueprint ? 'Project Blueprint' : 'Website Audit'}\n` +
        `*Name:* ${name}\n` +
        `${business ? `*Business:* ${business}\n` : ''}` +
        `*${isBlueprint ? 'Objective' : 'Website'}:* ${website}\n` +
        `*WhatsApp:* ${phone}\n` +
        `${industry ? `*Industry:* ${industry}` : ''}`;

    try {
        const client = twilio(accountSid, authToken);
        const result = await client.messages.create({
            body: message,
            from: fromNumber,
            to: toNumber
        });
        console.log("✅ WhatsApp sent successfully. SID:", result.sid);
        return { success: true, sid: result.sid };
    } catch (error: any) {
        console.error("❌ WhatsApp Action Error:", error.message || error);
        return { success: false, error: error.message || "Unknown error" };
    }
}
