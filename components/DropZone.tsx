"use client";

import { useRef, useState, useCallback, DragEvent, ChangeEvent, useEffect } from "react";

interface DropZoneProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 10 * 1024 * 1024;

export default function DropZone({ onFileSelect, disabled = false }: DropZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // Attach stream to video element whenever camera opens
  useEffect(() => {
    if (cameraOpen && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [cameraOpen, stream]);

  // Clean up object URL on unmount
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // Stop camera stream on unmount
  useEffect(() => {
    return () => {
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, [stream]);

  const clearPreview = useCallback(() => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [preview]);

  const validate = (file: File): string | null => {
    if (!ACCEPTED_TYPES.includes(file.type)) return "Invalid file type. Please upload a JPG, PNG, or WEBP image.";
    if (file.size > MAX_BYTES) return "File too large. Maximum size is 10 MB.";
    return null;
  };

  const processFile = useCallback(
    (file: File) => {
      setError(null);
      const err = validate(file);
      if (err) { setError(err); return; }
      clearPreview();
      setPreview(URL.createObjectURL(file));
      onFileSelect(file);
    },
    [clearPreview, onFileSelect]
  );

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleZoneClick = () => {
    if (disabled || preview) return;
    fileInputRef.current?.click();
  };

  async function openCamera() {
    setError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1920 }, height: { ideal: 1080 } },
      });
      setStream(mediaStream);
      setCameraOpen(true);
    } catch {
      setError("Could not access camera. Please allow camera permission in your browser.");
    }
  }

  function closeCamera() {
    stream?.getTracks().forEach((t) => t.stop());
    setStream(null);
    setCameraOpen(false);
  }

  function capturePhoto() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")?.drawImage(video, 0, 0);
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const file = new File([blob], "plant-photo.jpg", { type: "image/jpeg" });
        processFile(file);
        closeCamera();
      },
      "image/jpeg",
      0.92
    );
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); if (!disabled) setDragActive(true); };
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setDragActive(false); };
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault(); e.stopPropagation(); setDragActive(false);
    if (disabled) return;
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const baseZoneClasses = `
    relative flex flex-col items-center justify-center
    w-full min-h-56 rounded-2xl border-2 border-dashed
    transition-all duration-200 cursor-pointer select-none
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    ${dragActive
      ? "border-green-400 shadow-[0_0_0_4px_rgba(74,222,128,0.25)] bg-green-950/30"
      : "border-gray-600 bg-gray-900 hover:border-green-500 hover:bg-gray-800/60"
    }
  `;

  return (
    <>
      <div className="flex flex-col items-center gap-3 w-full">
        {/* Hidden file picker input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleFileChange}
          disabled={disabled}
        />

        {/* Drop zone */}
        <div
          className={baseZoneClasses}
          onClick={handleZoneClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          role="button"
          aria-label="Upload plant photo"
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => e.key === "Enter" && handleZoneClick()}
        >
          {preview ? (
            <>
              <img src={preview} alt="Selected plant" className="max-h-52 max-w-full rounded-xl object-contain p-2" />
              <button
                onClick={(e) => { e.stopPropagation(); clearPreview(); }}
                className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-gray-800/80 px-2 py-1 text-xs text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                aria-label="Remove image"
                disabled={disabled}
              >
                ✕ Remove
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-3 px-6 py-8 text-center pointer-events-none">
              <span className="text-6xl leading-none" aria-hidden="true">🌿</span>
              <p className="text-gray-300 text-sm font-medium">Drop your plant photo here or click to upload</p>
              <p className="text-gray-500 text-xs">Supports JPG, PNG, WEBP · Max 10MB</p>
            </div>
          )}
        </div>

        {/* Take Photo button */}
        <button
          onClick={openCamera}
          disabled={disabled}
          className="flex items-center gap-2 rounded-xl bg-green-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-green-600 active:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          📷 Take Photo
        </button>

        {error && (
          <p role="alert" className="text-red-400 text-xs text-center px-2">{error}</p>
        )}
      </div>

      {/* Camera modal */}
      {cameraOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-4">
          <div className="w-full max-w-lg flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-white font-semibold text-lg">Take a Photo</h2>
              <button
                onClick={closeCamera}
                className="text-gray-400 hover:text-white transition-colors text-2xl leading-none"
                aria-label="Close camera"
              >
                ✕
              </button>
            </div>

            {/* Live video feed */}
            <div className="relative rounded-2xl overflow-hidden bg-gray-900 border border-gray-700">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full rounded-2xl"
              />
            </div>

            {/* Capture button */}
            <button
              onClick={capturePhoto}
              className="w-full rounded-xl bg-green-600 py-3.5 text-sm font-semibold text-white hover:bg-green-500 transition-colors"
            >
              📸 Capture Photo
            </button>

            <button
              onClick={closeCamera}
              className="w-full rounded-xl border border-gray-700 py-3 text-sm text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
            >
              Cancel
            </button>
          </div>

          {/* Hidden canvas used to grab the frame */}
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}
    </>
  );
}
