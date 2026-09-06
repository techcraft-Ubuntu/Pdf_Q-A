import { useState, useRef, useEffect } from 'react';
import { askQuestion } from '../api/client';
import MessageBubble from './MessageBubble';

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
    if (!input.trim() || loading) return;

    const question = input.trim();

    const userMessage = {
      role: 'user',
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const result = await askQuestion(
        documentId,
        question,
        conversationId
      );

      setConversationId(result.conversationId);

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: result.answer,
          sources: result.sources,
        },
      ]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Something went wrong. Please try again.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col bg-[#0F1115]">
      {/* Conversation header */}
      <div className="shrink-0 border-b border-[#2A2E37] bg-[#14171D] px-5 py-3 sm:px-8">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[#F5F5F5]">
              Document conversation
            </p>

            <p className="mt-0.5 text-xs text-[#6B7280]">
              Ask questions about the uploaded document
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/5 px-2.5 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

            <span className="text-[11px] text-emerald-300/80">
              Ready
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-8">
        <div className="mx-auto max-w-3xl space-y-6">
          {messages.length === 0 && (
            <div className="flex min-h-[55vh] items-center justify-center">
              <div className="max-w-md text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D4A574]/25 bg-[#211D17] text-[#D4A574]">
                  <span className="text-2xl">✦</span>
                </div>

                <p className="mt-5 text-lg font-medium text-[#D1D5DB]">
                  Ask something about the document
                </p>

                <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                  Your questions will be answered using information from
                  the uploaded document.
                </p>
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <MessageBubble
              key={index}
              message={message}
            />
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#2A2E37] bg-[#171A21] text-xs text-[#D4A574]">
                  ✦
                </div>

                <div className="flex items-center gap-2 rounded-2xl rounded-tl-md border border-[#2A2E37] bg-[#171A21] px-4 py-3 text-sm text-[#6B7280]">
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#3A3D43] border-t-[#D4A574]" />

                  Thinking…
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div className="shrink-0 border-t border-[#2A2E37] bg-[#14171D] px-4 py-4 sm:px-8">
        <div className="mx-auto flex max-w-3xl items-center gap-2 rounded-2xl border border-[#2A2E37] bg-[#171A21] p-1.5 shadow-xl shadow-black/20 transition-colors focus-within:border-[#D4A574]/45">
          <input
            className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-[#F5F5F5] outline-none placeholder:text-[#6B7280]"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSend();
              }
            }}
            placeholder="Ask something about the document..."
            disabled={loading}
          />

          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="rounded-xl bg-[#D4A574] px-5 py-2.5 text-sm font-medium text-[#17120D] transition-all hover:bg-[#E0B486] disabled:cursor-not-allowed disabled:opacity-30"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}