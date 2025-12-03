import React, { useState, useRef } from 'react';
import { UploadCloud, X, Image as ImageIcon } from 'lucide-react';
import { Button } from './ui/Button';
import { Label } from './ui/Label';
interface ImageUploadProps {
  onChange: (file: File | null) => void;
  error?: string;
  value?: File | null;
}
export function ImageUpload({
  onChange,
  error,
  value
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    processFile(file);
  };
  const processFile = (file?: File) => {
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        onChange(file);
      } else {
        alert('Please upload an image file');
      }
    }
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    processFile(file);
  };
  const clearImage = () => {
    setPreview(null);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  return <div className="w-full">
      <Label>Profile Photo</Label>

      {!preview ? <div onClick={() => fileInputRef.current?.click()} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className={`
            mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg cursor-pointer
            transition-colors duration-200
            ${isDragging ? 'border-blue-500 bg-blue-50' : error ? 'border-red-300 hover:bg-gray-50' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'}
          `}>
          <div className="space-y-1 text-center">
            <div className="mx-auto h-12 w-12 text-gray-400 flex items-center justify-center rounded-full bg-gray-100">
              <UploadCloud className="h-6 w-6" />
            </div>
            <div className="flex text-sm text-gray-600 justify-center">
              <span className="font-medium text-blue-600 hover:text-blue-500">
                Upload a file
              </span>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div> : <div className="mt-1 relative rounded-lg border border-gray-200 bg-gray-50 p-2 flex items-center gap-4">
          <div className="h-16 w-16 flex-shrink-0 rounded-md overflow-hidden bg-white border border-gray-200">
            <img src={preview} alt="Preview" className="h-full w-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {value?.name}
            </p>
            <p className="text-xs text-gray-500">
              {value?.size ? (value.size / 1024 / 1024).toFixed(2) : 0} MB
            </p>
          </div>
          <Button type="button" variant="ghost" onClick={e => {
        e.stopPropagation();
        clearImage();
      }} className="text-gray-400 hover:text-red-500">
            <X className="h-5 w-5" />
          </Button>
        </div>}

      <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleFileSelect} />

      {error && <p className="mt-1.5 text-sm text-red-600 animate-in slide-in-from-top-1 fade-in duration-200">
          {error}
        </p>}
    </div>;
}