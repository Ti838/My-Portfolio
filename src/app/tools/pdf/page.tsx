"use client";

import { useState, useRef } from "react";
import { 
  FiUpload, FiDownload, FiTrash2, FiArrowLeft, FiImage, 
  FiFileText, FiLayers, FiAlertCircle, FiStar, FiRotateCw 
} from "react-icons/fi";
import Link from "next/link";
import { jsPDF } from "jspdf";
import toast from "react-hot-toast";
import { PDFDocument, degrees } from "pdf-lib";

type PdfTool = "image-to-pdf" | "merge" | "split" | "rotate";

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

  // File State (PDF)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Merge state
  const [mergeFiles, setMergeFiles] = useState<File[]>([]);
  const mergeInputRef = useRef<HTMLInputElement>(null);

  // Split state
  const [splitRange, setSplitRange] = useState("1-1");

  // Rotate state
  const [rotateDegrees, setRotateDegrees] = useState<90 | 180 | 270>(90);

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
    if ((activeTool === "split" || activeTool === "rotate") && file.type !== "application/pdf") {
      return toast.error("Please upload a PDF file.");
    }
    setSelectedFile(file);
  };

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleMergeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    const onlyPdf = files.filter((f) => f.type === "application/pdf");
    const skipped = files.length - onlyPdf.length;
    if (skipped > 0) toast.error(`Skipped ${skipped} non-PDF file(s).`);
    setMergeFiles((prev) => [...prev, ...onlyPdf]);
  };

  const mergePdfs = async () => {
    if (mergeFiles.length < 2) {
      toast.error("Select at least 2 PDF files.");
      return;
    }
    setLoading(true);
    try {
      const merged = await PDFDocument.create();
      for (const file of mergeFiles) {
        const bytes = await file.arrayBuffer();
        const doc = await PDFDocument.load(bytes);
        const pages = await merged.copyPages(doc, doc.getPageIndices());
        pages.forEach((p) => merged.addPage(p));
      }
      const out = await merged.save();
      // `pdf-lib` returns Uint8Array; TS BlobPart typing can differ across DOM lib versions.
      // Use a plain Uint8Array view to satisfy the compiler.
      downloadBlob(new Blob([new Uint8Array(out)], { type: "application/pdf" }), "merged.pdf");
      toast.success("Merged PDF downloaded!");
    } catch {
      toast.error("Failed to merge PDFs.");
    } finally {
      setLoading(false);
    }
  };

  const parseRange = (rangeText: string) => {
    const m = rangeText.trim().match(/^\s*(\d+)\s*-\s*(\d+)\s*$/);
    if (!m) return null;
    const start = Number(m[1]);
    const end = Number(m[2]);
    if (!Number.isFinite(start) || !Number.isFinite(end) || start < 1 || end < start) return null;
    return { start, end };
  };

  const splitPdfByRange = async () => {
    if (!selectedFile) return;
    const parsed = parseRange(splitRange);
    if (!parsed) {
      toast.error("Enter range like 1-3");
      return;
    }
    setLoading(true);
    try {
      const bytes = await selectedFile.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      const total = doc.getPageCount();
      if (parsed.end > total) {
        toast.error(`PDF has only ${total} page(s).`);
        setLoading(false);
        return;
      }
      const outDoc = await PDFDocument.create();
      const pageIndices = Array.from({ length: parsed.end - parsed.start + 1 }, (_, i) => parsed.start - 1 + i);
      const pages = await outDoc.copyPages(doc, pageIndices);
      pages.forEach((p) => outDoc.addPage(p));
      const out = await outDoc.save();
      downloadBlob(new Blob([new Uint8Array(out)], { type: "application/pdf" }), `extracted_${parsed.start}-${parsed.end}.pdf`);
      toast.success("Extracted PDF downloaded!");
    } catch {
      toast.error("Failed to split PDF.");
    } finally {
      setLoading(false);
    }
  };

  const rotatePdf = async () => {
    if (!selectedFile) return;
    setLoading(true);
    try {
      const bytes = await selectedFile.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      doc.getPages().forEach((p) => {
        p.setRotation(degrees(rotateDegrees));
      });
      const out = await doc.save();
      downloadBlob(new Blob([new Uint8Array(out)], { type: "application/pdf" }), `rotated_${rotateDegrees}.pdf`);
      toast.success("Rotated PDF downloaded!");
    } catch {
      toast.error("Failed to rotate PDF.");
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "image-to-pdf", label: "Images to PDF", icon: FiImage, color: "text-red-500", bg: "bg-red-50 dark:bg-red-500/10" },
    { id: "merge", label: "Merge PDFs", icon: FiLayers, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-500/10" },
    { id: "split", label: "Split/Extract", icon: FiStar, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
    { id: "rotate", label: "Rotate", icon: FiRotateCw, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
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
              ) : activeTool === "merge" ? (
                <div className="space-y-8 flex-1 flex flex-col">
                  <div className="text-center group">
                    <input type="file" ref={mergeInputRef} onChange={handleMergeUpload} accept="application/pdf" multiple className="hidden" />
                    <button
                      onClick={() => mergeInputRef.current?.click()}
                      className="w-full py-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col items-center gap-3 hover:border-purple-500/50 hover:bg-purple-50/30 dark:hover:bg-purple-500/5 transition-all"
                    >
                      <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/40 text-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <FiUpload size={24} />
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-slate-800 dark:text-white">Upload PDFs</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Select 2+ files</p>
                      </div>
                    </button>
                  </div>

                  {mergeFiles.length > 0 && (
                    <div className="space-y-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-900 uppercase tracking-widest text-slate-400">Selected ({mergeFiles.length})</h3>
                        <button onClick={() => setMergeFiles([])} className="text-[10px] font-bold text-red-500 hover:underline px-2">Clear</button>
                      </div>
                      <div className="space-y-2">
                        {mergeFiles.map((f, idx) => (
                          <div key={`${f.name}-${idx}`} className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40">
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{f.name}</p>
                              <p className="text-[10px] font-900 text-slate-400 uppercase tracking-widest">{(f.size / 1024).toFixed(1)} KB</p>
                            </div>
                            <button
                              onClick={() => setMergeFiles((prev) => prev.filter((_, i) => i !== idx))}
                              className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-red-500 hover:border-red-500/30 transition-colors flex items-center justify-center"
                            >
                              <FiTrash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {mergeFiles.length > 1 && (
                    <button
                      onClick={mergePdfs}
                      disabled={loading}
                      className="w-full py-4 bg-purple-500 text-white font-bold rounded-2xl shadow-xl shadow-purple-500/20 hover:bg-purple-600 transition-all flex items-center justify-center gap-2"
                    >
                      {loading ? <span className="animate-spin border-2 border-white/30 border-t-white rounded-full w-4 h-4" /> : <FiDownload />}
                      Merge & Download
                    </button>
                  )}
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
                  {!selectedFile ? (
                    <div className="w-full group">
                      <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept={".pdf"} className="hidden" />
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
                          <p className="text-xl font-display font-900 text-slate-800 dark:text-white uppercase tracking-tight">Select PDF File</p>
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
                          onClick={activeTool === "split" ? splitPdfByRange : activeTool === "rotate" ? rotatePdf : () => toast.error("This tool is not available offline yet.")}
                          disabled={loading}
                          className={`flex-[2] py-4 rounded-2xl text-white font-bold shadow-lg transition-all flex items-center justify-center gap-2 ${activeTool === 'split' ? 'bg-emerald-500' : activeTool === 'rotate' ? 'bg-amber-500' : 'bg-blue-500'}`}
                        >
                          {loading ? "Processing..." : activeTool === "split" ? "Extract Pages" : activeTool === "rotate" ? "Rotate PDF" : "Run"}
                        </button>
                      </div>

                      {activeTool === "split" && (
                        <div className="space-y-2">
                          <label className="text-[10px] font-900 uppercase tracking-widest text-slate-400">Page Range</label>
                          <input
                            value={splitRange}
                            onChange={(e) => setSplitRange(e.target.value)}
                            placeholder="1-3"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                          <p className="text-[10px] text-slate-400 font-medium">Example: 1-3 will extract pages 1 to 3 into a new PDF.</p>
                        </div>
                      )}

                      {activeTool === "rotate" && (
                        <div className="space-y-2">
                          <label className="text-[10px] font-900 uppercase tracking-widest text-slate-400">Rotate Degrees</label>
                          <div className="grid grid-cols-3 gap-2">
                            {[90, 180, 270].map((d) => (
                              <button
                                key={d}
                                onClick={() => setRotateDegrees(d as 90 | 180 | 270)}
                                className={`py-3 rounded-xl text-xs font-bold transition-all border ${
                                  rotateDegrees === d
                                    ? "border-amber-500 bg-amber-50 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400"
                                    : "border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300 dark:hover:border-slate-700"
                                }`}
                              >
                                {d}°
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
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
                        {tab.id === 'merge' && "Merge multiple PDFs into one file."}
                        {tab.id === 'split' && "Extract a page range into a new PDF."}
                        {tab.id === 'rotate' && "Rotate all pages and download."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
