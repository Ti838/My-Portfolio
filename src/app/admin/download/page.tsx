"use client";
import { useState } from "react";
import { FiDownload, FiAlertCircle, FiCheckCircle } from "react-icons/fi";

type Status = "idle" | "loading" | "success" | "error";

export default function ResumeDownloadPage() {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const verify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (token.length !== 6 || !/^\d+$/.test(token)) {
      setStatus("error");
      setMessage("Enter the 6-digit code from Google Authenticator.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/resume", {
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
      
      // TRIGGER DOWNLOAD
      setStatus("success");
      setMessage("Success! Your download is starting...");
      window.location.href = data.url;
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center px-5 font-sans">
      <div className="w-full max-w-md">
        <div className="card-base p-8 space-y-7 shadow-2xl border border-slate-100 dark:border-slate-800">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-accent-50 dark:bg-accent-900/30 flex items-center justify-center mx-auto text-accent-500">
               <FiDownload size={26} />
            </div>
            <h1 className="font-display font-900 text-2xl text-slate-900 dark:text-white uppercase tracking-tight">Download Resume</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              Please enter the security code to access documents.
            </p>
          </div>

          {/* TOTP form */}
          <form onSubmit={verify} className="space-y-4">
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={token}
              onChange={(e) => {
                setToken(e.target.value.replace(/\D/g, ""));
                setStatus("idle");
              }}
              placeholder="000000"
              className="w-full px-4 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-center text-3xl font-mono tracking-[0.5em] focus:ring-2 focus:ring-accent-500 outline-none placeholder-slate-200"
            />

            {status === "error" && (
              <div className="flex items-center gap-2 text-red-500 text-xs bg-red-50 dark:bg-red-900/10 p-3 rounded-lg font-bold">
                <FiAlertCircle size={14} /> {message}
              </div>
            )}
            {status === "success" && (
              <div className="flex items-center gap-2 text-green-600 text-xs bg-green-50 dark:bg-green-900/10 p-3 rounded-lg font-bold">
                <FiCheckCircle size={14} /> {message}
              </div>
            )}

            <button
              type="submit"
              disabled={token.length < 6 || status === "loading"}
              className="btn-primary w-full justify-center h-12 shadow-lg shadow-accent-500/20"
            >
              {status === "loading" ? "Verifying..." : <><FiDownload size={16} /> Get PDF Now</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
