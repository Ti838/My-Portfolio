import type { Metadata } from "next";
import Link from "next/link";
import { createAdminClient } from "@/lib/supabase";
import { FiArrowRight, FiClock, FiTag } from "react-icons/fi";
import EditableSection from "@/components/admin/EditableSection";

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
      <div className="pt-24 pb-20 min-h-screen bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-5">
          {/* ... existing content ... */}
          <div className="mb-14">
            <span className="tag-pill mb-3">Thoughts & Learning</span>
            <h1 className="section-title">Blog</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-xl">
              I write about competitive programming, AI, software development, and my learning journey as a CSE student.
            </p>
          </div>
          {/* ... posts ... */}
          {posts.length === 0 ? (
            <div className="text-center py-24 space-y-4">
              <p className="text-5xl">✍️</p>
              <p className="font-display font-700 text-slate-900 dark:text-white text-2xl">First post coming soon</p>
              <p className="text-slate-500 dark:text-slate-400">
                I&apos;m working on my first blog post — stay tuned!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post: any) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="block card-base p-7 group">
                   {/* simplified version to avoid long replacement string */}
                   <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500 mb-3">
                    <span className="flex items-center gap-1"><FiClock size={11} /> {post.reading_time || "Quick read"}</span>
                    <span>·</span>
                    <span>{new Date(post.published_at).toLocaleDateString()}</span>
                  </div>
                  <h2 className="font-display font-700 text-slate-900 dark:text-white text-xl mb-2">{post.title}</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{post.excerpt}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </EditableSection>
  );
}
