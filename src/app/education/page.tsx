import type { Metadata } from "next";
import Image from "next/image";
import { getEducation } from "@/data/portfolio";
import { FiExternalLink } from "react-icons/fi";
import EditableSection from "@/components/admin/EditableSection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GlowCard from "@/components/ui/GlowCard";

export const metadata: Metadata = { title: "Education" };

export default async function EducationPage() {
  const education = await getEducation();
  return (
    <EditableSection eventKey="education" label="Education">
      <div className="pt-32 pb-24 min-h-screen relative overflow-hidden mesh-gradient">
        <div className="max-w-4xl mx-auto px-5">
          {/* Header */}
          <ScrollReveal direction="left" className="mb-20">
            <span className="tag-pill mb-4">The Foundation</span>
            <h1 className="section-title">Academic History</h1>
          </ScrollReveal>

          <div className="space-y-10">
            {education.map((edu, i) => (
              <ScrollReveal key={edu.id} delay={i * 200} direction="up">
                <GlowCard className="glass-card p-10 flex flex-col md:flex-row gap-10 items-center md:items-start group">
                  {/* Floating Logo */}
                  <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-[32px] overflow-hidden glass border-[var(--border)] p-4 bg-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">
                    <Image
                      src={edu.logoUrl}
                      alt={edu.institution}
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                  </div>

                  {/* Institution Details */}
                  <div className="flex-1 text-center md:text-left space-y-4">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="space-y-1">
                        {edu.url ? (
                          <a href={edu.url} target="_blank" rel="noopener noreferrer"
                            className="font-mono font-bold text-2xl text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors inline-flex items-center gap-3 tracking-tight">
                            {edu.institution} <FiExternalLink size={20} />
                          </a>
                        ) : (
                          <h2 className="font-mono font-bold text-2xl text-[var(--text-primary)] tracking-tight">{edu.institution}</h2>
                        )}
                        <p className="text-[var(--accent)] font-mono font-bold uppercase tracking-wider text-xs">{edu.degree}</p>
                      </div>
                        <span className="px-6 py-2 rounded-full glass border-[var(--border)] text-xs font-mono font-bold uppercase tracking-widest text-[var(--text-secondary)]">
                          {edu.duration}
                        </span>
                      </div>

                      {edu.field && (
                        <p className="text-sm text-[var(--text-secondary)] font-medium">
                          Focus: <span className="text-[var(--text-primary)]">{edu.field}</span>
                        </p>
                    )}

                    {edu.details && (
                      <ul className="grid sm:grid-cols-2 gap-3 mt-6">
                        {edu.details.map((d: string) => (
                          <li key={d} className="flex items-center gap-3 text-sm text-[var(--text-secondary)] font-mono tracking-wider">
                            <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full shadow-sm" /> {d}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </GlowCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </EditableSection>
  );
}
