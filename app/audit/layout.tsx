import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free Website Audit — Mutant Technologies",
    description:
        "Your website is costing you business. We rebuild slow, outdated websites into fast, secure, lead-generating machines in 30–45 days. Get your free audit now.",
};

export default function AuditLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
