"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FiDownload, FiAlertCircle, FiCheckCircle, FiLock } from "react-icons/fi";

import ResumeBuilder from "@/components/ResumeBuilder";
import type { ResumeData } from "@/components/ResumePDF";

type Status = "idle" | "loading" | "success" | "error";

export default function ResumeDownloadBuilderClient({
  initialResumeData,
  initiallyVerified,
}: {
  initialResumeData: ResumeData;
  initiallyVerified: boolean;
}) {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [verified, setVerified] = useState(initiallyVerified);

  useEffect(() => {
    setVerified(initiallyVerified);
  }, [initiallyVerified]);

  const canUnlock = useMemo(() => token.length === 6 && /^\d{6}$/.test(token), [token]);

  const verify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canUnlock) {
      setStatus("error");
      setMessage("Enter the 6-digit code from Google Authenticator.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/totp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Invalid or expired code. Try again.");
        return;
      }
      setStatus("success");
      setMessage("Unlocked for 10 minutes.");
      setVerified(true);
      setToken("");
      router.refresh();
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="pt-24 pb-6 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-display font-900 text-slate-900 dark:text-white">Resume / CV Preview & Download</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">Auto-filled from your website data. Edit, preview, then download.</p>
            </div>

            <form onSubmit={verify} className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2">
                <FiLock className={verified ? "text-green-600" : "text-slate-400"} />
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={token}
                  onChange={(e) => {
                    setToken(e.target.value.replace(/\D/g, ""));
                    setStatus("idle");
                  }}
                  placeholder={verified ? "Unlocked" : "000000"}
                  disabled={verified}
                  className="w-32 bg-transparent text-slate-900 dark:text-white text-center font-mono tracking-[0.3em] outline-none placeholder-slate-300 disabled:opacity-60"
                />
              </div>
              <button
                type="submit"
                disabled={verified || status === "loading" || !canUnlock}
                className="btn-primary h-11 px-4 text-sm"
              >
                {status === "loading" ? "Verifying..." : "Unlock"}
              </button>
            </form>
          </div>

          {(status === "error" || status === "success") && message && (
            <div
              className={`mt-4 flex items-center gap-2 text-xs p-3 rounded-xl font-bold border ${
                status === "error"
                  ? "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/30"
                  : "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-900/30"
              }`}
            >
              {status === "error" ? <FiAlertCircle size={14} /> : <FiCheckCircle size={14} />}
              {message}
            </div>
          )}
        </div>
      </div>

      <div className={verified ? "" : "opacity-60 pointer-events-none select-none"}>
        <ResumeBuilder initialData={initialResumeData} />
      </div>

      {!verified && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-bold">
          <FiLock /> Enter 2FA code to enable edit & download
        </div>
      )}
    </div>
  );
}
