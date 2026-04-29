import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiBookOpen, FiCpu, FiCreditCard, FiLayers, FiMapPin, FiMail, FiPhone } from "react-icons/fi";
import { getPersonalInfo } from "@/data/portfolio";
import EditableSection from "@/components/admin/EditableSection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GlowCard from "@/components/ui/GlowCard";
import MagneticButton from "@/components/ui/MagneticButton";

export const metadata: Metadata = { title: "About" };

export default async function AboutPage() {
  const personalInfo = await getPersonalInfo();
  return (
    <EditableSection eventKey="bio" label="Biography">
      <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 relative z-10">
          {/* Header */}
          <ScrollReveal direction="left" className="mb-20">
            <span className="tag-pill mb-4">The Story</span>
            <h1 className="section-title">About Me</h1>
          </ScrollReveal>

          <div className="grid lg:grid-cols-5 gap-16 items-start">
            {/* Visual Column */}
            <div className="lg:col-span-2 space-y-10">
              <ScrollReveal direction="right" delay={200}>
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-tr from-accent-500 to-purple-500 rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                  <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-2xl border border-white/20">
                    <Image 
                      src="/images/profile.jpg" 
                      alt="Timon Biswas" 
                      fill 
                      className="object-cover object-top hover:scale-105 transition-transform duration-1000" 
                    />
                  </div>
                </div>
              </ScrollReveal>

              {/* Identity Cards */}
              <div className="space-y-4">
                {([
                  [FiBookOpen, personalInfo.university || "SMUCT"],
                  [FiCpu, "Dept. of CSE"],
                  [FiLayers, `Batch: ${personalInfo.batch || "34th"}`],
                  [FiMapPin, personalInfo.stats?.location_full || personalInfo.location],
                  [FiMail, personalInfo.email],
                ] as any[]).map(([Icon, val], i) => (
                  <ScrollReveal key={String(val)} direction="right" delay={300 + (i * 100)}>
                    <GlowCard className="glass-card p-4 flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-xl bg-accent-500/10 text-accent-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <Icon size={18} />
                      </div>
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300 break-all">{val}</span>
                    </GlowCard>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Narrative Column */}
            <div className="lg:col-span-3 space-y-8">
              <ScrollReveal direction="up" delay={200}>
                <h2 className="text-4xl lg:text-5xl font-display font-900 text-slate-900 dark:text-white leading-tight">
                  I weave <span className="text-accent-500">code</span> and <span className="text-purple-500">creativity</span> into digital experiences.
                </h2>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={300} className="space-y-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                <p>{personalInfo.bio}</p>
                <p>{personalInfo.bioExtended}</p>
                <p className="border-l-4 border-accent-500 pl-6 italic bg-accent-500/5 py-4 rounded-r-2xl">
                  "Beyond the terminal, I find my voice on stage. Music fuels my discipline, and code realizes my vision."
                </p>
                <p>
                  I believe in continuous evolution. Every line of code is a step towards a more connected, efficient, and beautiful world.
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={400} className="flex flex-wrap gap-4 pt-8">
                <MagneticButton>
                  <Link href="/projects" className="btn-primary py-4 px-10 text-xs uppercase tracking-widest font-black">
                    Explore Work <FiArrowRight size={18} />
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <Link href="/contact" className="btn-outline py-4 px-10 text-xs uppercase tracking-widest font-black">
                    Let&apos;s Connect
                  </Link>
                </MagneticButton>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </EditableSection>
  );
}
