import { useState } from 'react';
import { uploadDocument } from '../api/client';

export default function UploadBox({ onUploadSuccess }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const result = await uploadDocument(file);
      onUploadSuccess(result.documentId, file.name);
    } catch (err) {
      setError("Upload failed. Make sure it's a valid PDF.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full max-w-xl">
      <label
        htmlFor="pdf-upload"
        className="group flex min-h-72 w-full cursor-pointer flex-col items-center justify-center rounded-3xl border border-[#2A2E37] bg-[#171A21] px-6 py-12 text-center shadow-2xl shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4A574]/50 hover:bg-[#1A1D24]"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#D4A574]/30 bg-[#D4A574]/10 transition-transform duration-300 group-hover:scale-105">
          <span className="text-3xl">📄</span>
        </div>

        <div className="mt-5">
          <h2 className="text-lg font-semibold text-[#F5F5F5]">
            {uploading ? 'Processing document…' : 'Click to upload a PDF'}
          </h2>

          <p className="mt-2 text-sm text-[#9CA3AF]">
            Select a document to start asking questions
          </p>
        </div>

        <div className="mt-5 rounded-full border border-[#2A2E37] bg-[#0F1115] px-3 py-1.5">
          <span className="text-xs text-[#9CA3AF]">
            PDF files only · Up to 10MB
          </span>
        </div>

        <input
          id="pdf-upload"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          disabled={uploading}
          className="hidden"
        />
      </label>

      {uploading && (
        <div className="mt-4 flex items-center justify-center gap-3 rounded-xl border border-[#D4A574]/20 bg-[#D4A574]/5 px-4 py-3 text-sm text-[#D4A574]">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#D4A574]/30 border-t-[#D4A574]" />
          Processing…
        </div>
      )}

      {error && (
        <div className="mt-4 rounded-xl border border-red-400/15 bg-red-400/5 px-4 py-3 text-center text-sm text-red-300">
          {error}
        </div>
      )}
    </div>
  );
}