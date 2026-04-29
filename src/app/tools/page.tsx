import Link from "next/link";
import { FiImage, FiFileText, FiArrowRight } from "react-icons/fi";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GlowCard from "@/components/ui/GlowCard";
import MagneticButton from "@/components/ui/MagneticButton";

export const metadata = {
  title: "Web Tools - Utilities & Converters",
  description: "Free, fast, and secure client-side tools for image resizing, format conversion, and PDF generation.",
};

const tools = [
  {
    icon: FiImage,
    title: "Image Suite",
    description: "Resize and convert images in one place. 100% private, processes entirely in your browser.",
    href: "/tools/image",
    category: "Graphics",
  },
  {
    title: "PDF Toolkit",
    description: "A complete professional suite for PDF conversion: Images to PDF, DOCX to PDF, PDF to Images and Word.",
    icon: FiFileText,
    href: "/tools/pdf",
    category: "Documents",
  }
];

export default function ToolsPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 relative z-10">
        {/* Header */}
        <ScrollReveal direction="left" className="mb-20">
          <span className="tag-pill mb-4">The Utilities</span>
          <h1 className="section-title">Developer Tools</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-6 max-w-xl text-lg font-medium leading-relaxed">
            Free, privacy-focused tools built to speed up your workflow. Everything processes strictly in your browser.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {tools.map((tool, i) => (
            <ScrollReveal key={tool.title} delay={i * 100} direction="up">
              <Link href={tool.href} className="group h-full">
                <GlowCard className="glass-card p-10 flex flex-col h-full group-hover:border-accent-500/50 transition-all">
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-16 h-16 rounded-[2rem] bg-accent-500/10 text-accent-500 flex items-center justify-center group-hover:scale-110 transition-transform shadow-glow">
                      <tool.icon size={32} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{tool.category}</span>
                  </div>
                  <h2 className="font-display font-900 text-3xl text-slate-900 dark:text-white mb-4 group-hover:text-accent-500 transition-colors uppercase tracking-tighter leading-none">
                    {tool.title}
                  </h2>
                  <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium mb-10 flex-1">
                    {tool.description}
                  </p>
                  <MagneticButton className="w-fit">
                    <div className="btn-primary py-4 px-8 text-[10px] uppercase tracking-[0.2em] font-black group-hover:px-10 transition-all">
                      Launch Tool <FiArrowRight size={16} />
                    </div>
                  </MagneticButton>
                </GlowCard>
              </Link>
            </ScrollReveal>
          ))}
          
          <ScrollReveal direction="up" delay={300}>
            <div className="glass-card p-10 border-dashed border-white/10 flex flex-col items-center justify-center text-center opacity-50 h-full">
              <div className="w-16 h-16 rounded-full bg-slate-500/10 flex items-center justify-center text-slate-500 mb-6">
                <FiFileText size={32} />
              </div>
              <h3 className="font-display font-900 text-xl text-slate-400 uppercase tracking-tighter">More Tools Soon</h3>
              <p className="text-sm text-slate-500 font-medium mt-2 uppercase tracking-widest">In the Lab</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
