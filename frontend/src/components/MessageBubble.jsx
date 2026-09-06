import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`flex max-w-[88%] gap-3 sm:max-w-[78%] ${
          isUser ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
        <div
          className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs ${
            isUser
              ? 'border border-[#D4A574]/25 bg-[#211D17] text-[#D4A574]'
              : 'border border-[#2A2E37] bg-[#171A21] text-[#D4A574]'
          }`}
        >
          {isUser ? (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="h-4 w-4"
            >
                <circle cx="12" cy="8" r="3.25" />
                <path
                strokeLinecap="round"
                d="M5.5 20c.8-3.2 3-5 6.5-5s5.7 1.8 6.5 5"
                />
            </svg>
            ) : (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                className="h-4 w-4"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3.5l1.45 5.05L18.5 10l-5.05 1.45L12 16.5l-1.45-5.05L5.5 10l5.05-1.45L12 3.5Z"
                />
            </svg>
          )}
        </div>

        <div
          className={`rounded-2xl px-4 py-3.5 text-sm leading-relaxed shadow-lg ${
            isUser
              ? 'rounded-tr-md border border-[#D4A574]/35 bg-[#211D17] text-[#F5F5F5] shadow-black/20'
              : 'rounded-tl-md border border-[#2A2E37] bg-[#171A21] text-[#E5E7EB] shadow-black/20'
          }`}
        >
          <div className="prose prose-invert prose-sm max-w-none prose-p:my-1.5 prose-headings:mb-2 prose-headings:mt-3 prose-headings:text-[#F5F5F5] prose-strong:text-[#F5F5F5] prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5 prose-table:my-3 prose-th:border-[#2A2E37] prose-td:border-[#2A2E37]">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>

          {message.sources?.length > 0 && (
            <div className="mt-4 border-t border-[#2A2E37] pt-3">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#6B7280]">
                Sources
              </p>

              <div className="flex flex-wrap gap-1.5">
                {message.sources.map((source, index) => (
                  <span
                    key={index}
                    className="rounded-full border border-[#2A2E37] bg-[#0F1115] px-2.5 py-1 text-[11px] text-[#9CA3AF]"
                  >
                    Chunk {source.chunkIndex} ·{' '}
                    {(source.score * 100).toFixed(0)}%
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}