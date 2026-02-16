"use client";

import { Section } from "@/components/ui/Section";
import { motion } from "framer-motion";

const steps = [
    {
        number: "01",
        title: "Discovery",
        description: "We dive deep into your business goals, target audience, and market landscape to understand your unique needs.",
    },
    {
        number: "02",
        title: "Strategy",
        description: "We craft a tailored roadmap, selecting the right technologies and channels to maximize your impact.",
    },
    {
        number: "03",
        title: "Execution",
        description: "Our expert team brings the vision to life with precision coding, stunning design, and compelling content.",
    },
    {
        number: "04",
        title: "Growth",
        description: "We launch, monitor, and optimize, ensuring continuous improvement and sustainable results.",
    },
];

export function Process() {
    return (
        <Section id="process" className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
                        How We <span className="text-gradient">Work</span>
                    </h2>
                    <p className="text-white/60 text-lg mb-8 leading-relaxed">
                        Our proven process ensures transparency, efficiency, and exceptional results. We partner with you every step of the way.
                    </p>
                    <div className="relative h-[400px] w-full rounded-2xl overflow-hidden hidden lg:block">
                        {/* Abstract visual representation of process */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-3xl" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-64 h-64 bg-primary/30 rounded-full blur-[80px] animate-pulse" />
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex gap-6 group"
                        >
                            <div className="flex-shrink-0 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-lg font-bold text-white/40 group-hover:border-primary group-hover:text-primary transition-colors">
                                {step.number}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{step.title}</h3>
                                <p className="text-white/60 leading-relaxed">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
