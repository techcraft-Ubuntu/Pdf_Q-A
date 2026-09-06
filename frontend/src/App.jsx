import { useState } from 'react';
import UploadBox from './components/UploadBox';
import ChatWindow from './components/ChatWindow';

export default function App() {
  const [documentId, setDocumentId] = useState(null);
  const [fileName, setFileName] = useState(null);

  return (
    <div className="min-h-screen w-full bg-[#070a11] text-zinc-100 flex flex-col">
      <header className="shrink-0 border-b border-white/[0.08] bg-[#0a0e17]">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10">
              <span className="text-lg">✦</span>
            </div>

            <div>
              <h1 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                Document Q&A
              </h1>

              <p className="text-xs text-zinc-500">
                Ask questions about your document
              </p>
            </div>
          </div>

          {fileName && (
            <div className="hidden max-w-xs items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/5 px-3 py-1.5 sm:flex">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />

              <span className="truncate text-xs text-zinc-400">
                {fileName}
              </span>
            </div>
          )}
        </div>

        {fileName && (
          <div className="border-t border-white/[0.05] px-5 py-2 sm:hidden">
            <div className="flex items-center justify-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

              <span className="max-w-[80%] truncate text-xs text-zinc-400">
                {fileName}
              </span>
            </div>
          </div>
        )}
      </header>

      <main className="min-h-0 flex-1">
        {!documentId ? (
          <div className="flex min-h-[calc(100vh-73px)] items-center justify-center px-5 py-10">
            <UploadBox
              onUploadSuccess={(id, name) => {
                setDocumentId(id);
                setFileName(name);
              }}
            />
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