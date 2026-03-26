"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiShield, FiLock, FiAlertCircle, FiCheckCircle, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { loginAdminAction } from "@/lib/admin-actions";
import { useAdmin } from "@/components/admin/AdminProvider";

type Step = "password" | "totp";
type Status = "idle" | "loading" | "error" | "success";

export default function AdminLoginPage() {
  const [step, setStep] = useState<Step>("password");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const { login } = useAdmin();

  const handlePasswordStep = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || password.length < 4) {
      setStatus("error");
      setErrorMsg("Please enter your admin password.");
      return;
    }
    setStatus("loading");
    // Move to TOTP step (password is verified together with TOTP on the backend)
    setTimeout(() => {
      setStatus("idle");
      setStep("totp");
    }, 500);
  };

  const handleTotpStep = async (e: React.FormEvent) => {
    e.preventDefault();
    if (token.length !== 6) {
      setStatus("error");
      setErrorMsg("Enter the 6-digit code from Google Authenticator.");
      return;
    }
    setStatus("loading");
    try {
      const result = await loginAdminAction(password, token);
      if (!result.success) {
        setStatus("error");
        setErrorMsg(result.error ?? "Invalid credentials. Try again.");
        if (result.back) setStep("password");
        return;
      }
      setStatus("success");
      login();
      setTimeout(() => router.push("/"), 800);
    } catch {
      setStatus("error");
      setErrorMsg("Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center px-5 relative overflow-hidden transition-colors duration-500">
      {/* Animated glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="w-full max-w-sm relative z-10">
        {/* Logo / Header */}
        <div className="text-center mb-8 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-accent-50 dark:bg-accent-500/20 border border-accent-100 dark:border-accent-500/30 flex items-center justify-center mx-auto shadow-2xl shadow-accent-500/10 dark:shadow-accent-500/20">
            <FiShield size={28} className="text-accent-500 dark:text-accent-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight leading-none">Admin Portal</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Timon Biswas Portfolio</p>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-6 justify-center">
          <div className={`flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full transition-all ${step === "password" ? "bg-accent-500 text-white" : "bg-green-50 dark:bg-green-500/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-500/30"}`}>
            {step !== "password" ? <FiCheckCircle size={12} /> : <span>1</span>}
            <span className="tracking-wide">Password</span>
          </div>
          <div className="w-8 h-px bg-slate-300 dark:bg-slate-700" />
          <div className={`flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full transition-all tracking-wide ${step === "totp" ? "bg-accent-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"}`}>
            <span>2</span>
            Authenticator
          </div>
        </div>

        {/* Card */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700/50 rounded-3xl p-7 shadow-xl space-y-5">
          {status === "error" && (
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-xs bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 p-3 rounded-xl font-semibold">
              <FiAlertCircle size={14} className="flex-shrink-0" /> {errorMsg}
            </div>
          )}
          {status === "success" && (
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-xs bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20 p-3 rounded-xl font-semibold">
              <FiCheckCircle size={14} /> Access granted! Redirecting…
            </div>
          )}

          {/* STEP 1: Password */}
          {step === "password" && (
            <form onSubmit={handlePasswordStep} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Admin Password</label>
                <div className="relative">
                  <FiLock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                  <input
                    type={showPwd ? "text" : "password"}
                    value={password}
                    onChange={e => { setPassword(e.target.value); setStatus("idle"); }}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all text-sm font-medium"
                    autoFocus
                  />
                  <button type="button" onClick={() => setShowPwd(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-2 rounded-lg">
                    {showPwd ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={status === "loading" || !password} className="w-full h-12 rounded-xl bg-accent-500 hover:bg-accent-600 disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-accent-500/25 active:scale-95">
                {status === "loading" ? "Verifying…" : <><span>Continue</span><FiArrowRight size={16} /></>}
              </button>
              <p className="text-center text-[11px] text-slate-500 dark:text-slate-500">
                First time? <a href="/admin/setup" className="text-accent-500 dark:text-accent-400 hover:text-accent-600 dark:hover:text-accent-300 font-semibold transition-colors">Setup 2FA →</a>
              </p>
            </form>
          )}

          {/* STEP 2: TOTP */}
          {step === "totp" && (
            <form onSubmit={handleTotpStep} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Authenticator Code</label>
                <p className="text-xs text-slate-500 mb-3">Open Google Authenticator and enter the 6-digit code for "Timon Portfolio".</p>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={token}
                  onChange={e => { setToken(e.target.value.replace(/\D/g, "")); setStatus("idle"); }}
                  placeholder="000000"
                  className="w-full px-4 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-center text-3xl font-mono tracking-[0.5em] focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all placeholder-slate-300 dark:placeholder-slate-700"
                  autoFocus
                />
              </div>
              <button type="submit" disabled={token.length < 6 || status === "loading"} className="w-full h-12 rounded-xl bg-accent-500 hover:bg-accent-600 disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-accent-500/25 active:scale-95">
                {status === "loading" ? "Authenticating…" : <><FiShield size={16} /><span>Verify & Enter</span></>}
              </button>
              <button type="button" onClick={() => { setStep("password"); setStatus("idle"); }} className="w-full text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-400 transition-colors py-2 font-medium">
                ← Back to password
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
