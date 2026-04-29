import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";
import { AdminProvider } from "@/components/admin/AdminProvider";
import HeaderStack from "@/components/layout/HeaderStack";
import AdminModalsRenderer from "@/components/admin/AdminModalsRenderer";

import { getPersonalInfo, getProjects, getAchievements, getExperiences, getEducation, getSkills, getSocialLinks } from "@/data/portfolio";

export async function generateMetadata(): Promise<Metadata> {
  const personalInfo = await getPersonalInfo();
  const siteName = personalInfo?.name || "Timon Biswas";
  const tagline = (personalInfo?.tagline || "").trim();
  const fullTitle = tagline ? `${siteName} — ${tagline}` : siteName;
  
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://timonbiswas.vercel.app"),
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
      icon: "/favicon.png",
      shortcut: "/favicon.png",
      apple: "/favicon.png",
    },
  };
}

import SmoothScroll from "@/components/ui/SmoothScroll";
import CinematicBackground from "@/components/ui/CinematicBackground";

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
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      {/* Blocking theme script - prevents FOUC/flicker on load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body suppressHydrationWarning className="antialiased selection:bg-accent-500/20" style={{ background: 'var(--surface)' }}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <AdminProvider>
            <SmoothScroll>
              <CinematicBackground />
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
                <main className="min-h-screen">{children}</main>
                <Footer socialLinks={socialLinks} tagline={personalInfo?.tagline} />
              </div>
            </SmoothScroll>
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: { borderRadius: "16px", background: "#0f172a", color: "#fff", border: "1px solid #1e293b" },
              }}
            />
          </AdminProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
