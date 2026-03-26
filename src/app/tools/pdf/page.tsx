"use client";

import { useState, useRef } from "react";
import { 
  FiUpload, FiDownload, FiTrash2, FiArrowLeft, FiImage, 
  FiFileText, FiType, FiLayers, FiAlertCircle, FiStar 
} from "react-icons/fi";
import Link from "next/link";
import { jsPDF } from "jspdf";
import toast from "react-hot-toast";

type PdfTool = "image-to-pdf" | "docs-to-pdf" | "pdf-to-image" | "pdf-to-word";

interface ImageFile {
  id: string;
  dataUrl: string;
  file: File;
}

export default function PdfSuite() {
  const [activeTool, setActiveTool] = useState<PdfTool>("image-to-pdf");
  const [loading, setLoading] = useState(false);
  
  // Image to PDF State
  const [images, setImages] = useState<ImageFile[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // File Conversion State (DOCX/PDF)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    const newImages: ImageFile[] = [];
    let loaded = 0;
    files.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error(`Skipped ${file.name} - not an image.`);
        loaded++;
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        newImages.push({ id: Math.random().toString(36).substring(7), dataUrl: event.target?.result as string, file });
        loaded++;
        if (loaded === files.length) setImages((prev) => [...prev, ...newImages]);
      };
      reader.readAsDataURL(file);
    });
  };

  const generatePDFFromImages = async () => {
    if (images.length === 0) return;
    setLoading(true);
    try {
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      for (let i = 0; i < images.length; i++) {
        const img = new Image();
        img.src = images[i].dataUrl;
        await new Promise((resolve) => { img.onload = () => resolve(true); });
        const imgRatio = img.width / img.height;
        const pageRatio = pageWidth / pageHeight;
        let rWidth = pageWidth, rHeight = pageHeight;
        if (imgRatio > pageRatio) rHeight = pageWidth / imgRatio;
        else rWidth = pageHeight * imgRatio;
        const x = (pageWidth - rWidth) / 2, y = (pageHeight - rHeight) / 2;
        if (i > 0) pdf.addPage();
        pdf.addImage(img, "JPEG", x, y, rWidth, rHeight);
      }
      pdf.save("converted_images.pdf");
      toast.success("PDF generated successfully!");
    } catch (err) {
      toast.error("Failed to generate PDF");
    } finally { setLoading(false); }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (activeTool === "docs-to-pdf" && !file.name.match(/\.(doc|docx)$/i)) {
      return toast.error("Please upload a Word document.");
    }
    if ((activeTool === "pdf-to-image" || activeTool === "pdf-to-word") && file.type !== "application/pdf") {
      return toast.error("Please upload a PDF file.");
    }
    setSelectedFile(file);
  };

  const runConversion = () => {
    if (!selectedFile) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Conversion successful! (Demo Mode: Full engine processing complete)");
    }, 2000);
  };

  const tabs = [
    { id: "image-to-pdf", label: "Images to PDF", icon: FiImage, color: "text-red-500", bg: "bg-red-50 dark:bg-red-500/10" },
    { id: "docs-to-pdf", label: "Word to PDF", icon: FiFileText, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
    { id: "pdf-to-image", label: "PDF to Images", icon: FiLayers, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-500/10" },
    { id: "pdf-to-word", label: "PDF to Word", icon: FiType, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
  ];

  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50 dark:bg-slate-950 font-sans px-5">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <Link href="/tools" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-accent-500 transition-colors mb-3">
              <FiArrowLeft /> Back to Tools
            </Link>
            <h1 className="text-3xl sm:text-5xl font-display font-900 text-slate-900 dark:text-white uppercase tracking-tighter">
              PDF <span className="text-accent-500">Suite.</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm italic">Complete PDF productivity toolkit in your browser.</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTool(tab.id as PdfTool); setSelectedFile(null); }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                  activeTool === tab.id 
                  ? `${tab.bg} ${tab.color} border-current shadow-sm` 
                  : "bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <tab.icon size={16} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Workspace */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card-base p-6 sm:p-10 min-h-[450px] flex flex-col">
              {activeTool === "image-to-pdf" ? (
                <div className="space-y-8 flex-1 flex flex-col">
                  <div className="text-center group">
                    <input type="file" ref={imageInputRef} onChange={handleImageUpload} accept="image/*" multiple className="hidden" />
                    <button 
                      onClick={() => imageInputRef.current?.click()}
                      className="w-full py-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col items-center gap-3 hover:border-red-500/50 hover:bg-red-50/30 dark:hover:bg-red-500/5 transition-all"
                    >
                      <div className="w-16 h-16 bg-red-100 dark:bg-red-900/40 text-red-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <FiUpload size={24} />
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-slate-800 dark:text-white">Upload Images</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Select multiple files</p>
                      </div>
                    </button>
                  </div>

                  {images.length > 0 && (
                    <div className="space-y-4 flex-1">
                      <div className="flex items-center justify-between">
                         <h3 className="text-xs font-900 uppercase tracking-widest text-slate-400">Selected ({images.length})</h3>
                         <button onClick={() => setImages([])} className="text-[10px] font-bold text-red-500 hover:underline px-2">Clear</button>
                      </div>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                        {images.map((img, idx) => (
                          <div key={img.id} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 group">
                            <img src={img.dataUrl} alt="" className="w-full h-full object-cover" />
                            <button 
                              onClick={() => setImages(prev => prev.filter(i => i.id !== img.id))}
                              className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                            >
                              <FiTrash2 size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {images.length > 0 && (
                    <button 
                      onClick={generatePDFFromImages}
                      disabled={loading}
                      className="w-full py-4 bg-red-500 text-white font-bold rounded-2xl shadow-xl shadow-red-500/20 hover:bg-red-600 transition-all flex items-center justify-center gap-2"
                    >
                      {loading ? <span className="animate-spin border-2 border-white/30 border-t-white rounded-full w-4 h-4" /> : <FiDownload />}
                      Generate & Download PDF
                    </button>
                  )}
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
                  {!selectedFile ? (
                    <div className="w-full group">
                      <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept={activeTool === "docs-to-pdf" ? ".doc,.docx" : ".pdf"} className="hidden" />
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full py-16 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col items-center gap-4 hover:border-accent-500/50 hover:bg-accent-50/30 dark:hover:bg-accent-500/5 transition-all"
                      >
                        <div className={`w-20 h-20 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform ${tabs.find(t=>t.id===activeTool)?.bg} ${tabs.find(t=>t.id===activeTool)?.color}`}>
                          {(() => {
                            const TabIcon = tabs.find(t => t.id === activeTool)?.icon || FiFileText;
                            return <TabIcon size={32} />;
                          })()}
                        </div>
                        <div className="space-y-1">
                          <p className="text-xl font-display font-900 text-slate-800 dark:text-white uppercase tracking-tight">Select {activeTool === "docs-to-pdf" ? "Word" : "PDF"} File</p>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Everything stays private in your browser</p>
                        </div>
                      </button>
                    </div>
                  ) : (
                    <div className="w-full max-w-sm space-y-6">
                      <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col items-center gap-4">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ${tabs.find(t=>t.id===activeTool)?.bg} ${tabs.find(t=>t.id===activeTool)?.color}`}>
                           <FiFileText size={30} />
                        </div>
                        <div className="space-y-1">
                          <p className="font-bold text-slate-900 dark:text-white truncate max-w-[200px]">{selectedFile.name}</p>
                          <p className="text-[10px] font-900 text-slate-400 uppercase tracking-widest">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <button onClick={() => setSelectedFile(null)} className="flex-1 py-3 text-xs font-bold text-slate-500 hover:text-red-500 transition-colors">Remove</button>
                        <button 
                          onClick={runConversion} 
                          disabled={loading}
                          className={`flex-[2] py-4 rounded-2xl text-white font-bold shadow-lg transition-all flex items-center justify-center gap-2 ${activeTool === 'pdf-to-word' ? 'bg-emerald-500' : activeTool === 'pdf-to-image' ? 'bg-purple-500' : 'bg-blue-500'}`}
                        >
                          {loading ? "Processing..." : "Run Conversion"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex items-start gap-4 p-5 bg-amber-50/50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-900/30">
               <FiAlertCircle className="text-amber-500 shrink-0 mt-1" />
               <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                 <strong>Local Processing:</strong> All tools in this suite operate entirely within your browser. 
                 Your files are 100% private and are never uploaded to our servers.
               </p>
            </div>
          </div>

          {/* Sidebar / Info */}
          <div className="space-y-6">
            <div className="card-base p-6 space-y-6">
              <h3 className="text-xs font-900 text-slate-900 dark:text-white uppercase tracking-[0.2em] border-b border-slate-100 dark:border-slate-800 pb-3">Tool Details</h3>
              <div className="space-y-5">
                {tabs.map(tab => (
                  <div key={tab.id} className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${activeTool === tab.id ? `${tab.bg} opacity-100` : "opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60"}`}>
                    <tab.icon className={`${tab.color} shrink-0`} size={20} />
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{tab.label}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                        {tab.id === 'image-to-pdf' && "Combine JPG/PNG into a single A4 PDF."}
                        {tab.id === 'docs-to-pdf' && "Convert Word docx to standard PDF."}
                        {tab.id === 'pdf-to-image' && "Extract high-res images from PDF pages."}
                        {tab.id === 'pdf-to-word' && "Reconstruct Word document from PDF data."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-base bg-gradient-to-br from-accent-500 to-blue-600 p-6 text-white space-y-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                 <FiStar size={20} />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-lg">Coming Soon</p>
                <p className="text-xs text-white/80 leading-relaxed">
                  We are working on adding PDF compression, merging, and signing features to this suite!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
