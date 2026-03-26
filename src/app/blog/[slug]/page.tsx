import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { createAdminClient } from "@/lib/supabase";
import { FiArrowLeft, FiClock, FiCalendar } from "react-icons/fi";

export const revalidate = 60;

async function getPost(slug: string) {
  try {
    const supabase = createAdminClient();
    if (!supabase) return null;
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();
    if (error) return null;
    return data;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <div className="pt-24 pb-20 min-h-screen bg-white dark:bg-slate-900">
      <div className="max-w-3xl mx-auto px-5">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-accent-500 transition-colors mb-8">
          <FiArrowLeft size={14} /> Back to Blog
        </Link>

        <article>
          {/* Header */}
          <header className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {(post.tags ?? []).map((t: string) => (
                <span key={t} className="tag-pill text-[11px]">{t}</span>
              ))}
            </div>
            <h1 className="font-display font-900 text-4xl text-slate-900 dark:text-white leading-tight mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <FiCalendar size={13} />
                {new Date(post.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </span>
              {post.reading_time && (
                <span className="flex items-center gap-1.5">
                  <FiClock size={13} /> {post.reading_time} min read
                </span>
              )}
            </div>
          </header>

          {/* Divider */}
          <div className="h-px bg-slate-100 dark:bg-slate-800 mb-10" />

          {/* Content – rendered as prose */}
          <div
            className="prose prose-slate dark:prose-invert prose-lg max-w-none prose-headings:font-display prose-a:text-accent-500 prose-code:text-accent-600 prose-code:bg-accent-50 prose-code:px-1 prose-code:rounded"
            dangerouslySetInnerHTML={{ __html: post.content_html ?? post.content }}
          />
        </article>

        <div className="mt-14 pt-8 border-t border-slate-100 dark:border-slate-800">
          <Link href="/blog" className="btn-outline text-sm">
            <FiArrowLeft size={14} /> More Posts
          </Link>
        </div>
      </div>
    </div>
  );
}
