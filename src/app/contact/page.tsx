"use client";
import { useState } from "react";
import { FiSend, FiGithub, FiLinkedin, FiMail, FiCode, FiMessageCircle, FiMapPin, FiGlobe } from "react-icons/fi";
import toast from "react-hot-toast";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GlowCard from "@/components/ui/GlowCard";
import MagneticButton from "@/components/ui/MagneticButton";

const socials = [
  { href: "mailto:timonbiswas33@gmail.com", icon: FiMail, label: "Email", value: "timonbiswas33@gmail.com" },
  { href: "https://github.com/Ti838", icon: FiGithub, label: "GitHub", value: "Ti838" },
  { href: "https://www.linkedin.com/in/timon-biswas-83493a328/", icon: FiLinkedin, label: "LinkedIn", value: "Timon Biswas" },
  { href: "https://wa.me/+8801779976858", icon: FiMessageCircle, label: "WhatsApp", value: "Direct Message" },
];

interface FormData { name: string; email: string; subject: string; message: string; }
type FormErrors = Partial<Record<keyof FormData, string>>;

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Required";
  if (!data.email.trim()) errors.email = "Required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Invalid";
  if (!data.subject.trim()) errors.subject = "Required";
  if (!data.message.trim()) errors.message = "Required";
  else if (data.message.trim().length < 20) errors.message = "Too short";
  return errors;
}

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to send");
      toast.success("Message sent! I'll get back to you soon 🎉");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: keyof FormData) =>
    `w-full px-5 py-4 rounded-xl border text-sm bg-white/50 dark:bg-slate-800/50 backdrop-blur-md text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 transition-all focus:outline-none focus:ring-4 focus:ring-accent-500/10 ${
      errors[field] ? "border-red-500" : "border-white/20 focus:border-accent-500"
    }`;

  return (
    <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 relative z-10">
        {/* Header */}
        <ScrollReveal direction="left" className="mb-20">
          <span className="tag-pill mb-4">Let&apos;s Talk</span>
          <h1 className="section-title">Get in Touch</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-6 max-w-xl text-lg font-medium leading-relaxed">
            Have a question, a project, or just want to say hello? I&apos;m always ready for a new challenge.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-16">
          {/* Left Column - Info */}
          <div className="lg:col-span-2 space-y-12">
            <ScrollReveal direction="right" delay={200} className="space-y-4">
              <h2 className="font-display font-900 text-3xl text-slate-900 dark:text-white uppercase tracking-tighter">Contact Info</h2>
              <div className="flex items-center gap-3 text-lg text-slate-500 font-bold uppercase tracking-widest">
                <FiMapPin className="text-accent-500 shadow-glow" /> Dhaka, Bangladesh
              </div>
            </ScrollReveal>

            <div className="space-y-4">
              {socials.map(({ href, icon: Icon, label, value }, i) => (
                <ScrollReveal key={label} direction="right" delay={300 + (i * 100)}>
                  <MagneticButton strength={0.1} className="w-full">
                    <a href={href} target="_blank" rel="noopener noreferrer"
                      className="glass-card p-6 flex items-center gap-6 group hover:border-accent-500/50 transition-all">
                      <div className="w-12 h-12 rounded-2xl bg-accent-500/10 text-accent-500 flex items-center justify-center group-hover:scale-110 transition-transform shadow-glow">
                        <Icon size={20} />
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
                        <p className="text-sm font-black text-slate-700 dark:text-slate-200 uppercase tracking-tight">{value}</p>
                      </div>
                    </a>
                  </MagneticButton>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-3">
            <ScrollReveal direction="up" delay={400}>
              <GlowCard className="glass-card p-10">
                <form onSubmit={submit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Your Name</label>
                      <input name="name" value={form.name} onChange={handle} placeholder="John Doe" className={inputClass("name")} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                      <input type="email" name="email" value={form.email} onChange={handle} placeholder="john@example.com" className={inputClass("email")} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Subject</label>
                    <input name="subject" value={form.subject} onChange={handle} placeholder="Project Inquiry" className={inputClass("subject")} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Message Content</label>
                    <textarea name="message" value={form.message} onChange={handle} rows={6} placeholder="Tell me about your project..." className={`${inputClass("message")} resize-none`} />
                  </div>
                  <MagneticButton className="w-full">
                    <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-5 uppercase tracking-[0.2em] font-black text-xs shadow-accent-500/40">
                      {loading ? (
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <><FiSend size={18} className="mr-2" /> Dispatch Message</>
                      )}
                    </button>
                  </MagneticButton>
                </form>
              </GlowCard>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
