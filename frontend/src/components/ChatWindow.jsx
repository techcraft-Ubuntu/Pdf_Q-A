import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { askQuestion } from '../api/client';

export default function ChatWindow({ documentId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [conversationId, setConversationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const result = await askQuestion(documentId, input, conversationId);
      setConversationId(result.conversationId);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: result.answer,
        sources: result.sources,
      }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '⚠️ Something went wrong.',
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col bg-[#070a11]">
      <div className="shrink-0 border-b border-white/[0.08] bg-[#0a0e17] px-5 py-3 sm:px-8">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-200">
              Document conversation
            </p>

            <p className="mt-0.5 text-xs text-zinc-600">
              Ask questions about the uploaded document
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/5 px-2.5 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

            <span className="text-[11px] text-emerald-300/80">
              Ready
            </span>
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-8">
        <div className="mx-auto max-w-3xl space-y-6">
          {messages.length === 0 && (
            <div className="flex min-h-[55vh] items-center justify-center">
              <div className="max-w-md text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/15 bg-violet-500/10">
                  <span className="text-2xl">✦</span>
                </div>

                <p className="mt-5 text-lg font-medium text-zinc-300">
                  Ask something about the document
                </p>

                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  Your questions will be answered using information from the
                  uploaded document.
                </p>
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`flex max-w-[88%] gap-3 sm:max-w-[78%] ${
                  msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div
                  className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs ${
                    msg.role === 'user'
                      ? 'bg-violet-500/15 text-violet-300'
                      : 'border border-white/10 bg-white/[0.05] text-zinc-300'
                  }`}
                >
                  {msg.role === 'user' ? 'U' : '✦'}
                </div>

                <div
                  className={`rounded-2xl px-4 py-3.5 text-sm leading-relaxed shadow-lg ${
                    msg.role === 'user'
                      ? 'rounded-tr-md bg-violet-600 text-white shadow-violet-950/20'
                      : 'rounded-tl-md border border-white/[0.08] bg-[#111722] text-zinc-200 shadow-black/20'
                  }`}
                >
                  <div className="prose prose-invert prose-sm max-w-none prose-p:my-1.5 prose-headings:mb-2 prose-headings:mt-3 prose-headings:text-zinc-100 prose-strong:text-zinc-100 prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5 prose-table:my-3 prose-th:border-white/10 prose-td:border-white/10">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.content}
                    </ReactMarkdown>
                  </div>

                  {msg.sources?.length > 0 && (
                    <div className="mt-4 border-t border-white/[0.08] pt-3">
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
                        Sources
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {msg.sources.map((s, idx) => (
                          <span
                            key={idx}
                            className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-zinc-500"
                          >
                            Chunk {s.chunkIndex} · {(s.score * 100).toFixed(0)}%
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-xs text-zinc-300">
                  ✦
                </div>

                <div className="flex items-center gap-2 rounded-2xl rounded-tl-md border border-white/[0.08] bg-[#111722] px-4 py-3 text-sm text-zinc-500">
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-zinc-700 border-t-violet-400" />
                  Thinking…
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      <div className="shrink-0 border-t border-white/[0.08] bg-[#0a0e17] px-4 py-4 sm:px-8">
        <div className="mx-auto flex max-w-3xl items-center gap-2 rounded-2xl border border-white/10 bg-[#111722] p-1.5 shadow-xl shadow-black/20 transition-colors focus-within:border-violet-400/40">
          <input
            className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-zinc-100 outline-none placeholder:text-zinc-600"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask something about the document..."
            disabled={loading}
          />

          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-30"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}