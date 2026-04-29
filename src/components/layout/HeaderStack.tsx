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

  return (
    <>
      {mounted && <AdminOverlay />}
      <Navbar logoImage={personalInfo?.logoImage} />
      {mounted && <AnnouncementBanner announcement={announcement} />}
    </>
  );
}
