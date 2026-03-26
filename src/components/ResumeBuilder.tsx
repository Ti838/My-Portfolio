"use client";
import React, { useState, useEffect } from "react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { ResumePDF, ResumeData } from "./ResumePDF";
import { 
  FiUser, FiMail, FiPhone, FiMapPin, FiGithub, 
  FiBriefcase, FiBook, FiCode, FiAward, 
  FiPlus, FiTrash2, FiDownload, FiLayout, FiImage
} from "react-icons/fi";

export default function ResumeBuilder({ initialData }: { initialData: ResumeData }) {
  const [data, setData] = useState<ResumeData>(initialData);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (section: string, field: string, value: any) => {
    setData((prev) => ({
      ...prev,
      [section]: typeof prev[section as keyof ResumeData] === "object" 
        ? { ...(prev[section as keyof ResumeData] as any), [field]: value }
        : value
    }));
  };

  const updateItem = (section: string, index: number, field: string, value: any) => {
    setData((prev: any) => {
      const newList = [...prev[section]];
      newList[index] = { ...newList[index], [field]: value };
      return { ...prev, [section]: newList };
    });
  };

  const addItem = (section: string, template: any) => {
    setData((prev: any) => ({
      ...prev,
      [section]: [...prev[section], template]
    }));
  };

  const removeItem = (section: string, index: number) => {
    setData((prev: any) => ({
      ...prev,
      [section]: prev[section].filter((_: any, i: number) => i !== index)
    }));
  };

  if (!isClient) return null;

  return (
    <div className="flex flex-col lg:flex-row h-full bg-slate-50 dark:bg-slate-950">
      {/* Sidebar Form */}
      <div className="w-full lg:w-1/2 overflow-y-auto p-6 lg:p-10 border-r border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-display font-900 text-slate-900 dark:text-white">Resume & CV Builder</h1>
            <p className="text-sm text-slate-500">Edit details and download your custom PDF</p>
          </div>
          <div className="flex gap-2">
             <button 
               onClick={() => setData(prev => ({ ...prev, layout: prev.layout === 'resume' ? 'cv' : 'resume' }))}
               className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-colors"
             >
               <FiLayout size={14} /> {data.layout === 'resume' ? 'Switch to CV' : 'Switch to Resume'}
             </button>
          </div>
        </div>

        <div className="space-y-8">
          {/* Personal Info */}
          <section className="space-y-4">
            <h2 className="flex items-center gap-2 text-sm font-bold text-accent-500 uppercase tracking-wider">
              <FiUser size={16} /> Personal Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Full Name" value={data.personalInfo.name} onChange={(v) => handleChange("personalInfo", "name", v)} icon={<FiUser />} />
              <Input label="Tagline" value={data.personalInfo.tagline} onChange={(v) => handleChange("personalInfo", "tagline", v)} />
              <Input label="Email" value={data.personalInfo.email} onChange={(v) => handleChange("personalInfo", "email", v)} icon={<FiMail />} />
              <Input label="Phone" value={data.personalInfo.phone} onChange={(v) => handleChange("personalInfo", "phone", v)} icon={<FiPhone />} />
              <Input label="Location" value={data.personalInfo.location} onChange={(v) => handleChange("personalInfo", "location", v)} icon={<FiMapPin />} />
              <Input label="GitHub (User)" value={data.personalInfo.github || ""} onChange={(v) => handleChange("personalInfo", "github", v)} icon={<FiGithub />} />
              <Input label="Profile Image URL" value={data.personalInfo.profileImage || ""} onChange={(v) => handleChange("personalInfo", "profileImage", v)} icon={<FiImage />} />
            </div>
          </section>

          {/* Summary */}
          <section className="space-y-4">
            <h2 className="flex items-center gap-2 text-sm font-bold text-accent-500 uppercase tracking-wider">
              <FiBriefcase size={16} /> Professional Summary
            </h2>
            <textarea
              className="w-full p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:ring-2 focus:ring-accent-500 transition-all outline-none min-h-[100px]"
              value={data.summary}
              onChange={(e) => setData(prev => ({ ...prev, summary: e.target.value }))}
              placeholder="Briefly describe your career and goals..."
            />
          </section>

          {/* Experience */}
          <SectionList 
             title="Experience" 
             icon={<FiBriefcase />} 
             items={data.experience} 
             onAdd={() => addItem("experience", { title: "New Role", org: "Company", duration: "Date range", bullets: [""] })}
             onRemove={(i: number) => removeItem("experience", i)}
             renderItem={(exp: any, i: number) => (
               <div className="space-y-3 p-4 rounded-xl bg-slate-100/50 dark:bg-slate-900/50">
                 <div className="grid grid-cols-2 gap-3">
                   <Input label="Title" value={exp.title} onChange={(v) => updateItem("experience", i, "title", v)} />
                   <Input label="Duration" value={exp.duration} onChange={(v) => updateItem("experience", i, "duration", v)} />
                 </div>
                 <Input label="Organization" value={exp.org} onChange={(v) => updateItem("experience", i, "org", v)} />
                 <BulletList 
                    bullets={exp.bullets} 
                    onChange={(v) => updateItem("experience", i, "bullets", v)} 
                 />
               </div>
             )}
          />

          {/* Education */}
          <SectionList 
             title="Education" 
             icon={<FiBook />} 
             items={data.education} 
             onAdd={() => addItem("education", { degree: "Degree", institution: "University", duration: "Date", details: [""] })}
             onRemove={(i: number) => removeItem("education", i)}
             renderItem={(edu: any, i: number) => (
               <div className="space-y-3 p-4 rounded-xl bg-slate-100/50 dark:bg-slate-900/50">
                 <div className="grid grid-cols-2 gap-3">
                   <Input label="Degree" value={edu.degree} onChange={(v) => updateItem("education", i, "degree", v)} />
                   <Input label="Duration" value={edu.duration} onChange={(v) => updateItem("education", i, "duration", v)} />
                 </div>
                 <Input label="Institution" value={edu.institution} onChange={(v) => updateItem("education", i, "institution", v)} />
               </div>
             )}
          />

          {/* Skills */}
          <SectionList 
             title="Skills" 
             icon={<FiCode />} 
             items={data.skills} 
             onAdd={() => addItem("skills", { category: "Category", items: [""] })}
             onRemove={(i: number) => removeItem("skills", i)}
             renderItem={(skill: any, i: number) => (
               <div className="space-y-3 p-4 rounded-xl bg-slate-100/50 dark:bg-slate-900/50">
                 <Input label="Category" value={skill.category} onChange={(v) => updateItem("skills", i, "category", v)} />
                 <textarea
                    className="w-full p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-accent-500 outline-none"
                    value={skill.items.join(", ")}
                    onChange={(e) => updateItem("skills", i, "items", e.target.value.split(",").map(s => s.trim()))}
                    placeholder="Enter skills separated by commas"
                 />
               </div>
             )}
          />

          {/* Projects */}
          <SectionList 
             title="Projects" 
             icon={<FiLayout />} 
             items={data.projects} 
             onAdd={() => addItem("projects", { title: "Project Name", tech: ["React"], duration: "Date", bullets: [""] })}
             onRemove={(i: number) => removeItem("projects", i)}
             renderItem={(proj: any, i: number) => (
               <div className="space-y-3 p-4 rounded-xl bg-slate-100/50 dark:bg-slate-900/50">
                 <div className="grid grid-cols-2 gap-3">
                   <Input label="Title" value={proj.title} onChange={(v) => updateItem("projects", i, "title", v)} />
                   <Input label="Duration" value={proj.duration} onChange={(v) => updateItem("projects", i, "duration", v)} />
                 </div>
                 <Input label="Tech Stack (comma separated)" value={proj.tech.join(", ")} onChange={(v) => updateItem("projects", i, "tech", v.split(",").map((s: string) => s.trim()))} />
                 <BulletList 
                    bullets={proj.bullets} 
                    onChange={(v) => updateItem("projects", i, "bullets", v)} 
                 />
               </div>
             )}
          />

          {/* Achievements */}
          <SectionList 
             title="Achievements" 
             icon={<FiAward />} 
             items={data.achievements} 
             onAdd={() => addItem("achievements", { title: "Award Name", date: "Date", description: "Details" })}
             onRemove={(i: number) => removeItem("achievements", i)}
             renderItem={(ach: any, i: number) => (
               <div className="space-y-3 p-4 rounded-xl bg-slate-100/50 dark:bg-slate-900/50">
                 <div className="grid grid-cols-2 gap-3">
                   <Input label="Title" value={ach.title} onChange={(v) => updateItem("achievements", i, "title", v)} />
                   <Input label="Date" value={ach.date} onChange={(v) => updateItem("achievements", i, "date", v)} />
                 </div>
                 <textarea
                    className="w-full p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-accent-500 outline-none"
                    value={ach.description}
                    onChange={(e) => updateItem("achievements", i, "description", e.target.value)}
                 />
               </div>
             )}
          />
        </div>
      </div>

      {/* Preview Section */}
      <div className="hidden lg:flex flex-col flex-1 h-full bg-slate-800">
        <div className="p-4 bg-slate-900 flex items-center justify-between border-b border-slate-700">
           <span className="text-sm font-semibold text-slate-300">Live Preview</span>
           <PDFDownloadLink document={<ResumePDF data={data} />} fileName="Resume_Timon_Biswas.pdf" className="px-4 py-2 bg-accent-500 text-white rounded-lg text-xs font-bold hover:bg-accent-600 transition-colors">
             {({ loading }) => loading ? "Preparing..." : <><FiDownload size={14} /> Download PDF</>}
           </PDFDownloadLink>
        </div>
        <div className="flex-1">
          <PDFViewer className="w-full h-full border-none">
            <ResumePDF data={data} />
          </PDFViewer>
        </div>
      </div>

      {/* Mobile Download FAB */}
      <div className="lg:hidden fixed bottom-6 right-6">
         <PDFDownloadLink document={<ResumePDF data={data} />} fileName="Resume_Timon_Biswas.pdf" className="w-14 h-14 rounded-full bg-accent-500 text-white flex items-center justify-center shadow-2xl">
           <FiDownload size={24} />
         </PDFDownloadLink>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, icon }: { label: string, value: string, onChange: (v: string) => void, icon?: React.ReactNode }) {
  return (
    <div className="space-y-1.5 w-full">
      <label className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">{label}</label>
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div>}
        <input 
          type="text" 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className={`w-full ${icon ? 'pl-10' : 'px-4'} py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:ring-2 focus:ring-accent-500 transition-all outline-none text-slate-700 dark:text-slate-200`}
        />
      </div>
    </div>
  );
}

