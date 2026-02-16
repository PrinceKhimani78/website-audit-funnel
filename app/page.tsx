import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { Process } from "@/components/home/Process";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-900 text-white selection:bg-primary/30">
      <Navbar />
      <Hero />
      <Services />
      <Process />
      <Footer />
    </main>
  );
}
