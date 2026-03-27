"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  FiArrowLeft,
  FiCrop,
  FiDownload,
  FiImage,
  FiMinimize2,
  FiRefreshCw,
  FiRotateCw,
  FiSettings,
  FiUpload,
} from "react-icons/fi";
import toast from "react-hot-toast";

type ImageTool = "resizer" | "converter" | "compressor" | "crop";

const FORMATS = [
  { label: "PNG", value: "image/png" },
  { label: "JPG/JPEG", value: "image/jpeg" },
  { label: "WEBP", value: "image/webp" },
] as const;

function loadImageDimensions(dataUrl: string): Promise<{ width: number; height: number }>
{
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = dataUrl;
  });
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function dataUrlToImage(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = dataUrl;
  });
}

export default function ImageSuitePage() {
  const [activeTool, setActiveTool] = useState<ImageTool>("resizer");

  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Resizer state
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [maintainRatio, setMaintainRatio] = useState(true);

  // Converter state
  const [format, setFormat] = useState<string>("image/jpeg");
  const [quality, setQuality] = useState(0.9);

  // Compressor state
  const [compressFormat, setCompressFormat] = useState<string>("image/jpeg");
  const [compressQuality, setCompressQuality] = useState(0.8);

  // Crop/Rotate state
  const [crop, setCrop] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [rotation, setRotation] = useState<0 | 90 | 180 | 270>(0);

  const tabs = useMemo(
    () => [
      { id: "resizer", label: "Resize", icon: FiMinimize2, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
      { id: "converter", label: "Convert", icon: FiRefreshCw, color: "text-green-500", bg: "bg-green-50 dark:bg-green-500/10" },
      { id: "compressor", label: "Compress", icon: FiImage, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
      { id: "crop", label: "Crop", icon: FiCrop, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-500/10" },
    ],
    []
  );

  const resetImage = () => {
    setImage(null);
    setDimensions({ width: 0, height: 0 });
    setOriginalDimensions({ width: 0, height: 0 });
    setCrop({ x: 0, y: 0, width: 0, height: 0 });
    setRotation(0);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const dataUrl = event.target?.result as string;
        setImage(dataUrl);
        const dims = await loadImageDimensions(dataUrl);
        setDimensions(dims);
        setOriginalDimensions(dims);
        setCrop({ x: 0, y: 0, width: dims.width, height: dims.height });
      } catch {
        toast.error("Failed to read image.");
        resetImage();
      }
    };
    reader.readAsDataURL(file);
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const w = parseInt(e.target.value) || 0;
    if (maintainRatio && originalDimensions.width > 0) {
      const ratio = originalDimensions.height / originalDimensions.width;
      setDimensions({ width: w, height: Math.round(w * ratio) });
    } else {
      setDimensions((prev) => ({ ...prev, width: w }));
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const h = parseInt(e.target.value) || 0;
    if (maintainRatio && originalDimensions.height > 0) {
      const ratio = originalDimensions.width / originalDimensions.height;
      setDimensions({ width: Math.round(h * ratio), height: h });
    } else {
      setDimensions((prev) => ({ ...prev, height: h }));
    }
  };

  const downloadResized = () => {
    if (!image) return;

    const canvas = document.createElement("canvas");
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      toast.error("Canvas not supported.");
      return;
    }

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, dimensions.width, dimensions.height);
      const link = document.createElement("a");
      link.download = `resized_image_${dimensions.width}x${dimensions.height}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      toast.success("Image downloaded successfully!");
    };
    img.onerror = () => toast.error("Failed to resize image.");
    img.src = image;
  };

  const downloadConverted = () => {
    if (!image) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      toast.error("Canvas not supported.");
      return;
    }

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      if (format === "image/jpeg") {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);

      const link = document.createElement("a");
      const ext = format.split("/")[1];
      link.download = `converted_image.${ext}`;
      link.href = canvas.toDataURL(format, quality);
      link.click();
      toast.success(`Image converted to ${ext.toUpperCase()} successfully!`);
    };
    img.onerror = () => toast.error("Failed to convert image.");
    img.src = image;
  };

  const downloadCompressed = async () => {
    if (!image) return;
    try {
      const img = await dataUrlToImage(image);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return toast.error("Canvas not supported.");

      canvas.width = img.width;
      canvas.height = img.height;

      if (compressFormat === "image/jpeg") {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);

      const ext = compressFormat.split("/")[1];
      const dataUrl = canvas.toDataURL(compressFormat, compressQuality);
      const link = document.createElement("a");
      link.download = `compressed.${ext}`;
      link.href = dataUrl;
      link.click();
      toast.success("Compressed image downloaded!");
    } catch {
      toast.error("Failed to compress image.");
    }
  };

  const downloadCropped = async () => {
    if (!image) return;
    try {
      const img = await dataUrlToImage(image);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return toast.error("Canvas not supported.");

      const safeX = clamp(crop.x, 0, img.width);
      const safeY = clamp(crop.y, 0, img.height);
      const safeW = clamp(crop.width, 1, img.width - safeX);
      const safeH = clamp(crop.height, 1, img.height - safeY);

      const radians = (rotation * Math.PI) / 180;

      // Output canvas size depends on rotation
      const outW = rotation === 90 || rotation === 270 ? safeH : safeW;
      const outH = rotation === 90 || rotation === 270 ? safeW : safeH;
      canvas.width = outW;
      canvas.height = outH;

      // Draw cropped region into a temp canvas first
      const temp = document.createElement("canvas");
      const tctx = temp.getContext("2d");
      if (!tctx) return toast.error("Canvas not supported.");
      temp.width = safeW;
      temp.height = safeH;
      tctx.drawImage(img, safeX, safeY, safeW, safeH, 0, 0, safeW, safeH);

      // Rotate onto output
      ctx.save();
      ctx.translate(outW / 2, outH / 2);
      ctx.rotate(radians);
      ctx.drawImage(temp, -safeW / 2, -safeH / 2);
      ctx.restore();

      const link = document.createElement("a");
      link.download = `cropped_${rotation}deg.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      toast.success("Cropped image downloaded!");
    } catch {
      toast.error("Failed to crop image.");
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50 dark:bg-slate-950 font-sans px-5">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-accent-500 transition-colors mb-3"
            >
              <FiArrowLeft /> Back to Tools
            </Link>
            <h1 className="text-3xl sm:text-5xl font-display font-900 text-slate-900 dark:text-white uppercase tracking-tighter">
              Image <span className="text-accent-500">Suite.</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm italic">
              Resize and convert images entirely in your browser.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTool(tab.id as ImageTool)}
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

        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload / Preview */}
          <div className="card-base p-8 space-y-6 flex flex-col items-center justify-center min-h-[420px]">
            {image ? (
              <div className="relative w-full h-full flex flex-col items-center gap-4">
                <div className="w-full h-64 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden flex items-center justify-center bg-slate-100 dark:bg-slate-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image} alt="Preview" className="max-w-full max-h-full object-contain" />
                </div>
                <button
                  onClick={resetImage}
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
                  className="w-full py-16 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl flex flex-col items-center gap-4 hover:border-accent-500 dark:hover:border-accent-500 hover:bg-accent-50 dark:hover:bg-accent-500/10 transition-all group"
                >
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-900 text-accent-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
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

          {/* Controls */}
          <div className={`card-base p-8 space-y-8 ${!image ? "opacity-50 pointer-events-none grayscale" : ""}`}>
            {activeTool === "resizer" ? (
              <>
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
              </>
            ) : activeTool === "converter" ? (
              <>
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
                            ? "border-green-500 bg-green-50 dark:bg-green-500/20 text-green-600 dark:text-green-400 shadow-inner"
                            : "border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-300 dark:hover:border-slate-600"
                        }`}
                      >
                        {fmt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {(format === "image/jpeg" || format === "image/webp") && (
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
              </>
            ) : activeTool === "compressor" ? (
              <>
                <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <FiImage className="text-amber-500" />
                  <h3 className="font-bold text-slate-900 dark:text-white">Compression Settings</h3>
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Format</label>
                  <div className="grid grid-cols-3 gap-3">
                    {FORMATS.map((fmt) => (
                      <button
                        key={fmt.value}
                        onClick={() => setCompressFormat(fmt.value)}
                        className={`py-3 rounded-xl text-sm font-bold transition-all border ${
                          compressFormat === fmt.value
                            ? "border-amber-500 bg-amber-50 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400"
                            : "border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-300 dark:hover:border-slate-600"
                        }`}
                      >
                        {fmt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {(compressFormat === "image/jpeg" || compressFormat === "image/webp") && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Quality</label>
                      <span className="text-xs font-bold text-amber-500">{Math.round(compressQuality * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.05"
                      value={compressQuality}
                      onChange={(e) => setCompressQuality(parseFloat(e.target.value))}
                      className="w-full accent-amber-500 h-2 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none outline-none"
                    />
                  </div>
                )}

                <button
                  onClick={downloadCompressed}
                  className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50"
                >
                  <FiDownload size={18} /> Compress & Download
                </button>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <FiCrop className="text-purple-500" />
                  <h3 className="font-bold text-slate-900 dark:text-white">Crop & Rotate</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">X</label>
                    <input
                      type="number"
                      value={crop.x}
                      onChange={(e) => setCrop((p) => ({ ...p, x: parseInt(e.target.value) || 0 }))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-medium outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Y</label>
                    <input
                      type="number"
                      value={crop.y}
                      onChange={(e) => setCrop((p) => ({ ...p, y: parseInt(e.target.value) || 0 }))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-medium outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Width</label>
                    <input
                      type="number"
                      value={crop.width}
                      onChange={(e) => setCrop((p) => ({ ...p, width: parseInt(e.target.value) || 0 }))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-medium outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Height</label>
                    <input
                      type="number"
                      value={crop.height}
                      onChange={(e) => setCrop((p) => ({ ...p, height: parseInt(e.target.value) || 0 }))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-medium outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Rotation</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[0, 90, 180, 270].map((deg) => (
                      <button
                        key={deg}
                        onClick={() => setRotation(deg as 0 | 90 | 180 | 270)}
                        className={`py-3 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-2 ${
                          rotation === deg
                            ? "border-purple-500 bg-purple-50 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400"
                            : "border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-300 dark:hover:border-slate-600"
                        }`}
                      >
                        <FiRotateCw size={14} /> {deg}°
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={downloadCropped}
                  className="w-full py-4 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
                >
                  <FiDownload size={18} /> Crop & Download
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
