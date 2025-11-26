"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";

export default function AuthInitializer() {
  const fetchMe = useAuthStore((s) => s.me);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  return null;
}