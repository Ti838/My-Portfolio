import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { getPersonalInfo } from "@/data/portfolio";
import EditableSection from "@/components/admin/EditableSection";

export const metadata: Metadata = { title: "About" };

export default async function AboutPage() {
  const personalInfo = await getPersonalInfo();
  return (
    <EditableSection eventKey="bio" label="Biography">
      <div className="pt-24 pb-20 min-h-screen bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-5">
          {/* Header */}
          <div className="mb-14">
            <span className="tag-pill mb-3">Who am I</span>
            <h1 className="section-title">About Me</h1>
          </div>

          <div className="grid lg:grid-cols-5 gap-14 items-start">
            {/* Photo col */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-xl border border-slate-100 dark:border-slate-800">
                <Image src="/images/profile.jpg" alt="Timon Biswas" fill className="object-cover object-top" />
              </div>
              {/* Quick facts */}
              <div className="card-base p-5 space-y-3 text-sm">
                {[
                  ["🎓", "Shanto-Mariam University of Creative Technology"],
                  ["💻", "Department of CSE"],
                  ["🆔", `Student ID: ${personalInfo.studentId}`],
                  ["📚", "Batch: 34th"],
                  ["📍", personalInfo.location],
                  ["✉️", personalInfo.email],
                  ["📞", personalInfo.phone],
                ].map(([icon, val]) => (
                  <div key={String(val)} className="flex items-start gap-2.5 text-slate-600 dark:text-slate-400">
                    <span>{icon}</span>
                    <span className="break-all">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Text col */}
            <div className="lg:col-span-3 space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
              <p className="text-xl font-display font-700 text-slate-900 dark:text-white">
                Hello! I&apos;m Timon Biswas 👋
              </p>
              <p>{personalInfo.bio}</p>
              <p>{personalInfo.bioExtended}</p>
              <p>
                I believe in continuous learning and always aim to improve my skills. Beyond programming, I&apos;m also a vocalist who has performed at local events and college functions, which has taught me confidence, stage presence, and the importance of connecting with an audience.
              </p>
              <p>Feel free to check out my projects, achievements, and skills on this website!</p>

              <div className="flex flex-wrap gap-3 pt-4">
                <Link href="/projects" className="btn-primary">
                  View Projects <FiArrowRight size={15} />
                </Link>
                <Link href="/achievements" className="btn-outline">
                  My Certificates
                </Link>
                <Link href="/contact" className="btn-outline">
                  Contact Me
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </EditableSection>
  );
}
