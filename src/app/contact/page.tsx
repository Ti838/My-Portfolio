"use client";
import { useState } from "react";
import { FiSend, FiGithub, FiLinkedin, FiMail, FiCode, FiMessageCircle, FiMapPin } from "react-icons/fi";
import toast from "react-hot-toast";

const socials = [
  { href: "mailto:timonbiswas33@gmail.com", icon: FiMail, label: "Email", value: "timonbiswas33@gmail.com" },
  { href: "https://github.com/Ti838", icon: FiGithub, label: "GitHub", value: "github.com/Ti838" },
  { href: "https://www.linkedin.com/in/timon-biswas-83493a328/", icon: FiLinkedin, label: "LinkedIn", value: "linkedin.com/in/timon-biswas" },
  { href: "https://codeforces.com/profile/Timon15", icon: FiCode, label: "Codeforces", value: "Timon15" },
  { href: "https://wa.me/+8801779976858", icon: FiMessageCircle, label: "WhatsApp", value: "Message me directly" },
];

interface FormData { name: string; email: string; subject: string; message: string; }
type FormErrors = Partial<Record<keyof FormData, string>>;

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Name is required";
  if (!data.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Enter a valid email";
  if (!data.subject.trim()) errors.subject = "Subject is required";
  if (!data.message.trim()) errors.message = "Message is required";
  else if (data.message.trim().length < 20) errors.message = "Message must be at least 20 characters";
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
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to send");
      toast.success("Message sent! I'll get back to you soon 🎉");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: keyof FormData) =>
    `w-full px-4 py-3 rounded-xl border text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500/40 ${
      errors[field]
        ? "border-red-400 dark:border-red-500"
        : "border-slate-200 dark:border-slate-700 focus:border-accent-400"
    }`;

  return (
    <div className="pt-24 pb-20 min-h-screen bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-5">
        <div className="mb-14">
          <span className="tag-pill mb-3">Get in touch</span>
          <h1 className="section-title">Contact Me</h1>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left – info */}
          <div className="lg:col-span-2 space-y-6">
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Whether you have a project idea, want to collaborate, or just want to say hi — my inbox is always open!
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <FiMapPin size={14} className="text-accent-500" />
              Dhaka, Bangladesh
            </div>

            <div className="space-y-3 pt-2">
              {socials.map(({ href, icon: Icon, label, value }) => (
                <a key={label} href={href} target={href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-accent-300 dark:hover:border-accent-700 hover:bg-accent-50 dark:hover:bg-accent-900/10 transition-all group">
                  <div className="w-8 h-8 rounded-lg bg-accent-50 dark:bg-accent-900/30 flex items-center justify-center text-accent-500 group-hover:scale-110 transition-transform">
                    <Icon size={15} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 dark:text-slate-500">{label}</p>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right – form */}
          <div className="lg:col-span-3">
            <form onSubmit={submit} noValidate className="card-base p-7 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Name *</label>
                  <input name="name" value={form.name} onChange={handle} placeholder="Your name" className={inputClass("name")} />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Email *</label>
                  <input type="email" name="email" value={form.email} onChange={handle} placeholder="you@example.com" className={inputClass("email")} />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Subject *</label>
                <input name="subject" value={form.subject} onChange={handle} placeholder="What's this about?" className={inputClass("subject")} />
                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Message *</label>
                <textarea name="message" value={form.message} onChange={handle} rows={6} placeholder="Your message (at least 20 characters)..." className={`${inputClass("message")} resize-none`} />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? (
                  <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                ) : (
                  <><FiSend size={15} /> Send Message</>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
