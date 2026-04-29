import type { Metadata } from "next";
import Link from "next/link";
import { createAdminClient } from "@/lib/supabase";
import { FiArrowRight, FiClock, FiTag, FiEdit3 } from "react-icons/fi";
import EditableSection from "@/components/admin/EditableSection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GlowCard from "@/components/ui/GlowCard";

export const metadata: Metadata = { title: "Blog" };
export const revalidate = 60; // ISR – refresh every 60 seconds

async function getPosts() {
  try {
    const supabase = createAdminClient();
    if (!supabase) return [];
    const { data, error } = await supabase
      .from("blog_posts")
      .select("id, slug, title, excerpt, tags, published_at, reading_time")
      .eq("published", true)
      .order("published_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <EditableSection eventKey="hero" label="Blog Content">
      <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-5 relative z-10">
          {/* Header */}
          <ScrollReveal direction="left" className="mb-20">
            <span className="tag-pill mb-4">The Journal</span>
            <h1 className="section-title">Latest Thoughts</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-6 max-w-xl text-lg font-medium leading-relaxed">
              Diving deep into code, sharing the struggles of learning, and exploring the future of technology.
            </p>
          </ScrollReveal>

          {posts.length === 0 ? (
            <ScrollReveal direction="up" delay={200}>
              <div className="text-center py-32 glass-card border-dashed">
                <p className="text-6xl mb-6 animate-pulse">✍️</p>
                <h3 className="font-display font-900 text-3xl text-slate-900 dark:text-white uppercase tracking-tighter leading-none">Drafting the Future</h3>
                <p className="text-slate-500 dark:text-slate-400 mt-4 text-lg font-medium">I&apos;m polishing my first series of articles. Check back shortly.</p>
              </div>
            </ScrollReveal>
          ) : (
            <div className="space-y-10">
              {posts.map((post: any, i: number) => (
                <ScrollReveal key={post.id} delay={i * 100} direction="up">
                  <Link href={`/blog/${post.slug}`} className="block group">
                    <GlowCard className="glass-card p-10 group-hover:border-accent-500/50 transition-all">
                      <div className="flex flex-wrap items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">
                        <span className="flex items-center gap-2"><FiClock className="text-accent-500" /> {post.reading_time || "Quick read"}</span>
                        <span>·</span>
                        <span className="flex items-center gap-2"><FiEdit3 className="text-accent-500" /> {new Date(post.published_at).toLocaleDateString()}</span>
                      </div>
                      <h2 className="font-display font-900 text-3xl text-slate-900 dark:text-white mb-4 group-hover:text-accent-500 transition-colors uppercase tracking-tighter leading-tight">
                        {post.title}
                      </h2>
                      <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2 mb-8 font-medium">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-accent-500 group-hover:translate-x-2 transition-transform">
                        Read full article <FiArrowRight size={16} />
                      </div>
                    </GlowCard>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </EditableSection>
  );
}
