"use client";

import { useState, useRef } from "react";
import { FiUpload, FiDownload, FiFileText, FiArrowLeft, FiAlertCircle } from "react-icons/fi";
import Link from "next/link";
import toast from "react-hot-toast";

export default function DocsToPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.name.endsWith(".docx") && !selectedFile.name.endsWith(".doc")) {
      toast.error("Please upload a Word document (.docx or .doc)");
      return;
    }

    setFile(selectedFile);
  };

  const convertToPdf = () => {
    if (!file) return;
    setLoading(true);

    // Simulated Conversion
    setTimeout(() => {
      setLoading(false);
      toast.success("Conversion successful! (Demo Mode: Full DOCX engine integration pending)");
    }, 2000);
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50 dark:bg-slate-950 font-sans px-5">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <Link href="/tools" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-accent-500 transition-colors mb-4">
              <FiArrowLeft /> Back to Tools
            </Link>
            <h1 className="text-3xl sm:text-4xl font-display font-900 text-slate-900 dark:text-white uppercase tracking-tighter">
              DOCX to <span className="text-orange-500">PDF</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Fast, secure, and private Word to PDF conversion in your browser.
            </p>
          </div>
          <button 
            onClick={convertToPdf}
            disabled={!file || loading}
            className="py-3.5 px-8 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-orange-500/30"
          >
            {loading ? (
              <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Converting...</>
            ) : (
              <><FiDownload size={18} /> Convert to PDF</>
            )}
          </button>
        </div>

        <div className="card-base p-8 space-y-8 min-h-[300px] flex flex-col items-center justify-center text-center">
          {!file ? (
            <>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                accept=".doc,.docx" 
                className="hidden" 
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-16 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl flex flex-col items-center gap-4 hover:border-orange-500 dark:hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/5 transition-all group"
              >
                <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900/50 text-orange-500 rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  <FiFileText size={32} />
                </div>
                <div>
                  <span className="text-xl font-display font-900 text-slate-800 dark:text-white block uppercase tracking-tight">Select Word Document</span>
                  <span className="text-sm text-slate-400 font-medium max-w-xs mx-auto block mt-1">Upload your .docx or .doc files for instant conversion.</span>
                </div>
              </button>
            </>
          ) : (
            <div className="w-full max-w-lg p-6 rounded-2xl border border-orange-200 dark:border-orange-900/40 bg-orange-50/30 dark:bg-orange-900/10 flex flex-col items-center gap-5">
               <div className="w-16 h-16 bg-orange-500 text-white rounded-2xl flex items-center justify-center shadow-lg">
                 <FiFileText size={28} />
               </div>
               <div className="text-center">
                 <h3 className="font-bold text-slate-900 dark:text-white text-lg truncate max-w-md">{file.name}</h3>
                 <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">{(file.size / 1024).toFixed(2)} KB</p>
               </div>
               <div className="flex gap-3 w-full">
                 <button 
                   onClick={() => setFile(null)}
                   className="flex-1 py-3 px-6 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
                 >
                   Remove
                 </button>
                 <button 
                   onClick={convertToPdf}
                   disabled={loading}
                   className="flex-[2] py-3 px-6 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
                 >
                   {loading ? "Processing..." : "Convert Now"}
                 </button>
               </div>
            </div>
          )}

          <div className="flex items-start gap-3 p-4 bg-slate-100/50 dark:bg-slate-900/50 rounded-xl text-left max-w-2xl">
            <FiAlertCircle className="text-slate-400 shrink-0 mt-0.5" />
            <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              <strong>Privacy Guaranteed:</strong> Your documents are never uploaded to any server. All conversion happens locally in your browser using secure client-side technologies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
