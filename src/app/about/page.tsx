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
      <div className="pt-32 pb-24 min-h-screen relative overflow-hidden mesh-gradient">
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
                  <div className="absolute -inset-4 bg-gradient-to-tr from-[var(--accent)] to-[var(--mesh-3)] rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                  <div className="relative rounded-3xl overflow-hidden aspect-[3/4] shadow-2xl border border-[var(--border)]">
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
                      <div className="w-10 h-10 rounded-2xl bg-[var(--surface-tertiary)] text-[var(--accent)] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <Icon size={18} />
                      </div>
                      <span className="text-sm font-mono font-bold text-[var(--text-primary)] break-all">{val}</span>
                    </GlowCard>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Narrative Column */}
            <div className="lg:col-span-3 space-y-8">
              <ScrollReveal direction="up" delay={200}>
                <h2 className="text-4xl lg:text-5xl font-mono font-bold text-[var(--text-primary)] leading-tight">
                  I weave <span className="handwritten text-[var(--accent)]">code</span> and <span className="handwritten text-[#f0c6c6]">creativity</span> into digital experiences.
                </h2>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={300} className="space-y-6 text-lg text-[var(--text-secondary)] leading-relaxed">
                <p>{personalInfo.bio}</p>
                <p>{personalInfo.bioExtended}</p>
                <p className="border-l-4 border-[var(--accent)] pl-6 handwritten text-2xl text-[var(--text-primary)] bg-[var(--surface-secondary)] py-4 rounded-r-3xl">
                  "Beyond the terminal, I find my voice on stage. Music fuels my discipline, and code realizes my vision."
                </p>
                <p>
                  I believe in continuous evolution. Every line of code is a step towards a more connected, efficient, and beautiful world.
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={400} className="flex flex-wrap gap-4 pt-8">
                <MagneticButton>
                  <Link href="/projects" className="btn-primary">
                    Explore Work <FiArrowRight size={18} />
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <Link href="/contact" className="btn-outline">
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
