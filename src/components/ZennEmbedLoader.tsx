"use client";

import { useEffect } from "react";

export function ZennEmbedLoader() {
  useEffect(() => {
    void import("zenn-embed-elements");
  }, []);

  return null;
}
