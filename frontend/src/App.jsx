import { useState } from 'react';
import UploadBox from './components/UploadBox';
import ChatWindow from './components/ChatWindow';

export default function App() {
  const [documentId, setDocumentId] = useState(null);
  const [fileName, setFileName] = useState(null);

  const handleUploadSuccess = (id, name) => {
    setDocumentId(id);
    setFileName(name);
  };

  return (
    <div className="min-h-screen w-full bg-[#0F1115] text-[#F5F5F5]">
      <header className="border-b border-[#2A2E37] bg-[#14171D]">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D4A574]/30 bg-[#D4A574]/10">
              <span className="text-lg text-[#D4A574]">✦</span>
            </div>

            <div>
              <h1 className="text-lg font-semibold tracking-tight text-[#F5F5F5] sm:text-xl">
                Document Q&A
              </h1>

              <p className="text-xs text-[#9CA3AF]">
                Ask questions about your document
              </p>
            </div>
          </div>

          {fileName && (
            <div className="hidden max-w-xs items-center gap-2 rounded-full border border-[#D4A574]/20 bg-[#D4A574]/5 px-3 py-1.5 sm:flex">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4A574]" />

              <span className="truncate text-xs text-[#9CA3AF]">
                {fileName}
              </span>
            </div>
          )}
        </div>

        {fileName && (
          <div className="border-t border-[#2A2E37] px-5 py-2 sm:hidden">
            <div className="flex items-center justify-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4A574]" />

              <span className="max-w-[80%] truncate text-xs text-[#9CA3AF]">
                {fileName}
              </span>
            </div>
          </div>
        )}
      </header>

      <main className="min-h-0">
        {!documentId ? (
          <div className="flex min-h-[calc(100vh-73px)] items-center justify-center px-5 py-10">
            <UploadBox onUploadSuccess={handleUploadSuccess} />
          </div>
        ) : (
          <div className="mx-auto h-[calc(100vh-73px)] w-full max-w-5xl">
            <ChatWindow documentId={documentId} />
          </div>
        )}
      </main>
    </div>
  );
}