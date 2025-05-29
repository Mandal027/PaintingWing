"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import ModelViewer from "@/components/ModelViewer";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/BitSindri/Navbar";

export default function ModelViewers() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ensure the code runs only in browser
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const totalModels = 4;
    let loadedModels = 0;

    const onLoad = () => {
      loadedModels++;
      if (loadedModels === totalModels) {
        setIsLoading(false);
      }
    };

    // Get all model-viewer elements
    const modelViewers = document.querySelectorAll("model-viewer");

    modelViewers.forEach((viewer) => {
      viewer.addEventListener("load", onLoad);
    });

    // Cleanup on unmount
    return () => {
      modelViewers.forEach((viewer) => {
        viewer.removeEventListener("load", onLoad);
      });
    };
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <Navbar />
      <ModelViewer />
    </>
  );
}
