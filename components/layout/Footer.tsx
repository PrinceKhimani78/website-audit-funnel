import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-dark-800 border-t border-white/10 pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="space-y-4">
                        <Link href="/" className="text-2xl font-heading font-bold text-white">
                            <span className="text-primary">Mutant</span> Technologies
                        </Link>
                        <p className="text-white/60 text-sm leading-relaxed">
                            Blending creativity and tech to boost your digital presence. From stunning websites to smart marketing, we've got you covered.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-heading font-bold text-lg mb-6">Services</h4>
                        <ul className="space-y-3 text-sm text-white/60">
                            <li><Link href="#" className="hover:text-primary transition-colors">Web Development</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Digital Marketing</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">SEO Optimization</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">App Development</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-heading font-bold text-lg mb-6">Company</h4>
                        <ul className="space-y-3 text-sm text-white/60">
                            <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Our Process</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-heading font-bold text-lg mb-6">Contact</h4>
                        <ul className="space-y-4 text-sm text-white/60">
                            <li className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-primary" />
                                <span>hello@mutanttechnologies.com</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-primary" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <MapPin className="w-4 h-4 text-primary" />
                                <span>123 Tech Avenue, Innovation City</span>
                            </li>
                        </ul>
                        <div className="flex gap-4 mt-6">
                            <Link href="#" className="text-white/60 hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></Link>
                            <Link href="#" className="text-white/60 hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></Link>
                            <Link href="#" className="text-white/60 hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></Link>
                            <Link href="#" className="text-white/60 hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></Link>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 text-center text-sm text-white/40">
                    <p>&copy; {new Date().getFullYear()} Mutant Technologies. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
