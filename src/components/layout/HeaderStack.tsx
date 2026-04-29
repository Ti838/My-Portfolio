"use client";

import { useAdmin } from "@/components/admin/AdminProvider";
import AdminOverlay from "../admin/AdminOverlay";
import AnnouncementBanner from "./AnnouncementBanner";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";

export default function HeaderStack({ personalInfo }: { personalInfo?: any }) {
  const { isAdmin } = useAdmin();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const announcement = personalInfo?.announcement;
  const showBanner = mounted && announcement?.active && announcement?.text;
  const paddingOffset = (mounted && isAdmin ? 40 : 0) + (showBanner ? 40 : 0);

  return (
    <>
      {mounted && <AdminOverlay />}
      <Navbar logoImage={personalInfo?.logoImage} />
      {mounted && <AnnouncementBanner announcement={announcement} />}
      {/* Spacer for fixed header elements */}
      <div style={{ height: `${paddingOffset}px` }} className="transition-all duration-300" />
    </>
  );
}
