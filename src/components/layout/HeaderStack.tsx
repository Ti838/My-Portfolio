"use client";

import { useAdmin } from "@/components/admin/AdminProvider";
import AdminOverlay from "../admin/AdminOverlay";
import AnnouncementBanner from "./AnnouncementBanner";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";

export default function HeaderStack({ personalInfo }: { personalInfo?: any }) {
  const { isAdmin } = useAdmin();
  const [mounted, setMounted] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const announcement = personalInfo?.announcement;
  const showBanner = announcement?.active && announcement?.text && bannerVisible;
  const paddingOffset = (isAdmin ? 40 : 0) + (showBanner ? 40 : 0);

  return (
    <>
      <AdminOverlay />
      <Navbar logoImage={personalInfo?.logoImage} />
      <AnnouncementBanner announcement={announcement} />
      {/* Spacer to push content below fixed header components */}
      <div style={{ height: `${paddingOffset}px` }} className="transition-all duration-300" />
    </>
  );
}
