import Link from "next/link";
import { FiImage, FiMinimize2, FiFileText, FiArrowRight } from "react-icons/fi";

export const metadata = {
  title: "Web Tools - Utilities & Converters",
  description: "Free, fast, and secure client-side tools for image resizing, format conversion, and PDF generation.",
};

const tools = [
  {
    title: "Image Resizer",
    description: "Instantly resize your images to specific dimensions. 100% secure, processes completely in your browser.",
    icon: FiMinimize2,
    href: "/tools/image-resizer",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-500/10",
  },
  {
    title: "Image Converter",
    description: "Convert images between WEBP, PNG, and JPG formats instantly without any quality loss.",
    icon: FiImage,
    href: "/tools/image-converter",
    color: "text-green-500",
    bg: "bg-green-50 dark:bg-green-500/10",
  },
  {
    title: "PDF Toolkit",
    description: "A complete professional suite for PDF conversion: Images to PDF, DOCX to PDF, PDF to Images and Word.",
    icon: FiFileText,
    href: "/tools/pdf",
    color: "text-red-500",
    bg: "bg-red-50 dark:bg-red-500/10",
  }
];

export default function ToolsPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50 dark:bg-slate-950 font-sans px-5">
      <div className="max-w-5xl mx-auto space-y-16">
        <div className="text-center space-y-5">
          <span className="tag-pill">Developer Utilities</span>
          <h1 className="font-display font-900 text-4xl sm:text-5xl text-slate-900 dark:text-white uppercase tracking-tighter">
            Smart <span className="text-accent-500">Tools.</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            A collection of free, lightning-fast web utilities. Privacy-first: everything processes strictly in your browser.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link key={tool.title} href={tool.href} className="group">
              <div className="card-base p-8 h-full flex flex-col items-start gap-5 hover:border-accent-500/30 transition-all hover:shadow-[0_20px_40px_-15px_rgba(8,112,184,0.1)]">
                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${tool.bg} ${tool.color} group-hover:scale-110 transition-transform duration-500`}>
                   <tool.icon size={26} />
                 </div>
                 <div className="space-y-2">
                   <h2 className="text-xl font-bold text-slate-900 dark:text-white">{tool.title}</h2>
                   <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                     {tool.description}
                   </p>
                 </div>
                 <div className="mt-auto pt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-accent-500 group-hover:gap-4 transition-all">
                   Launch Tool <FiArrowRight size={14} />
                 </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
