"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
    ArrowRight,
    Check,
    Search,
    MessageCircle,
    Clock,
    ShieldAlert,
    TrendingDown,
    DollarSign,
    Smartphone,
    Settings,
    Users,
    AlertTriangle,
    Wrench,
    Star,
    ImageIcon,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { sendAuditEmail } from "@/app/actions/email";
import { sendWhatsAppNotification } from "@/app/actions/whatsapp";

// Facebook Pixel type declaration
declare global {
    interface Window {
        fbq: (...args: unknown[]) => void;
    }
}


/* ─── reveal animation ─── */
function Reveal({
    children,
    className,
    delay = 0,
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/* ─── pain data ─── */
const PAINS = [
    {
        icon: <Clock className="w-6 h-6" />,
        title: "Loading Too Slow",
        desc: "53% of mobile visitors leave if a page takes more than 3 seconds. Your slow site is an invisible wall between you and revenue.",
    },
    {
        icon: <ShieldAlert className="w-6 h-6" />,
        title: "Security Gaps",
        desc: "Old WordPress plugins are open doors for hackers. One breach destroys trust overnight.",
    },
    {
        icon: <TrendingDown className="w-6 h-6" />,
        title: "Falling in Google",
        desc: "Google penalises slow, clunky sites. Your competitors are climbing while you drop.",
    },
    {
        icon: <DollarSign className="w-6 h-6" />,
        title: "Wasting Ad Budget",
        desc: "You're paying for traffic and sending it to a site that doesn't convert. That's money in the drain.",
    },
    {
        icon: <Smartphone className="w-6 h-6" />,
        title: "Broken on Mobile",
        desc: "Over 70% of your visitors are on phones. If your site fails on mobile, you lose most of them.",
    },
    {
        icon: <Settings className="w-6 h-6" />,
        title: "Can't Scale",
        desc: "Old tech stacks break under pressure. Every new feature costs double and takes twice as long.",
    },
];

/* ─── cost data ─── */
const COSTS = [
    {
        icon: <Users className="w-5 h-5" />,
        num: "01",
        title: "Leads Going to Competitors",
        desc: "Your competitor's faster site is converting the people you paid to attract.",
    },
    {
        icon: <TrendingDown className="w-5 h-5" />,
        num: "02",
        title: "SEO Rankings Dropping",
        desc: "Google demotes slow and insecure sites. Recovery gets harder each month.",
    },
    {
        icon: <AlertTriangle className="w-5 h-5" />,
        num: "03",
        title: "One Hack Can End You",
        desc: "Outdated tech means one vulnerability from total disaster. The cost of recovery is massive.",
    },
    {
        icon: <Wrench className="w-5 h-5" />,
        num: "04",
        title: "Rebuilding Later Costs 2×",
        desc: "Technical debt compounds. Fixing a broken site in 12 months costs double what a clean rebuild costs today.",
    },
];

/* ─── offer items ─── */
const OFFER_ITEMS = [
    { title: "Full Performance Audit", desc: "Speed, SEO, security and conversion analysis" },
    { title: "Security Vulnerability Report", desc: "Every open door identified and documented" },
    { title: "Complete Next.js Rebuild", desc: "Modern, fast, secure codebase — zero WordPress risk" },
    { title: "Mobile-First UX Redesign", desc: "Built for the 70%+ visitors on phones" },
    { title: "SEO-Ready Architecture", desc: "Structured for Google to crawl, index and rank" },
    { title: "WhatsApp + Lead Funnel", desc: "Turn visitors into enquiries automatically" },
    { title: "30-Day Post-Launch Support", desc: "On call for a full month after go-live" },
];

const VALUE_STACK = [
    { label: "Performance Audit", price: "₹10,000" },
    { label: "Security Audit", price: "₹15,000" },
    { label: "UX Redesign", price: "₹25,000" },
    { label: "Modern Development", price: "₹60,000" },
    { label: "Speed Optimisation", price: "₹15,000" },
    { label: "Conversion Optimisation", price: "₹20,000" },
];

/* ─── evidence images (placeholder) ─── */
const EVIDENCE_ITEMS = [
    {
        label: "Slow Page Speed",
        caption: "A typical website scoring 20/100 on Google PageSpeed — losing visitors every second.",
        src: "/images/evidence-slow.png",
    },
    {
        label: "Website Hacked",
        caption: "A hacked WordPress site showing malware warnings — destroying customer trust instantly.",
        src: "/images/evidence-hacked.png",
    },
    {
        label: "Mobile Broken",
        caption: "Broken layout on mobile devices — 70% of your visitors see this mess.",
        src: "/images/evidence-mobile.png",
    },
];

/* ─── reviews data (placeholder) ─── */
const REVIEWS = [
    {
        name: "Rahul Mehta",
        role: "CEO, TechVentures",
        rating: 5,
        text: "Mutant Technologies completely transformed our website. Page speed went from 2.8s to under 1s. Our leads doubled within the first month.",
        // Replace with actual reviewer photo path, e.g. "/images/review-rahul.jpg"
        avatar: "",
        isNew: true,
    },
    {
        name: "Priya Sharma",
        role: "Founder, StyleHouse",
        rating: 5,
        text: "We were losing customers to a slow, outdated site. The rebuild was seamless — delivered in 35 days. Our conversion rate is up 3x. Best investment we've made.",
        avatar: "",
        isNew: false,
    },
    {
        name: "Amit Desai",
        role: "Director, GreenLeaf Exports",
        rating: 5,
        text: "Professional, fast, and the results speak for themselves. Our Google ranking improved within weeks of launch. The team is incredibly responsive.",
        avatar: "",
        isNew: true,
    },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━ PAGE ━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function Home() {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formMode, setFormMode] = useState<"audit" | "new-project">("audit");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const name = fd.get("name") as string;
        const business = fd.get("business") as string;
        const website = fd.get("website") as string;
        const phone = fd.get("phone") as string;
        const type = fd.get("type") as string;

        // Facebook Pixel — fire Lead event immediately on form submit
        if (typeof window !== "undefined" && window.fbq) {
            window.fbq("track", "Lead", {
                content_name: formMode === "audit" ? "Website Audit Request" : "Project Blueprint Request",
                content_category: type || "General",
            });
        }

        // 1. Save to Supabase
        const saveToSupabase = async () => {
            try {
                await supabase.from("audits").insert({
                    name,
                    business,
                    website: website || "N/A (New Project)",
                    phone,
                    industry: type,
                    lead_type: formMode === "audit" ? "audit" : "blueprint",
                    status: "new",
                    raw_data: { name, business, website, phone, type, mode: formMode },
                });
            } catch (error) {
                console.error("Supabase Error:", error);
            }
        };

        // 2. Send Email
        const sendEmail = async () => {
            try {
                await sendAuditEmail({
                    name,
                    business,
                    website: website || "N/A (New Project)",
                    phone,
                    industry: type,
                    mode: formMode,
                });
            } catch (error) {
                console.error("Email Error:", error);
            }
        };

        // 3. Send WhatsApp
        const sendWhatsApp = async () => {
            try {
                await sendWhatsAppNotification({
                    name,
                    business,
                    website: website || "N/A (New Project)",
                    phone,
                    industry: type,
                    lead_type: formMode === "audit" ? "audit" : "blueprint",
                });
            } catch (error) {
                console.error("WhatsApp Error:", error);
            }
        };

        saveToSupabase();
        sendEmail();
        sendWhatsApp();

        // Facebook Pixel — fire CompleteRegistration on success
        if (typeof window !== "undefined" && window.fbq) {
            window.fbq("track", "CompleteRegistration", {
                content_name: formMode === "audit" ? "Website Audit Request" : "Project Blueprint Request",
                status: "submitted",
            });
        }

        setFormSubmitted(true);
    };

    return (
        <main className="min-h-screen bg-[#f7f7f5] text-[#1a1a1a] font-[family-name:var(--font-poppins)] selection:bg-primary/20">

            {/* ─── 1. ANNOUNCEMENT BAR ─── */}
            <div className="bg-[#1a1a1a] text-white text-center py-3 px-4 text-xs sm:text-sm font-semibold tracking-wide">
                <span className="inline-flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                    </span>
                    Only 5 Free Audit Slots Available This Week
                </span>
            </div>

            {/* ─── 2. STICKY NAV ─── */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#e5e5e0] py-4">
                <div className="max-w-[960px] mx-auto px-6 flex items-center justify-between">
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/logo.png"
                            alt="Mutant Technologies"
                            width={300}
                            height={110}
                            className="h-[110px] w-auto object-contain"
                            priority
                        />
                    </Link>
                    <a
                        href="/#audit-form"
                        className="bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-md transition-colors"
                    >
                        GET FREE AUDIT →
                    </a>
                </div>
            </nav>

            {/* ─── 3. HERO SECTION ─── */}
            <section className="pt-24 pb-20 md:pt-32 md:pb-28">
                <div className="max-w-[960px] mx-auto px-6 text-center">
                    <Reveal>
                        <p className="text-sm font-semibold text-primary tracking-wide mb-6 uppercase">
                            Free Website Audit
                        </p>
                    </Reveal>
                    <Reveal delay={0.05}>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight text-[#1a1a1a]">
                            Your Website Is Costing
                            <br />
                            You Business Right Now
                        </h1>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <p className="mt-6 text-lg text-[#666] max-w-xl mx-auto leading-relaxed font-normal">
                            If your site is slow, outdated, or built on old tech — every
                            visitor you paid to bring there is quietly leaving. We rebuild
                            websites into fast, lead-generating machines in <strong className="text-[#1a1a1a]">30–45 days</strong>.
                        </p>
                    </Reveal>
                    <Reveal delay={0.15}>
                        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/#audit-form"
                                onClick={() => setFormMode("audit")}
                                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-md transition-colors"
                            >
                                Audit My Existing Site
                                <ArrowRight className="w-4 h-4" />
                            </a>
                            <a
                                href="/#audit-form"
                                onClick={() => setFormMode("new-project")}
                                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#f0f0ec] text-[#1a1a1a] font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-md border border-[#d4d4d0] transition-colors"
                            >
                                <Wrench className="w-4 h-4" />
                                Build a New Project
                            </a>
                        </div>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p className="mt-6 text-sm text-[#999] font-medium">
                            ⚡ 3 of 5 rebuild slots taken this week
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* ─── 4. PAIN SECTION ─── */}
            <section className="py-20 md:py-28 bg-white" id="pain">
                <div className="max-w-[960px] mx-auto px-6">
                    <Reveal>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">
                            The Hidden Problem
                        </p>
                    </Reveal>
                    <Reveal delay={0.05}>
                        <h2 className="text-3xl sm:text-4xl md:text-[44px] font-extrabold tracking-tight leading-tight text-[#1a1a1a] capitalize">
                            Your Website Looks Fine. It&apos;s Not.
                        </h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <p className="mt-4 text-[#888] max-w-lg text-base leading-relaxed">
                            Most business websites have serious problems hiding behind a
                            normal-looking surface. These problems silently drain your leads
                            and hurt your rankings.
                        </p>
                    </Reveal>

                    <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {PAINS.map((p, i) => (
                            <Reveal key={p.title} delay={i * 0.05}>
                                <div className="bg-[#f7f7f5] rounded-lg p-7 hover:bg-[#f0f0ec] transition-colors">
                                    <div className="text-primary mb-4">{p.icon}</div>
                                    <h3 className="font-bold text-base mb-2 text-[#1a1a1a]">
                                        {p.title}
                                    </h3>
                                    <p className="text-sm text-[#888] leading-relaxed">{p.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    <Reveal delay={0.2}>
                        <blockquote className="mt-16 border-l-4 border-primary pl-6 py-2 text-lg md:text-xl font-medium text-[#555] italic leading-relaxed max-w-2xl">
                            &ldquo;You&apos;re running ads and doing SEO — but sending that
                            traffic to a leaking bucket. Fix the bucket first.&rdquo;
                        </blockquote>
                    </Reveal>
                </div>
            </section>

            {/* ─── VISUAL EVIDENCE ─── */}
            <section className="py-20 md:py-28" id="evidence">
                <div className="max-w-[960px] mx-auto px-6">
                    <Reveal>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4 text-center">
                            See the Problem
                        </p>
                    </Reveal>
                    <Reveal delay={0.05}>
                        <h2 className="text-3xl sm:text-4xl md:text-[44px] font-extrabold tracking-tight leading-tight text-[#1a1a1a] text-center capitalize mb-16">
                            This Is What&apos;s Happening to Your Website
                        </h2>
                    </Reveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {EVIDENCE_ITEMS.map((item, i) => (
                            <Reveal key={item.label} delay={i * 0.08}>
                                <div className="group">
                                    {/* Image container */}
                                    <div className="relative aspect-[4/3] bg-[#eeeee9] rounded-xl overflow-hidden border border-[#e5e5e0] mb-4">
                                        {item.src ? (
                                            <Image
                                                src={item.src}
                                                alt={item.label}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            /* Placeholder state */
                                            <div className="absolute inset-0 flex flex-col items-center justify-center text-[#ccc]">
                                                <ImageIcon className="w-10 h-10 mb-2" />
                                                <p className="text-xs font-medium text-[#bbb]">Add your image</p>
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="font-bold text-sm text-[#1a1a1a] mb-1">
                                        {item.label}
                                    </h3>
                                    <p className="text-xs text-[#999] leading-relaxed">
                                        {item.caption}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── 5. COST OF INACTION ─── */}
            <section className="py-20 md:py-28 bg-white" id="cost">
                <div className="max-w-[960px] mx-auto px-6">
                    <Reveal>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">
                            The Cost of Waiting
                        </p>
                    </Reveal>
                    <Reveal delay={0.05}>
                        <h2 className="text-3xl sm:text-4xl md:text-[44px] font-extrabold tracking-tight leading-tight text-[#1a1a1a] capitalize">
                            Every Month You Don&apos;t Fix This,
                            <br className="hidden md:block" /> You&apos;re Paying for It
                        </h2>
                    </Reveal>

                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {COSTS.map((c, i) => (
                            <Reveal key={c.num} delay={i * 0.06}>
                                <div className="h-full bg-[#f7f7f5] rounded-lg p-8 border-2 border-transparent hover:border-primary transition-all duration-200 relative overflow-hidden">
                                    <span className="absolute top-4 right-6 text-6xl font-black text-primary/20 select-none leading-none">
                                        {c.num}
                                    </span>
                                    <div className="text-primary mb-3">{c.icon}</div>
                                    <h3 className="font-bold text-base mb-2 text-[#1a1a1a]">
                                        {c.title}
                                    </h3>
                                    <p className="text-sm text-[#888] leading-relaxed">{c.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── 6. SOLUTION SECTION ─── */}
            <section className="py-20 md:py-28 bg-white" id="solution">
                <div className="max-w-[960px] mx-auto px-6">
                    <Reveal>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">
                            The Fix
                        </p>
                    </Reveal>
                    <Reveal delay={0.05}>
                        <h2 className="text-3xl sm:text-4xl md:text-[44px] font-extrabold tracking-tight leading-tight text-[#1a1a1a] capitalize mb-4">
                            We Rebuild It. You Get Results.
                        </h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <p className="text-[#888] text-base max-w-lg mb-14">
                            Not a redesign — a complete rebuild on modern tech. Delivered in 30–45 days.
                        </p>
                    </Reveal>

                    {/* Simple two-column checklist — no boxes */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16">
                        {[
                            { title: "Modern Stack", desc: "Next.js, React & TypeScript" },
                            { title: "Under 2s Load", desc: "Blazing fast on every device" },
                            { title: "Secure by Default", desc: "No plugins, no vulnerabilities" },
                            { title: "Mobile-First", desc: "Built for the 70% on phones" },
                            { title: "SEO-Ready", desc: "Structured for Google rankings" },
                            { title: "Scales Easily", desc: "Grow without breaking things" },
                        ].map((item, i) => (
                            <Reveal key={item.title} delay={item.title === "Modern Stack" ? 0 : 0.04}>
                                <div className="flex items-start gap-4 py-5 border-b border-[#eeeee9]">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Check className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-[15px] text-[#1a1a1a]">{item.title}</p>
                                        <p className="text-sm text-[#999] mt-0.5">{item.desc}</p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    <Reveal delay={0.3}>
                        <div className="mt-12 inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-md">
                            Delivery: 30–45 Days
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ─── 7. OFFER BOX ─── */}
            <section className="py-20 md:py-28" id="offer">
                <div className="max-w-[960px] mx-auto px-6">
                    <Reveal>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4 text-center">
                            What You Get
                        </p>
                    </Reveal>
                    <Reveal delay={0.05}>
                        <h2 className="text-3xl sm:text-4xl md:text-[44px] font-extrabold tracking-tight leading-tight text-[#1a1a1a] text-center mb-16 capitalize">
                            The Website Upgrade Growth System
                        </h2>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <div className="bg-white rounded-xl border border-[#e5e5e0] overflow-hidden">
                            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr]">
                                {/* left */}
                                <div className="p-8 md:p-10 lg:border-r border-[#f0f0ec]">
                                    <h3 className="font-bold text-lg mb-8 text-[#1a1a1a] capitalize">
                                        Everything Included
                                    </h3>
                                    {OFFER_ITEMS.map((item) => (
                                        <div
                                            key={item.title}
                                            className="flex gap-3 py-4 border-b border-[#f0f0ec] last:border-0"
                                        >
                                            <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p className="font-semibold text-sm text-[#1a1a1a]">
                                                    {item.title}
                                                </p>
                                                <p className="text-xs text-[#999] mt-0.5">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* right */}
                                <div className="p-8 md:p-10 flex flex-col justify-center">
                                    <h3 className="font-semibold text-sm text-[#999] uppercase tracking-wider mb-6">
                                        Total Value
                                    </h3>

                                    {VALUE_STACK.map((v) => (
                                        <div
                                            key={v.label}
                                            className="flex justify-between items-center py-2 text-sm"
                                        >
                                            <span className="text-[#888]">{v.label}</span>
                                            <span className="line-through text-[#ccc]">{v.price}</span>
                                        </div>
                                    ))}

                                    <div className="flex justify-between items-center pt-4 mt-3 border-t border-[#e5e5e0]">
                                        <span className="font-bold text-base text-[#1a1a1a]">Total</span>
                                        <span className="line-through text-[#bbb] text-lg font-semibold">
                                            ₹1,45,000+
                                        </span>
                                    </div>

                                    <div className="mt-8 text-center bg-[#f7f7f5] rounded-lg p-6">
                                        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#999] mb-1">
                                            You Pay Today
                                        </p>
                                        <p className="text-5xl font-black text-green-600 leading-none">
                                            ₹0
                                        </p>
                                        <p className="text-sm font-semibold text-primary mt-2">
                                            Free Audit + Strategy Call
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-[#f0f0ec] px-8 py-5 text-center text-sm text-[#999]">
                                No cost. No obligation. We analyse your website and hand you the
                                full report — whether you work with us or not.
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ─── REVIEWS SECTION ─── */}
            <section className="py-20 md:py-28 bg-white overflow-hidden" id="reviews">
                <div className="max-w-[960px] mx-auto px-6">
                    <Reveal>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4 text-center">
                            What Our Clients Say
                        </p>
                    </Reveal>
                    <Reveal delay={0.05}>
                        <h2 className="text-3xl sm:text-4xl md:text-[44px] font-extrabold tracking-tight leading-tight text-[#1a1a1a] text-center capitalize mb-16">
                            Real Results from Real Businesses
                        </h2>
                    </Reveal>

                    {/* Scattered / tilted review cards */}
                    <div className="relative max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
                            {REVIEWS.map((review, i) => {
                                const rotations = ['-rotate-2', 'rotate-1', '-rotate-1'];
                                const offsets = ['md:translate-y-4', 'md:-translate-y-2', 'md:translate-y-6'];
                                return (
                                    <Reveal key={review.name} delay={i * 0.1}>
                                        <div
                                            className={`bg-white rounded-xl border border-[#e5e5e0] p-6 shadow-[0_2px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-all duration-300 ${rotations[i]} ${offsets[i]} hover:rotate-0 hover:translate-y-0 hover:scale-[1.02]`}
                                        >
                                            {/* Header: avatar + name + NEW badge */}
                                            <div className="flex items-start gap-3 mb-3">
                                                <div className="w-10 h-10 rounded-full bg-[#f0f0ec] flex items-center justify-center flex-shrink-0 overflow-hidden">
                                                    {review.avatar ? (
                                                        <Image
                                                            src={review.avatar}
                                                            alt={review.name}
                                                            width={40}
                                                            height={40}
                                                            className="object-cover"
                                                        />
                                                    ) : (
                                                        <span className="text-sm font-bold text-primary">
                                                            {review.name.charAt(0)}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-bold text-sm text-[#1a1a1a] truncate">
                                                            {review.name}
                                                        </p>
                                                        {review.isNew && (
                                                            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#f0f0ec] text-[#888] px-1.5 py-0.5 rounded">
                                                                New
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-[11px] text-[#aaa]">
                                                        {review.role}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Stars */}
                                            <div className="flex gap-0.5 mb-3">
                                                {Array.from({ length: review.rating }).map((_, si) => (
                                                    <Star key={si} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                                ))}
                                            </div>

                                            {/* Review text */}
                                            <p className="text-sm text-[#555] leading-relaxed">
                                                {review.text}
                                            </p>
                                        </div>
                                    </Reveal>
                                );
                            })}
                        </div>
                    </div>

                    {/* Disclaimer */}
                    <Reveal delay={0.35}>
                        <p className="mt-16 text-xs text-[#bbb] text-center max-w-2xl mx-auto leading-relaxed italic">
                            Individual experiences presented here may not be typical. Their background, effort, and application affected their experience. Results may vary.
                        </p>
                    </Reveal>
                </div>
            </section>

            <section className="py-24 md:py-32 bg-white scroll-mt-24" id="audit-form">
                <div className="max-w-[960px] mx-auto px-6">
                    <Reveal>
                        <p className="text-[13px] font-bold uppercase tracking-[0.3em] text-[#FF6B00] mb-5 text-center">
                            Get Started
                        </p>
                    </Reveal>
                    <Reveal delay={0.05}>
                        <h2 className="text-4xl sm:text-5xl md:text-[56px] font-extrabold tracking-tight leading-[1.1] text-[#1a1a1a] text-center mb-6">
                            {formMode === "audit"
                                ? "We'll Audit Your Website For Free"
                                : "Get Your Free Project Blueprint"}
                        </h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <p className="text-[#666] text-center text-lg leading-relaxed max-w-2xl mx-auto mb-12">
                            {formMode === "audit"
                                ? "Fill in your details and we'll send you a complete performance + security report within 48 hours."
                                : "Starting a new business? Tell us your vision and we'll send you a custom roadmap and tech stack proposal within 48 hours."}
                        </p>
                    </Reveal>

                    <Reveal delay={0.15}>
                        <div className="max-w-xl mx-auto">
                            {/* Mode Toggle */}
                            <div className="flex bg-[#f0f0ec] p-1 rounded-xl mb-10 w-fit mx-auto">
                                <button
                                    onClick={() => setFormMode("audit")}
                                    className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${formMode === "audit" ? "bg-white text-[#1a1a1a] shadow-sm" : "text-[#999] hover:text-[#666]"}`}
                                >
                                    I Have a Site
                                </button>
                                <button
                                    onClick={() => setFormMode("new-project")}
                                    className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${formMode === "new-project" ? "bg-white text-[#1a1a1a] shadow-sm" : "text-[#999] hover:text-[#666]"}`}
                                >
                                    I Need a New Site
                                </button>
                            </div>

                            {!formSubmitted ? (
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <FormField label="Your Name" required>
                                        <input
                                            name="name"
                                            type="text"
                                            required
                                            placeholder="e.g. Rahul Sharma"
                                            className="w-full bg-[#fdfdfd] border border-[#eee] rounded-xl px-6 py-5 text-base text-[#1a1a1a] placeholder:text-[#ccc] focus:outline-none focus:border-[#FF6B00] transition-colors shadow-sm"
                                        />
                                    </FormField>

                                    <FormField label="Business Name">
                                        <input
                                            name="business"
                                            type="text"
                                            placeholder="e.g. Sharma Electronics"
                                            className="w-full bg-[#fdfdfd] border border-[#eee] rounded-xl px-6 py-5 text-base text-[#1a1a1a] placeholder:text-[#ccc] focus:outline-none focus:border-[#FF6B00] transition-colors shadow-sm"
                                        />
                                    </FormField>

                                    <FormField label={formMode === "audit" ? "Your Website URL" : "Project Objective"} required>
                                        <input
                                            name="website"
                                            type="text"
                                            required
                                            placeholder={formMode === "audit" ? "e.g. www.yourwebsite.com" : "e.g. E-commerce brand for organic skin care"}
                                            className="w-full bg-[#fdfdfd] border border-[#eee] rounded-xl px-6 py-5 text-base text-[#1a1a1a] placeholder:text-[#ccc] focus:outline-none focus:border-[#FF6B00] transition-colors shadow-sm"
                                        />
                                    </FormField>

                                    <FormField label="WhatsApp Number" required>
                                        <input
                                            name="phone"
                                            type="tel"
                                            required
                                            placeholder="e.g. 9879846695"
                                            className="w-full bg-[#fdfdfd] border border-[#eee] rounded-xl px-6 py-5 text-base text-[#1a1a1a] placeholder:text-[#ccc] focus:outline-none focus:border-[#FF6B00] transition-colors shadow-sm"
                                        />
                                    </FormField>

                                    <FormField label="Business Type">
                                        <select
                                            name="type"
                                            defaultValue=""
                                            className="w-full bg-[#fdfdfd] border border-[#eee] rounded-xl px-6 py-5 text-base text-[#1a1a1a] focus:outline-none focus:border-[#FF6B00] transition-colors appearance-none shadow-sm"
                                            style={{
                                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23999' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                                                backgroundRepeat: "no-repeat",
                                                backgroundPosition: "right 24px center",
                                            }}
                                        >
                                            <option value="" disabled>
                                                Select your industry
                                            </option>
                                            <option>E-commerce</option>
                                            <option>Professional Services</option>
                                            <option>Healthcare</option>
                                            <option>Real Estate</option>
                                            <option>Manufacturing / B2B</option>
                                            <option>Hospitality</option>
                                            <option>Education</option>
                                            <option>New Startup / Venture</option>
                                            <option>Personal Brand</option>
                                            <option>Other</option>
                                        </select>
                                    </FormField>

                                    <button
                                        type="submit"
                                        className="w-full bg-primary hover:bg-primary-hover text-white font-bold text-sm uppercase tracking-wider py-4 rounded-lg transition-colors mt-2 flex items-center justify-center gap-2"
                                    >
                                        {formMode === "audit" ? <Search className="w-4 h-4" /> : <Wrench className="w-4 h-4" />}
                                        {formMode === "audit" ? "Send Me My Free Website Audit" : "Send Me My Free Project Blueprint"}
                                    </button>
                                </form>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                                        <Check className="w-7 h-7 text-green-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-green-600 mb-2">
                                        Request Sent!
                                    </h3>
                                    <p className="text-sm text-[#888]">
                                        We&apos;ve received your request! We&apos;ll be in touch within 24 hours.
                                    </p>
                                </div>
                            )}

                            <Link
                                href={`https://wa.me/917016228551?text=${encodeURIComponent("Hi Mutant Technologies, I want a free website audit for my business.")}`}
                                target="_blank"
                                className="mt-4 w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fa855] text-white font-bold text-sm uppercase tracking-wider py-4 rounded-lg transition-colors"
                            >
                                <MessageCircle className="w-4 h-4" />
                                WhatsApp Us Directly
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ─── 9. URGENCY BAR ─── */}
            <section className="py-20 md:py-24 text-center">
                <div className="max-w-[960px] mx-auto px-6">
                    <Reveal>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-10 text-[#1a1a1a] capitalize">
                            Rebuild Slots This Week: <span className="text-primary">3 of 5</span> Taken
                        </h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <div className="flex justify-center gap-3 mb-10">
                            {[1, 2, 3, 4, 5].map((n) => (
                                <div
                                    key={n}
                                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center font-bold text-base transition-all ${n <= 3
                                        ? "bg-primary text-white"
                                        : "bg-white border border-[#e5e5e0] text-[#ccc]"
                                        }`}
                                >
                                    {n <= 3 ? "✕" : ""}
                                </div>
                            ))}
                        </div>
                    </Reveal>
                    <Reveal delay={0.15}>
                        <a
                            href="/#audit-form"
                            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-md transition-colors"
                        >
                            Reserve My Slot
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </Reveal>
                </div>
            </section>

            {/* ─── 10. FOOTER ─── */}
            <footer className="border-t border-[#e5e5e0] py-10 bg-white">
                <div className="max-w-[960px] mx-auto px-6 text-center">
                    <Link
                        href="/"
                        className="inline-block mb-4"
                    >
                        <Image
                            src="/logo.png"
                            alt="Mutant Technologies"
                            width={180}
                            height={110}
                            className="h-[110px] w-auto object-contain brightness-0 opacity-40 hover:opacity-100 transition-opacity"
                        />
                    </Link>
                    <p className="text-xs text-[#bbb]">
                        © 2026 Mutant Technologies. All rights reserved.
                    </p>
                </div>
            </footer>
        </main>
    );
}

/* ─── form field ─── */
function FormField({
    label,
    required,
    children,
}: {
    label: string;
    required?: boolean;
    children: React.ReactNode;
}) {
    return (
        <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#999] mb-2">
                {label}
                {required && <span className="text-primary ml-1">*</span>}
            </label>
            {children}
        </div>
    );
}
