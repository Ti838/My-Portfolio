"use client";

import { useState, useRef } from "react";
import { FiUpload, FiDownload, FiTrash2, FiArrowLeft, FiImage } from "react-icons/fi";
import Link from "next/link";
import { jsPDF } from "jspdf";
import toast from "react-hot-toast";

interface ImageFile {
  id: string;
  dataUrl: string;
  file: File;
}

export default function ImageToPdf() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [loading, setLoading] = useState(false);
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
        newImages.push({
          id: Math.random().toString(36).substring(7),
          dataUrl: event.target?.result as string,
          file,
        });
        
        loaded++;
        if (loaded === files.length) {
          setImages((prev) => [...prev, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id: string) => {
    setImages(images.filter((img) => img.id !== id));
  };

  const generatePDF = async () => {
    if (images.length === 0) return;
    setLoading(true);

    try {
      // Default to A4 format
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      for (let i = 0; i < images.length; i++) {
        const img = new Image();
        img.src = images[i].dataUrl;
        
        await new Promise((resolve) => {
          img.onload = () => resolve(true);
        });

        // Calculate aspect ratio
        const imgRatio = img.width / img.height;
        const pageRatio = pageWidth / pageHeight;

        let renderWidth = pageWidth;
        let renderHeight = pageHeight;

        if (imgRatio > pageRatio) {
           renderHeight = pageWidth / imgRatio;
        } else {
           renderWidth = pageHeight * imgRatio;
        }

        // Center the image
        const x = (pageWidth - renderWidth) / 2;
        const y = (pageHeight - renderHeight) / 2;

        if (i > 0) {
          pdf.addPage();
        }
        
        // Use JPEG for PDF to keep it small
        pdf.addImage(img, "JPEG", x, y, renderWidth, renderHeight);
      }

      pdf.save("converted_images.pdf");
      toast.success("PDF generated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate PDF");
    } finally {
      setLoading(false);
    }
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
              Image to <span className="text-red-500">PDF</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Combine multiple images into a single PDF document instantly.
            </p>
          </div>
          <button 
            onClick={generatePDF}
            disabled={images.length === 0 || loading}
            className="py-3 px-6 bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-500/30"
          >
            {loading ? (
              <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Generating...</>
            ) : (
              <><FiDownload size={18} /> Download PDF</>
            )}
          </button>
        </div>

        <div className="card-base p-6 sm:p-8 space-y-8 min-h-[400px]">
          {/* Upload Area */}
          <div className="text-center w-full">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              accept="image/*" 
              multiple
              className="hidden" 
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-12 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl flex flex-col items-center gap-3 hover:border-red-500 dark:hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all group"
            >
              <div className="w-14 h-14 bg-red-100 dark:bg-red-900/50 text-red-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <FiUpload size={20} />
              </div>
              <div>
                <span className="font-bold text-slate-700 dark:text-slate-300 block">Select Images</span>
                <span className="text-xs text-slate-400 font-medium tracking-wide">Select multiple images to combine</span>
              </div>
            </button>
          </div>

          {/* Image Grid */}
          {images.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                 <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                   <FiImage className="text-red-500" /> Selected Images ({images.length})
                 </h3>
                 <button onClick={() => setImages([])} className="text-xs font-bold text-slate-400 hover:text-red-500 uppercase tracking-widest">
                   Clear All
                 </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {images.map((img, idx) => (
                  <div key={img.id} className="relative group aspect-[3/4] bg-slate-100 dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                    <div className="absolute top-2 left-2 z-10 w-6 h-6 bg-black/50 backdrop-blur-md rounded-full text-white text-[10px] font-bold flex items-center justify-center">
                      {idx + 1}
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.dataUrl} alt={`Page ${idx + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                       <button 
                         onClick={() => removeImage(img.id)}
                         className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:scale-110 hover:bg-red-600 transition-all shadow-xl"
                       >
                         <FiTrash2 size={16} />
                       </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
