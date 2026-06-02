"use client";

import { Camera, Upload, X, CircleDot } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export default function Hero() {
  const [cameraOpen, setCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  // Attach stream to video element once modal is open
  useEffect(() => {
    if (cameraOpen && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [cameraOpen]);

  const openCamera = async () => {
    // Mobile: trigger native camera via input[capture]
    if (navigator.maxTouchPoints > 0) {
      mobileInputRef.current?.click();
      return;
    }
    // Desktop: use getUserMedia
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      setCameraOpen(true);
    } catch {
      // Camera denied or not available — fall back to file picker
      mobileInputRef.current?.click();
    }
  };

  const closeCamera = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setCameraOpen(false);
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")?.drawImage(video, 0, 0);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], "photo.jpg", { type: "image/jpeg" });
      // TODO: pass `file` to your plant identification logic
      console.log("Captured photo:", file);
    }, "image/jpeg");
    closeCamera();
  };

  return (
    <>
      <section className="relative flex h-screen w-full items-center justify-center">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1920&q=80)",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Center content */}
        <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center text-white">
          <div className="space-y-3">
            <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
              Identify Any Plant
            </h1>
            <p className="text-lg text-white/70">
              Take or upload a photo — get instant identification &amp; care tips.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            {/* Hidden input for mobile native camera */}
            <input
              ref={mobileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
            />

            {/* Take a Photo — getUserMedia on desktop, native camera on mobile */}
            <button
              onClick={openCamera}
              className="flex items-center gap-3 rounded-2xl bg-green-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-green-900/40 transition-colors hover:bg-green-500"
            >
              <Camera className="h-5 w-5" />
              Take a Photo
            </button>

            {/* Upload a Photo */}
            <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20">
              <input type="file" accept="image/*" className="hidden" />
              <Upload className="h-5 w-5" />
              Upload a Photo
            </label>
          </div>
        </div>
      </section>

      {/* Desktop camera modal */}
      {cameraOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="flex-1 w-full object-cover"
          />
          <div className="flex items-center justify-between bg-black px-8 py-6">
            <button
              onClick={closeCamera}
              className="flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              <X className="h-4 w-4" />
              Cancel
            </button>
            <button
              onClick={capturePhoto}
              className="flex items-center gap-2 rounded-xl bg-green-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-500"
            >
              <CircleDot className="h-5 w-5" />
              Capture
            </button>
          </div>
        </div>
      )}
    </>
  );
}
