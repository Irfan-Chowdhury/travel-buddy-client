"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, X } from "lucide-react";
import { Button } from "./ui/Button";
import { Label } from "./ui/Label";

interface ImageUploadProps {
  value?: File | null;
  onChange: (file: File | null) => void;
  error?: string;
}

export function ImageUpload({ value, onChange, error }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onChange(file);
    }
  };


 return (
    <div className="w-full">
      <Label>Profile Photo</Label>

      {!preview ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg cursor-pointer"
        >
          <p>Click to upload</p>
        </div>
      ) : (
        <div className="mt-1 flex items-center gap-4">
          <img src={preview} className="h-16 w-16 object-cover rounded" />

          <Button
            type="button"
            onClick={() => {
              setPreview(null);
              onChange(null);
              if (fileInputRef.current) fileInputRef.current.value = "";
            }}
          >
            Remove
          </Button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
