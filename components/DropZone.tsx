"use client";

import { useRef, useState, useEffect, useCallback, DragEvent, ChangeEvent } from "react";

interface DropZoneProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

export default function DropZone({ onFileSelect, disabled = false }: DropZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Clean up object URL on unmount
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const clearPreview = useCallback(() => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  }, [preview]);

  const validate = (file: File): string | null => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return "Invalid file type. Please upload a JPG, PNG, or WEBP image.";
    }
    if (file.size > MAX_BYTES) {
      return "File too large. Maximum size is 10 MB.";
    }
    return null;
  };

  const processFile = useCallback(
    (file: File) => {
      setError(null);
      const validationError = validate(file);
      if (validationError) {
        setError(validationError);
        return;
      }
      clearPreview();
      const url = URL.createObjectURL(file);
      setPreview(url);
      onFileSelect(file);
    },
    [clearPreview, onFileSelect]
  );

  // Drag handlers
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setDragActive(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (disabled) return;
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  // Input change handlers
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleZoneClick = () => {
    if (disabled || preview) return;
    fileInputRef.current?.click();
  };

  const handleCameraClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    cameraInputRef.current?.click();
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
    <div className="flex flex-col items-center gap-3 w-full">
      {/* Hidden inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileChange}
        disabled={disabled}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
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
          // Preview state
          <>
            <img
              src={preview}
              alt="Selected plant"
              className="max-h-52 max-w-full rounded-xl object-contain p-2"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                clearPreview();
              }}
              className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-gray-800/80 px-2 py-1 text-xs text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
              aria-label="Remove image"
              disabled={disabled}
            >
              ✕ Remove
            </button>
          </>
        ) : (
          // Default / drag state
          <div className="flex flex-col items-center gap-3 px-6 py-8 text-center pointer-events-none">
            <span className="text-6xl leading-none" aria-hidden="true">🌿</span>
            <p className="text-gray-300 text-sm font-medium">
              Drop your plant photo here or click to upload
            </p>
            <p className="text-gray-500 text-xs">Supports JPG, PNG, WEBP · Max 10MB</p>
          </div>
        )}
      </div>

      {/* Camera button — mobile only */}
      {isMobile && (
        <button
          onClick={handleCameraClick}
          disabled={disabled}
          className={`
            flex items-center gap-2 rounded-xl bg-green-700 px-5 py-2.5
            text-sm font-semibold text-white shadow-md
            transition-colors hover:bg-green-600 active:bg-green-800
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          📷 Take Photo
        </button>
      )}

      {/* Inline error */}
      {error && (
        <p role="alert" className="text-red-400 text-xs text-center px-2">
          {error}
        </p>
      )}
    </div>
  );
}
