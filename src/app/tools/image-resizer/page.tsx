"use client";

import { useState, useRef } from "react";
import { FiUpload, FiDownload, FiImage, FiSettings, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ImageResizer() {
  const [image, setImage] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [maintainRatio, setMaintainRatio] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setImage(event.target?.result as string);
        setDimensions({ width: img.width, height: img.height });
        setOriginalDimensions({ width: img.width, height: img.height });
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const w = parseInt(e.target.value) || 0;
    if (maintainRatio && originalDimensions.width > 0) {
      const ratio = originalDimensions.height / originalDimensions.width;
      setDimensions({ width: w, height: Math.round(w * ratio) });
    } else {
      setDimensions({ ...dimensions, width: w });
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const h = parseInt(e.target.value) || 0;
    if (maintainRatio && originalDimensions.height > 0) {
      const ratio = originalDimensions.width / originalDimensions.height;
      setDimensions({ width: Math.round(h * ratio), height: h });
    } else {
      setDimensions({ ...dimensions, height: h });
    }
  };

  const downloadResized = () => {
    if (!image) return;
    
    const canvas = document.createElement("canvas");
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      ctx?.drawImage(img, 0, 0, dimensions.width, dimensions.height);
      const link = document.createElement("a");
      link.download = `resized_image_${dimensions.width}x${dimensions.height}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      toast.success("Image downloaded successfully!");
    };
    img.src = image;
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50 dark:bg-slate-950 font-sans px-5">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <Link href="/tools" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-accent-500 transition-colors mb-4">
            <FiArrowLeft /> Back to Tools
          </Link>
          <h1 className="text-3xl sm:text-4xl font-display font-900 text-slate-900 dark:text-white uppercase tracking-tighter">
            Image <span className="text-blue-500">Resizer</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Resize your images instantly in the browser. No server uploads required.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload Area */}
          <div className="card-base p-8 space-y-6 flex flex-col items-center justify-center min-h-[400px]">
            {image ? (
              <div className="relative w-full h-full flex flex-col items-center gap-4">
                <div className="w-full h-64 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden flex items-center justify-center bg-slate-100 dark:bg-slate-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image} alt="Preview" className="max-w-full max-h-full object-contain" />
                </div>
                <button 
                  onClick={() => setImage(null)}
                  className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-red-500 transition-colors"
                >
                  Clear Image
                </button>
              </div>
            ) : (
              <div className="text-center w-full">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  accept="image/*" 
                  className="hidden" 
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-16 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl flex flex-col items-center gap-4 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all group"
                >
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 text-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FiUpload size={24} />
                  </div>
                  <div>
                    <span className="font-bold text-slate-700 dark:text-slate-300 block">Click to Upload Image</span>
                    <span className="text-xs text-slate-400 font-medium">JPEG, PNG, WEBP</span>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Controls Area */}
          <div className={`card-base p-8 space-y-8 ${!image ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
               <FiSettings className="text-blue-500" />
               <h3 className="font-bold text-slate-900 dark:text-white">Resize Settings</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Width (px)</label>
                <input 
                  type="number" 
                  value={dimensions.width} 
                  onChange={handleWidthChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Height (px)</label>
                <input 
                  type="number" 
                  value={dimensions.height} 
                  onChange={handleHeightChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={maintainRatio} 
                onChange={(e) => setMaintainRatio(e.target.checked)}
                className="w-5 h-5 rounded text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Maintain Aspect Ratio</span>
            </label>

            <button 
              onClick={downloadResized}
              className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
            >
              <FiDownload size={18} /> Download Resized Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
