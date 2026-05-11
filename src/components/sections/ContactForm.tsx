// REFINED
"use client";
import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("sent");
        toast.success("Message sent successfully!");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Failed to send");
      }
    } catch {
      toast.error("Failed to send message. Please try again.");
      setStatus("idle");
    }
  };

  if (status === "sent") {
    return (
      <div className="card p-12 flex flex-col items-center justify-center text-center space-y-4 min-h-[400px]">
        <div className="w-16 h-16 rounded-full bg-[var(--accent-dim)] flex items-center justify-center">
          <CheckCircle size={32} className="text-[var(--accent)]" />
        </div>
        <h3 className="display-md">Thank You!</h3>
        <p className="body text-[var(--text-secondary)]">
          Your message has been sent. I&apos;ll get back to you soon.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="btn-ghost text-sm mt-4"
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-8 space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="label text-[10px] mb-2 block">Name *</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            className="w-full px-4 py-3 bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl text-[var(--text-primary)] text-sm placeholder:text-[var(--text-tertiary)] focus:border-[var(--accent)] outline-none transition-colors"
            required
          />
        </div>
        <div>
          <label className="label text-[10px] mb-2 block">Email *</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="your@email.com"
            className="w-full px-4 py-3 bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl text-[var(--text-primary)] text-sm placeholder:text-[var(--text-tertiary)] focus:border-[var(--accent)] outline-none transition-colors"
            required
          />
        </div>
      </div>

      <div>
        <label className="label text-[10px] mb-2 block">Subject</label>
        <input
          type="text"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          placeholder="What's this about?"
          className="w-full px-4 py-3 bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl text-[var(--text-primary)] text-sm placeholder:text-[var(--text-tertiary)] focus:border-[var(--accent)] outline-none transition-colors"
        />
      </div>

      <div>
        <label className="label text-[10px] mb-2 block">Message *</label>
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Tell me about your project..."
          rows={5}
          className="w-full px-4 py-3 bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl text-[var(--text-primary)] text-sm placeholder:text-[var(--text-tertiary)] focus:border-[var(--accent)] outline-none transition-colors resize-none"
          required
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary w-full justify-center disabled:opacity-50"
      >
        {status === "sending" ? (
          "Sending..."
        ) : (
          <>
            Send Message <Send size={16} />
          </>
        )}
      </button>
    </form>
  );
}
