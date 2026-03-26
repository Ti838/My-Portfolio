"use client";
import { useState, useEffect } from "react";
import { FiSmartphone, FiCopy, FiCheckCircle, FiAlertCircle, FiRefreshCw } from "react-icons/fi";

export default function TotpSetupPage() {
  const [setupKey, setSetupKey] = useState("");
  const [data, setData] = useState<any>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);

  const loadSetup = async () => {
    if (!setupKey) return;
    setStatus("loading");
    setData(null);
    try {
      const res = await fetch(`/api/admin/setup-totp?key=${encodeURIComponent(setupKey)}`);
      const json = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(json.error ?? "Unauthorized. Check your TOTP_SETUP_KEY.");
        return;
      }
      setData(json);
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Failed to reach the server. Is the dev server running?");
    }
  };

  const copy = () => {
    if (!data?.base32) return;
    navigator.clipboard.writeText(data.base32);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center px-5 py-20 transition-colors duration-500">
      <div className="w-full max-w-lg space-y-6 relative z-10">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-purple-50 dark:bg-purple-500/20 border border-purple-100 dark:border-purple-500/30 flex items-center justify-center mx-auto shadow-2xl shadow-purple-500/10 dark:shadow-purple-500/20">
            <FiSmartphone size={28} className="text-purple-500 dark:text-purple-400" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">2FA Setup</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Link Google Authenticator to your portfolio admin.</p>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700/50 rounded-3xl p-7 shadow-xl space-y-5">
          {/* Guard Key Input */}
          {!data && (
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Setup Key</label>
              <p className="text-xs text-slate-600 dark:text-slate-500">Enter your <code className="text-purple-500 dark:text-purple-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">TOTP_SETUP_KEY</code> from your <code className="text-purple-500 dark:text-purple-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">.env.local</code> file.</p>
              <input
                type="text"
                value={setupKey}
                onChange={e => setSetupKey(e.target.value)}
                placeholder="my-secret-setup-key"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all text-sm font-mono"
                onKeyDown={e => e.key === "Enter" && loadSetup()}
              />
              {status === "error" && (
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-xs bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 p-3 rounded-xl font-medium">
                  <FiAlertCircle size={14} className="flex-shrink-0" /> {errorMsg}
                </div>
              )}
              <button onClick={loadSetup} disabled={!setupKey || status === "loading"} className="w-full h-11 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-purple-500/25">
                {status === "loading" ? <><FiRefreshCw size={14} className="animate-spin" /> Generating…</> : "Generate QR Code"}
              </button>
            </div>
          )}

          {/* QR Code + Instructions */}
          {data && (
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-xs bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20 p-3 rounded-xl font-semibold">
                <FiCheckCircle size={14} /> Secret generated! Follow the steps below.
              </div>
              
              <div className="space-y-4">
                <p className="text-sm font-bold text-slate-800 dark:text-white">Step 1 — Scan QR Code</p>
                <div className="flex justify-center p-4 bg-white border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={data.qr_code_data_url} alt="QR Code" className="w-48 h-48" />
                </div>

                <p className="text-sm font-bold text-slate-800 dark:text-white">Step 2 — Or Enter Key Manually</p>
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3">
                  <code className="flex-1 text-sm text-purple-600 dark:text-purple-400 font-mono break-all font-semibold">{data.base32}</code>
                  <button onClick={copy} className="flex-shrink-0 p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-500 hover:text-slate-900 dark:hover:text-white">
                    {copied ? <FiCheckCircle size={18} className="text-green-500" /> : <FiCopy size={18} />}
                  </button>
                </div>

                <p className="text-sm font-bold text-slate-800 dark:text-white mt-5">Step 3 — Save to Environment</p>
                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Add this to your Vercel Environment Variables:</p>
                  <code className="text-sm text-green-600 dark:text-green-400 font-mono font-bold bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-green-100 dark:border-green-500/20 block select-all">TOTP_SECRET = {data.base32}</code>
                </div>

                <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl p-4 mt-2">
                  <p className="text-xs text-amber-700 dark:text-amber-400 font-semibold leading-relaxed">⚠️ Security: After setup, remove <code>TOTP_SETUP_KEY</code> from your environment variables to disable this page.</p>
                </div>

                <button onClick={() => setData(null)} className="w-full text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-400 transition-colors py-3 font-medium mt-2">
                  ← Regenerate
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-slate-500 font-medium">
          Once linked, go to <a href="/admin" className="text-purple-600 dark:text-accent-400 hover:text-purple-700 dark:hover:text-accent-300 font-bold transition-colors">Admin Login →</a>
        </p>
      </div>
    </div>
  );
}
