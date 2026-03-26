import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";
import { AdminProvider } from "@/components/admin/AdminProvider";
import HeaderStack from "@/components/layout/HeaderStack";
import AdminModalsRenderer from "@/components/admin/AdminModalsRenderer";
import { getPersonalInfo, getProjects, getAchievements, getExperiences, getEducation, getSkills, getSocialLinks } from "@/data/portfolio";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://timonbiswas.vercel.app"),
  title: {
    default: "Timon Biswas — CSE Student & AI Enthusiast",
    template: "%s | Timon Biswas",
  },
  description:
    "Personal portfolio of Timon Biswas — 3rd-year CSE student at SMUCT, competitive programmer (ICPC 2024 Honorable Mention), AI & ML enthusiast, and vocalist.",
  keywords: ["Timon Biswas", "CSE", "SMUCT", "ICPC", "AI", "Machine Learning", "Competitive Programming", "Bangladesh"],
  authors: [{ name: "Timon Biswas", url: "https://timonbiswas.vercel.app" }],
  creator: "Timon Biswas",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Timon Biswas Portfolio",
    title: "Timon Biswas — CSE Student & AI Enthusiast",
    description: "Personal portfolio of Timon Biswas — competitive programmer and AI enthusiast from Bangladesh.",
    images: [{ url: "/images/profile.jpg", width: 800, height: 800, alt: "Timon Biswas" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Timon Biswas — CSE Student & AI Enthusiast",
    description: "Personal portfolio — competitive programmer and AI enthusiast.",
    images: ["/images/profile.jpg"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

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
          href="https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      {/* Blocking theme script - prevents FOUC/flicker on load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body suppressHydrationWarning className="noise-bg antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <AdminProvider>
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
            <Footer socialLinks={socialLinks} />
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: { borderRadius: "10px", fontFamily: "'DM Sans', sans-serif" },
              }}
            />
          </AdminProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
