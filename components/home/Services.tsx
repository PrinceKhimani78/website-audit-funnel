"use client";

import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Code, Megaphone, Search, ShieldCheck, Palette, Smartphone } from "lucide-react";

const services = [
    {
        title: "Web Development",
        description: "Custom, high-performance websites built with Next.js and modern technologies.",
        icon: Code,
        colSpan: "md:col-span-2",
    },
    {
        title: "Digital Marketing",
        description: "Strategic campaigns that drive real growth and engagement.",
        icon: Megaphone,
        colSpan: "md:col-span-1",
    },
    {
        title: "SEO Optimization",
        description: "Rank higher and get found by your target audience.",
        icon: Search,
        colSpan: "md:col-span-1",
    },
    {
        title: "Brand Design",
        description: "Memorable visual identities that tell your story.",
        icon: Palette,
        colSpan: "md:col-span-2",
    },
    {
        title: "App Development",
        description: "Native and cross-platform mobile applications.",
        icon: Smartphone,
        colSpan: "md:col-span-1",
    },
    {
        title: "Cyber Security",
        description: "Protecting your digital assets with enterprise-grade security.",
        icon: ShieldCheck,
        colSpan: "md:col-span-1",
    },
];

export function Services() {
    return (
        <Section id="services" className="bg-dark-900">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
                    Our <span className="text-gradient">Expertise</span>
                </h2>
                <p className="text-white/60 max-w-2xl mx-auto">
                    We offer a comprehensive suite of digital services designed to elevate your brand and drive business growth.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {services.map((service, index) => (
                    <Card key={index} className={`${service.colSpan} flex flex-col justify-between group`}>
                        <div className="mb-6">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                <service.icon className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                            <p className="text-white/60 text-sm leading-relaxed">{service.description}</p>
                        </div>
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="w-0 h-full bg-primary group-hover:w-full transition-all duration-500 ease-out" />
                        </div>
                    </Card>
                ))}
            </div>
        </Section>
    );
}
