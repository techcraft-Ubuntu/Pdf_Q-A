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
      setError('Upload failed. Make sure it\'s a valid PDF.');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full max-w-xl">
      <label
        htmlFor="pdf-upload"
        className="group relative flex min-h-72 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-[#0d121c] px-6 py-12 text-center shadow-2xl shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:bg-[#101622] hover:shadow-violet-500/10"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.12),transparent_55%)]" />

        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 shadow-lg shadow-violet-500/10 transition-transform duration-300 group-hover:scale-105">
          <span className="text-3xl">📄</span>
        </div>

        <div className="relative mt-5">
          <h2 className="text-lg font-semibold text-zinc-100">
            {uploading ? 'Processing document…' : 'Click to upload a PDF'}
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            Select a document to start asking questions
          </p>
        </div>

        <div className="relative mt-5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
          <span className="text-xs text-zinc-500">
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
        <div className="mt-4 flex items-center justify-center gap-3 rounded-xl border border-violet-400/10 bg-violet-500/5 px-4 py-3 text-sm text-violet-300">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-violet-400/30 border-t-violet-400" />
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