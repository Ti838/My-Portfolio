// REFINED
import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";
import { AdminProvider } from "@/components/admin/AdminProvider";
import HeaderStack from "@/components/layout/HeaderStack";
import AdminModalsRenderer from "@/components/admin/AdminModalsRenderer";
import ThemeProvider from "@/components/providers/ThemeProvider";

import { getPersonalInfo, getProjects, getAchievements, getExperiences, getEducation, getSkills, getSocialLinks } from "@/data/portfolio";

export async function generateMetadata(): Promise<Metadata> {
  const personalInfo = await getPersonalInfo();
  const siteName = personalInfo?.name || "Timon Biswas";
  const tagline = (personalInfo?.tagline || "").trim();
  const fullTitle = tagline ? `${siteName} — ${tagline}` : siteName;
  
  return {
    metadataBase: (() => {
      try {
        return new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://timonbiswas.vercel.app");
      } catch {
        return new URL("https://timonbiswas.vercel.app");
      }
    })(),
    title: {
      default: fullTitle,
      template: `%s | ${siteName}`,
    },
    description: personalInfo?.bio || "Personal portfolio of Timon Biswas",
    keywords: ["Timon Biswas", "CSE", "SMUCT", "ICPC", "AI", "Machine Learning", "Competitive Programming", "Bangladesh"],
    authors: [{ name: siteName, url: "https://timonbiswas.vercel.app" }],
    creator: siteName,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "/",
      siteName: `${siteName} Portfolio`,
      title: siteName,
      description: personalInfo?.bio || "Personal portfolio",
      images: [{ url: "/images/profile.jpg", width: 800, height: 800, alt: siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description: personalInfo?.bio || "Personal portfolio",
      images: ["/images/profile.jpg"],
    },
    robots: { index: true, follow: true },
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon.png", type: "image/png" },
      ],
      shortcut: "/favicon.svg",
      apple: "/favicon.png",
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [personalInfo, projects, achievements, experiences, education, skillData, socialLinks] = await Promise.all([
    getPersonalInfo(),
    getProjects(),
    getAchievements(),
    getExperiences(),
    getEducation(),
    getSkills(),
    getSocialLinks()
  ]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning className="antialiased noise-bg" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        <ThemeProvider>
          <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_15%,rgba(14,165,233,0.08),transparent_28%),radial-gradient(circle_at_80%_18%,rgba(16,185,129,0.06),transparent_26%),radial-gradient(circle_at_50%_110%,rgba(37,99,235,0.05),transparent_34%)]" />
          <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:120px_120px] opacity-20 [mask-image:radial-gradient(circle_at_center,black,transparent_74%)]" />
          <AdminProvider>
            <div className="relative z-10">
              <HeaderStack personalInfo={personalInfo} />
              <AdminModalsRenderer 
                personalInfo={personalInfo} 
                projects={projects} 
                achievements={achievements} 
                experiences={experiences}
                education={education}
                skills={skillData.flatMap((c:any) => c.skills)}
                skillCategories={skillData}
                socialLinks={socialLinks}
              />
              <main className="min-h-screen selection:bg-accent/20 selection:text-accent">{children}</main>
              <Footer socialLinks={socialLinks} tagline={personalInfo?.tagline} />
            </div>
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: { 
                  borderRadius: "12px", 
                  background: "#111111", 
                  color: "#f0ece4", 
                  border: "1px solid #222222",
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "0.875rem",
                },
              }}
            />
          </AdminProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
