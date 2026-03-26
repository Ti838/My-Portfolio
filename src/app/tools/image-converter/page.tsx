"use client";

import { useState, useRef } from "react";
import { FiUpload, FiDownload, FiImage, FiArrowLeft, FiRefreshCw } from "react-icons/fi";
import Link from "next/link";
import toast from "react-hot-toast";

const FORMATS = [
  { label: "PNG", value: "image/png" },
  { label: "JPG/JPEG", value: "image/jpeg" },
  { label: "WEBP", value: "image/webp" },
];

export default function ImageConverter() {
  const [image, setImage] = useState<string | null>(null);
  const [format, setFormat] = useState("image/jpeg");
  const [quality, setQuality] = useState(0.9);
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
      setImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const downloadConverted = () => {
    if (!image) return;
    
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      // Handle transparent backgrounds when converting PNG/WEBP to JPEG
      if (format === "image/jpeg") {
        ctx!.fillStyle = "#FFFFFF";
        ctx!.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      ctx?.drawImage(img, 0, 0);
      
      const link = document.createElement("a");
      const ext = format.split("/")[1];
      link.download = `converted_image.${ext}`;
      link.href = canvas.toDataURL(format, quality);
      link.click();
      toast.success(`Image converted to ${ext.toUpperCase()} successfully!`);
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
            Image <span className="text-green-500">Converter</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Change image formats seamlessly in the browser. 100% private and offline.
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
                  Change Image
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
                  className="w-full py-16 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl flex flex-col items-center gap-4 hover:border-green-500 dark:hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-500/10 transition-all group"
                >
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 text-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
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
               <FiRefreshCw className="text-green-500" />
               <h3 className="font-bold text-slate-900 dark:text-white">Conversion Settings</h3>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Target Format</label>
              <div className="grid grid-cols-3 gap-3">
                 {FORMATS.map((fmt) => (
                    <button
                      key={fmt.value}
                      onClick={() => setFormat(fmt.value)}
                      className={`py-3 rounded-xl text-sm font-bold transition-all border ${
                        format === fmt.value 
                          ? 'border-green-500 bg-green-50 dark:bg-green-500/20 text-green-600 dark:text-green-400 shadow-inner' 
                          : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                    >
                      {fmt.label}
                    </button>
                 ))}
              </div>
            </div>

            {(format === 'image/jpeg' || format === 'image/webp') && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Quality</label>
                  <span className="text-xs font-bold text-green-500">{Math.round(quality * 100)}%</span>
                </div>
                <input 
                  type="range" 
                  min="0.1" 
                  max="1" 
                  step="0.1" 
                  value={quality} 
                  onChange={(e) => setQuality(parseFloat(e.target.value))}
                  className="w-full accent-green-500 h-2 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none outline-none"
                />
              </div>
            )}

             <button 
              onClick={downloadConverted}
              className="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-500/30 hover:shadow-green-500/50"
            >
              <FiDownload size={18} /> Convert & Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
