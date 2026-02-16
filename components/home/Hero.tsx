"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <Section className="min-h-screen flex items-center justify-center pt-32 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse" />

            <div className="text-center space-y-8 max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-primary inline-block mb-6 backdrop-blur-sm">
                        Digital Evolution Agency
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold leading-tight tracking-tight">
                        We Are <br />
                        <span className="text-gradient">Mutant</span> Technologies
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
                >
                    Blending creativity and tech to boost your digital presence. From stunning websites to smart marketing, we transform brands into digital powerhouses.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Button size="lg" className="group">
                        Start Your Project
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button variant="outline" size="lg">
                        View Our Work
                    </Button>
                </motion.div>
            </div>

            {/* Floating Elements (Decorative) */}
            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-10 w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent border border-white/10 backdrop-blur-md -z-10 hidden md:block"
            />
            <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-1/4 right-10 w-32 h-32 rounded-full bg-gradient-to-bl from-secondary/20 to-transparent border border-white/10 backdrop-blur-md -z-10 hidden md:block"
            />
        </Section>
    );
}
