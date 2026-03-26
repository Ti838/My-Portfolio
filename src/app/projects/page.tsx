import type { Metadata } from "next";
import { getProjects, getTechColor } from "@/data/portfolio";
import { FiGithub, FiExternalLink, FiStar } from "react-icons/fi";
import EditableSection from "@/components/admin/EditableSection";

export const metadata: Metadata = { title: "Projects" };

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <EditableSection eventKey="projects" label="Projects Portfolio">
      <div className="pt-24 pb-20 min-h-screen bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-5">
          {/* Header */}
          <div className="mb-14">
            <span className="tag-pill mb-3">What I build</span>
            <h1 className="section-title">Projects</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-xl leading-relaxed">
              I&apos;m actively building real-world applications and learning every day. Here&apos;s what I&apos;ve been working on.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-7">
            {projects.map((p) => (
              <article key={p.id} className="card-base p-7 flex flex-col gap-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {p.featured && (
                      <span title="Featured" className="text-amber-400"><FiStar size={14} fill="currentColor" /></span>
                    )}
                    <h2 className="font-display font-700 text-slate-900 dark:text-white text-lg">{p.title}</h2>
                  </div>
                  <span
                    className={`tag-pill text-[10px] shrink-0 ${
                      p.status === "completed"
                        ? "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                        : p.status === "in-progress"
                        ? "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400"
                        : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                    }`}
                  >
                    {p.status === "in-progress" ? "🔧 In Progress" : p.status === "completed" ? "✅ Live" : "📋 Planned"}
                  </span>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1">{p.description}</p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {p.techStack.map((t: string) => (
                      <span key={t} className={`px-3 py-1 rounded-full text-[11px] font-semibold ${getTechColor(t)}`}>
                        {t}
                      </span>
                    ))}
                  </div>

                <div className="flex gap-4 pt-1 border-t border-slate-100 dark:border-slate-800">
                  {p.githubUrl && (
                    <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-accent-500 transition-colors">
                      <FiGithub size={13} /> Source Code
                    </a>
                  )}
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-semibold text-accent-500 hover:text-accent-600 transition-colors">
                      <FiExternalLink size={13} /> Live Demo
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* Coming soon note */}
          <div className="mt-10 p-6 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 text-center">
            <p className="text-2xl mb-2">🛠️</p>
            <p className="font-display font-700 text-slate-900 dark:text-white">More projects coming soon</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              I&apos;m continuously building and learning — check back again!
            </p>
          </div>
        </div>
      </div>
    </EditableSection>
  );
}
