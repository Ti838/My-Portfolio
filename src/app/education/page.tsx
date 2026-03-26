import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getEducation } from "@/data/portfolio";
import { FiExternalLink } from "react-icons/fi";

import EditableSection from "@/components/admin/EditableSection";

export const metadata: Metadata = { title: "Education" };

export default async function EducationPage() {
  const education = await getEducation();
  return (
    <EditableSection eventKey="education" label="Education">
      <div className="pt-24 pb-20 min-h-screen bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-5">
          <div className="mb-14">
            <span className="tag-pill mb-3">Academic Journey</span>
            <h1 className="section-title">Education</h1>
          </div>

          <div className="space-y-6">
            {education.map((edu, i) => (
              <div key={edu.id} className="card-base p-7 flex gap-6 items-start animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                {/* Logo */}
                <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 flex-shrink-0 bg-white flex items-center justify-center">
                  <Image
                    src={edu.logoUrl}
                    alt={edu.institution}
                    width={60}
                    height={60}
                    className="object-contain w-full h-full"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      {edu.url ? (
                        <a href={edu.url} target="_blank" rel="noopener noreferrer"
                          className="font-display font-700 text-lg text-slate-900 dark:text-white hover:text-accent-500 transition-colors inline-flex items-center gap-1.5">
                          {edu.institution} <FiExternalLink size={14} />
                        </a>
                      ) : (
                        <h2 className="font-display font-700 text-lg text-slate-900 dark:text-white">{edu.institution}</h2>
                      )}
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">{edu.degree}</p>
                      {edu.field && <p className="text-sm text-slate-500 dark:text-slate-500">Group / Field: {edu.field}</p>}
                    </div>
                    <span className="text-xs font-mono text-accent-500 bg-accent-50 dark:bg-accent-900/20 px-3 py-1 rounded-full whitespace-nowrap">
                      {edu.duration}
                    </span>
                  </div>
                  {edu.details && (
                    <ul className="mt-4 space-y-1">
                      {edu.details.map((d: string) => (
                        <li key={d} className="text-xs text-slate-500 flex items-center gap-2">
                          <span className="w-1 h-1 bg-accent-500 rounded-full" /> {d}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </EditableSection>
  );
}
