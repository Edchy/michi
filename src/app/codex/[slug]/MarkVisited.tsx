"use client";

import { useEffect } from "react";
import { markBookStopVisited } from "@/lib/codex-progress";

export default function MarkVisited({ slug }: { slug: string }) {
  useEffect(() => {
    markBookStopVisited(slug);
  }, [slug]);

  return null;
}