function SectionList({ title, icon, items, onAdd, onRemove, renderItem }: { title: string, icon: React.ReactNode, items: any[], onAdd: () => void, onRemove: (i: number) => void, renderItem: (item: any, i: number) => React.ReactNode }) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-bold text-accent-500 uppercase tracking-wider">
          {icon} {title}
        </h2>
        <button onClick={onAdd} className="p-1.5 rounded-lg bg-accent-500/10 text-accent-500 hover:bg-accent-500 hover:text-white transition-all">
          <FiPlus size={16} />
        </button>
      </div>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="relative group">
            <button 
              onClick={() => onRemove(i)}
              className="absolute -right-2 -top-2 w-7 h-7 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-red-500 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-sm"
            >
              <FiTrash2 size={14} />
            </button>
            {renderItem(item, i)}
          </div>
        ))}
      </div>
    </section>
  );
}

function BulletList({ bullets, onChange }: { bullets: string[], onChange: (v: string[]) => void }) {
  const addBullet = () => onChange([...bullets, ""]);
  const removeBullet = (i: number) => onChange(bullets.filter((_, idx) => idx !== i));
  const updateBullet = (i: number, val: string) => {
    const next = [...bullets];
    next[i] = val;
    onChange(next);
  };

  return (
    <div className="space-y-2 mt-2 pl-4 border-l-2 border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-slate-400">Bullets points</span>
        <button onClick={addBullet} className="text-accent-500 hover:underline text-[10px]">Add bullet</button>
      </div>
      {bullets.map((b, i) => (
        <div key={i} className="flex gap-2">
           <textarea
             value={b}
             onChange={(e) => updateBullet(i, e.target.value)}
             className="flex-1 p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:ring-1 focus:ring-accent-500 outline-none min-h-[40px]"
           />
           <button onClick={() => removeBullet(i)} className="text-red-400 hover:text-red-600 self-start mt-2">
             <FiTrash2 size={12} />
           </button>
        </div>
      ))}
    </div>
  );
}
